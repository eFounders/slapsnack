const { send } = require('micro');
const { WebClient } = require('@slack/client');
//
const { Team } = require('../../lib/db');
const analytics = require('../../lib/analytics');

const {
  SLACK_CLIENT_ID: clientId,
  SLACK_CLIENT_SECRET: clientSecret,
  FRONTEND_URL: frontendUrl,
} = process.env;

const redirect = (res, url) => {
  res.setHeader('Location', url);
  send(res, 302);
};

module.exports = async ({ code }, res) => {
  if (!code) {
    return redirect(res, frontendUrl);
  }
  const {
    user_id: userId,
    team_id: teamId,
    team_name: teamName,
    bot,
  } = await new WebClient().oauth.access(clientId, clientSecret, code);
  const team = await Team.findOneAndUpdate({ teamId }, {
    $set: { userId, teamId, teamName, bot },
  }, { upsert: true });
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
  return redirect(res, frontendUrl);
};
