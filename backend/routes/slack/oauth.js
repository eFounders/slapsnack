const { WebClient } = require('@slack/client');

const Team = require('../../models/team');
const analytics = require('../../lib/analytics');

const {
  SLACK_CLIENT_ID: clientId,
  SLACK_CLIENT_SECRET: clientSecret,
  FRONTEND_URL: frontendUrl,
} = process.env;

module.exports = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(frontendUrl);
  }
  const {
    user_id: userId,
    team_id: teamId,
    team_name: teamName,
    bot,
  } = await new WebClient().oauth.access(clientId, clientSecret, code);
  const team = await Team.findOneAndUpdate(
    { teamId },
    {
      $set: { userId, teamId, teamName, bot },
    },
    { upsert: true }
  );
  if (!team) {
    analytics.identify({
      userId: teamId,
      traits: {
        name: teamName,
        createdAt: Date.now(),
      },
    });
    analytics.track({
      userId: teamId,
      event: 'signup',
      properties: { teamName },
    });
  }
  const web = new WebClient(bot.bot_access_token);
  const message =
    'SlapSnack has been installed on your team!\n' +
    'Try `/slapsnack @user hey!` to send your first snap and tell your colleagues about it :tada:';
  web.chat.postMessage(userId, message, { as_user: true });
  return res.redirect(frontendUrl);
};
