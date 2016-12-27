const request = require('request-promise');
//
const { color, sendActions } = require('../lib/constants');
const { Snap } = require('../lib/db');
const analytics = require('../lib/analytics');

module.exports = async ({ snapId, cdnUrl }) => {
  const { message, responseUrl, teamId } = await Snap.findById(snapId);
  const text = 'Your media has been attached!';
  request.post({
    url: responseUrl,
    json: {
      text: message,
      attachments: [{
        fallback: text,
        text,
        image_url: cdnUrl,
        callback_id: snapId,
        color,
        actions: sendActions,
      }],
    },
  });
  Snap.findByIdAndUpdate(snapId, {
    $set: { imageUrl: cdnUrl },
  }).exec();
  analytics.track({
    userId: teamId,
    event: 'add-media',
    properties: {
      snapId,
      imageUrl: cdnUrl,
    },
  });
  return { ok: true };
};
