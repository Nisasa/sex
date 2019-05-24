const mongoose = require('mongoose');

const lkSchema = mongoose.Schema({
    user_id: String,
    money: Number,
    members: Number,
    deposit: String,
    status: String,
    key: Number,
    pass: String

});

const lk_lk = mongoose.model('lk_lk', lkSchema);

module.exports = lk_lk;
