const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    name: String,
    members: String,
    like1: String,
    like2: String,
    number: String

});

const like = mongoose.model('like', likeSchema);

module.exports = like;