const Analytics = require('analytics-node');

const { SEGMENT_WRITE_KEY: writeKey } = process.env;

module.exports = new Analytics(writeKey, { flushAt: 20 });
