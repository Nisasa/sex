const mongoose = require('mongoose');

const sexSchema = mongoose.Schema({
    name: String,
    pictures: String,
    years: Number,
    info: String,
    members: Number
});

const sex_categories = mongoose.model('sex_categories', sexSchema);

module.exports = sex_categories;