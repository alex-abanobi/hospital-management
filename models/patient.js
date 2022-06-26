const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientsSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('patient', PatientsSchema);