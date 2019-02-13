const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
    name: String,
    type: String,
    comment: String,
    abv: Number,
    rating: Number,
    breweryId: String
});

module.exports = mongoose.model('Beer', beerSchema);