const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  userId: String,
  teamId: String,
  teamName: String,
  bot: {
    bot_access_token: String,
    bot_user_id: String,
  },
});

module.exports = mongoose.model('Team', teamSchema);
