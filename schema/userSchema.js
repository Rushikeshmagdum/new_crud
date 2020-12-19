const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profileDetails: String,
    email: {type: String, unique: true},
    contact: {type: String, unique: true},
    password: String
})

module.exports = mongoose.model('users', userSchema);