const express = require('express');
//
const slackCommandRoute = require('../routes/slack/command');
const slackImRoute = require('../routes/slack/im');
const slackOAuthRoute = require('../routes/slack/oauth');
const indexRoute = require('../routes');
const uploadRoute = require('../routes/upload');

const router = express.Router();
router.post('/slack/command', slackCommandRoute);
router.post('/slack/im', slackImRoute);
router.get('/slack/oauth', slackOAuthRoute);
router.get('/', indexRoute);
router.post('/upload', uploadRoute);

module.exports = router;
