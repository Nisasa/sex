const mongoose = require('mongoose');

const savecannelSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const savecannel = mongoose.model('savecannel', savecannelSchema);

module.exports = savecannel;