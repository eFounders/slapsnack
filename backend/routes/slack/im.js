const { stringify } = require('querystring');
const request = require('request-promise');
const { WebClient } = require('@slack/client');

const Snap = require('../../models/snap');
const { color } = require('../../lib/constants');
const analytics = require('../../lib/analytics');

const { SLACK_VERIFICATION_TOKEN: verificationToken, FRONTEND_URL: frontendUrl } = process.env;

const handleMediaEvent = async (snapId, responseUrl) => {
  Snap.findByIdAndUpdate(snapId, {
    $set: { responseUrl },
  }).exec();
  const { message, memberIds } = await Snap.findById(snapId);
  if (!memberIds.length) {
    return { text: 'Wrong recipient! (see `/slapsnack help`)' };
  }
  const queryString = stringify({ id: snapId });
  const url = `${frontendUrl}/upload?${queryString}`;
  const text = `Follow this link to add a media:\n${url}`;
  return {
    text: message,
    attachments: [
      {
        fallback: text,
        text,
        callback_id: snapId,
        color,
      },
    ],
  };
};

const handleSendEvent = async (snapId, delay, user, responseUrl) => {
  Snap.findByIdAndUpdate(snapId, {
    $set: { delay, responseUrl },
  }).exec();
  const { bot, recipients, memberIds, teamId } = await Snap.findById(snapId);
  if (!memberIds.length) {
    return { text: 'Wrong recipient! (see `/slapsnack help`)' };
  }
  const web = new WebClient(bot.bot_access_token);
  const text = `Hey, ${user.name} just sent you a SlapSnack!`;
  memberIds.forEach(memberId => {
    web.chat.postMessage(memberId, '', {
      as_user: true,
      attachments: [
        {
          fallback: text,
          text,
          callback_id: snapId,
          color,
          actions: [
            {
              name: 'read',
              text: 'Take a look?',
              type: 'button',
              value: 'read',
            },
          ],
        },
      ],
    });
  });
  analytics.track({
    userId: teamId,
    event: 'send',
    properties: { snapId },
  });
  return { text: `Your SlapSnack has been sent to ${recipients.join(', ')}!` };
};

const handleReadEvent = async (snapId, user, responseUrl) => {
  const {
    message: text,
    delay,
    imageUrl,
    seenBy = [],
    responseUrl: sendResponseUrl,
    teamId,
  } = await Snap.findById(snapId);
  seenBy.push(user.name);
  const usernames = seenBy.join(', ');
  Snap.findByIdAndUpdate(snapId, {
    $set: { seenBy },
  })
    .then(() => {
      const endText = seenBy.length === 5 ? ' and probably more people!' : '';
      request.post(sendResponseUrl, {
        json: { text: `Your SlapSnack was seen by ${usernames}${endText}` },
      });
    })
    .catch(error => {
      request.post(sendResponseUrl, {
        json: { text: error.message },
      });
    });
  setTimeout(() => {
    request.post(responseUrl, {
      json: { delete_original: true },
    });
  }, delay * 1000);
  analytics.track({
    userId: teamId,
    event: 'read',
    properties: { snapId },
  });
  return {
    text,
    attachments: [
      {
        fallback: text,
        color,
        image_url: imageUrl,
      },
    ],
  };
};

module.exports = async (req, res) => {
  const { ssl_check: sslCheck, payload } = req.body;
  if (sslCheck) {
    return res.send('ssl_check');
  }
  const { token, callback_id: snapId, response_url: responseUrl, user, actions } = JSON.parse(
    payload
  );
  if (token !== verificationToken) {
    return res.send('Wrong verification token');
  }
  const [{ name: event, value: delay }] = actions;
  switch (event) {
    case 'media': {
      return res.json(await handleMediaEvent(snapId, responseUrl));
    }
    case 'send': {
      return res.json(await handleSendEvent(snapId, parseInt(delay, 10), user, responseUrl));
    }
    case 'read': {
      return res.json(await handleReadEvent(snapId, user, responseUrl));
    }
    default: {
      return res.json({ error: 'POST /slack/im Unknown event' });
    }
  }
};
