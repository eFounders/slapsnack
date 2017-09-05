const uniq = require('lodash/uniq');
const flatten = require('lodash/flatten');
const findIndex = require('lodash/findIndex');
const without = require('lodash/without');
const request = require('request-promise');
const { WebClient } = require('@slack/client');

const { color, sendActions } = require('../../lib/constants');
const Team = require('../../models/team');
const Snap = require('../../models/snap');
const analytics = require('../../lib/analytics');

const getUserFromUsername = async (web, username) => {
  const { members } = await web.users.list();
  return members.find(member => member.name === username);
};

const getChannelFromChannelName = async (web, channelName) => {
  const { channels } = await web.channels.list();
  return channels.find(channel => channel.name === channelName);
};

const recipientToMemberIds = async (web, recipient, userId) => {
  const result = [];
  const recipientName = recipient.substring(1);
  if (recipient.charAt(0) === '@') {
    const recipientUser = await getUserFromUsername(web, recipientName);
    if (!recipientUser) {
      throw new Error(`No such user: ${recipient} (see \`/slapsnack help\`)`);
    }
    if (recipientUser.is_bot) {
      throw new Error(`Cannot send SlapSnack to bot: ${recipient} (see \`/slapsnack help\`)`);
    }
    result.push(recipientUser.id);
  } else if (recipient.charAt(0) === '#') {
    const recipientChannel = await getChannelFromChannelName(web, recipientName);
    if (!recipientChannel) {
      throw new Error(`No such public channel: ${recipient} (see \`/slapsnack help\`)`);
    }
    const members = without(recipientChannel.members, userId);
    result.push(...members);
  } else {
    throw new Error('Unknown recipient! (see `/slapsnack help`)');
  }
  return result;
};

const recipientsToMemberIds = async (web, recipients, userId) => {
  const promises = recipients.map(recipient => recipientToMemberIds(web, recipient, userId));
  const results = await Promise.all(promises);
  return uniq(flatten(results));
};

module.exports = async (req, res) => {
  const { token, team_id: teamId, user_id: userId, response_url: responseUrl, text } = req.body;
  if (token !== process.env.SLACK_VERIFICATION_TOKEN) {
    return res.send('Wrong verification token');
  }
  if (!teamId) {
    return res.send('Wrong team ID');
  }
  const words = text.split(' ').filter(word => word);
  if (words.length && words[0] === 'help') {
    return res.send(
      [
        'Use `/slapsnack recipients [message]` to send ephemeral messages to your teammates.',
        'recipients can be any combination of users and public channels separated by spaces.',
        "• `/slapsnack @alice It's a secret to everybody!`",
        '• `/slapsnack #general Am I really sure about this one?`',
        '• `/slapsnack @bob @charlie #random Hi there!`',
      ].join('\n'),
    );
  }
  const isNotRecipient = word => !['@', '#'].includes(word.charAt(0));
  const findResult = findIndex(words, isNotRecipient);
  const index = findResult === -1 ? words.length : findResult;
  const recipients = uniq(words.slice(0, index));
  if (recipients.length === 0) {
    return res.send('You must specify at least one recipient! (see `/slapsnack help`)');
  }
  const message = words.slice(index).join(' ');
  const { bot } = await Team.findOne({ teamId });
  const web = new WebClient(bot.bot_access_token);
  const snap = new Snap({
    userId,
    recipients,
    message,
    teamId,
    bot,
  });
  const { _id: snapId } = await snap.save();
  recipientsToMemberIds(web, recipients, userId)
    .then(memberIds =>
      Snap.findByIdAndUpdate(snapId, {
        $set: { memberIds },
      }),
    )
    .catch(error => {
      request.post(responseUrl, {
        json: { text: error.message },
      });
    });
  analytics.track({
    userId: teamId,
    event: 'create',
    properties: { snapId, recipients, message },
  });
  return res.json({
    text: message,
    attachments: [
      {
        callback_id: snapId,
        color,
        actions: sendActions.concat([
          {
            name: 'media',
            text: 'Add media',
            type: 'button',
            value: 'media',
          },
        ]),
      },
    ],
  });
};
