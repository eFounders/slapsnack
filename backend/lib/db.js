const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

const teamSchema = mongoose.Schema({
  userId: String,
  teamId: String,
  teamName: String,
  bot: {
    bot_access_token: String,
    bot_user_id: String,
  },
});

const Team = mongoose.model('Team', teamSchema);

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

const Snap = mongoose.model('Snap', snapSchema);

module.exports = { Team, Snap };
