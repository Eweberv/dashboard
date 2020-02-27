'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//modele d'exemple pour ajout dans la db
var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task',
        unique: true
    },
    password: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);