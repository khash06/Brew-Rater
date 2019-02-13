const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
    name: String, 
    city: String, 
    state: String, 
    country: String  
});

module.exports = mongoose.model('Brewery', brewerySchema);