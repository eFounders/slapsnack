const mongoose = require('mongoose');

const snapSchema = mongoose.Schema({
  userId: String,
  recipients: [String],
  message: String,
  teamId: String,
  bot: {
    bot_access_token: String,
    bot_user_id: String,
  },
  memberIds: [String],
  imageUrl: String,
  delay: Number,
  responseUrl: String,
  seenBy: [String],
});

module.exports = mongoose.model('Snap', snapSchema);
