const Analytics = require('analytics-node');

module.exports = new Analytics(process.env.SEGMENT_WRITE_KEY, { flushAt: 20 });
