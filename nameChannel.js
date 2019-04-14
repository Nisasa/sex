const mongoose = require('mongoose');

const nameChannelSchema = mongoose.Schema({
    nameChannel: String


});

const nameChannel = mongoose.model('nameChannel', nameChannelSchema);

module.exports = nameChannel;