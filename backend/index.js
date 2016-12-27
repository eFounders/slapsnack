const uniloc = require('uniloc');
const parseFormData = require('urlencoded-body-parser');
const { send } = require('micro');
//
require('./lib/dotenv');
const cors = require('./lib/cors');
const oauth = require('./routes/slack/oauth');
const slashCommand = require('./routes/slack/slash-command');
const im = require('./routes/slack/im');
const upload = require('./routes/upload');

const Router = uniloc({
  root: 'GET /',
  oauth: 'GET /slack/oauth',
  slashCommand: 'POST /slack/slash-command',
  im: 'POST /slack/im',
  upload: 'GET /upload',
});

module.exports = cors(async (req, res) => {
  const { url, method } = req;
  const root = () => ({ ts: Date.now() });
  const handlers = { root, oauth, slashCommand, im, upload };
  const { name, options } = Router.lookup(url, method);
  const isSlackPost = url.includes('/slack') && method === 'POST';
  const params = isSlackPost ? await parseFormData(req) : options;
  const handler = handlers[name];
  if (handler) {
    return handler(params, res);
  }
  return send(res, 404, { error: 'not-found' });
});
