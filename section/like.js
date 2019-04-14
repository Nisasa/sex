const mongoose = require('mongoose');

const okSchema = mongoose.Schema({
    name: String,
    members: String,
    like1: String,
    like2: String,
    number: String

});

const ok = mongoose.model('ok', okSchema);

module.exports = ok;