'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//modele pour les données utilisateur
var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);