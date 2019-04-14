const mongoose = require('mongoose');

const userbaseSchema = mongoose.Schema({
    telegramId: String,
    firstName: String,
    userName: String,
    nameChannel: String

});

const userbase = mongoose.model('userbase', userbaseSchema);

module.exports = userbase;