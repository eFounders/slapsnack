import { stringify } from 'querystring';

import { SLACK_CLIENT_ID } from '../../lib/env';

const queryString = stringify({
  scope: 'commands,bot,users:read,channels:read,chat:write:bot',
  client_id: SLACK_CLIENT_ID,
});
const srcSet = {
  '1x': 'https://platform.slack-edge.com/img/add_to_slack.png',
  '2x': 'https://platform.slack-edge.com/img/add_to_slack@2x.png',
};

export default () => (
  <a href={`https://slack.com/oauth/authorize?${queryString}`}>
    <img
      alt="Add to Slack"
      height="40"
      width="139"
      src={srcSet['1x']}
      srcSet={`${srcSet['1x']} 1x, ${srcSet['2x']} 2x`}
    />
  </a>
);
