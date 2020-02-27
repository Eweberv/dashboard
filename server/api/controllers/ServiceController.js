'use strict';


const axios = require('axios');
var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');
const utils = require("../utils/utils");

var steamApiKey = '88E78A0C568F9E1D0E92B198E7BB5622';
var weatherApiKey = 'c25507c8640ecdaca9a6aa0cc58f4a02';
var nasaApiKey = 'j31864InDPeIXS6Ehs9lVizqQofsvsAIRacZbJeT';

//récupère le nombre de joueurs actuellement en jeu pour le jeu [appId] sur steam
//AppID 570 = dota 2 (for playerNb)
exports.getGamePlayerNb = function(req, res) {
    if (req.query.appId === 'null') {
        console.log("appId var not defined");
        res.send("Error");
        return -1;
    }
    axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${req.query.appId}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then(function (response) {
        console.log("call to /getGamePlayerNb detected");
        res.send(response.data);
    })
        .catch(err => {
            res.send(err);
        });
};

//récupère le % completion des achievements pour le jeu [appId] sur Steam (pas encore implémenté)
//AppID 40800 = super meat boy (for achievements)
/*exports.getAchievements = function(req, res) {
    console.log("getAchievements call");

    if (req.query.gameId === 'null') {
        console.log("gameId var not defined");
        res.send("Error");
        return -1;
    }
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&hd=true`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }).then(function (response) {
        console.log("reponse api steam: " + response.data);
        res.send(response.data);
    })
        .catch(err => {
            console.log("erreur api nasa")
            res.send(err);
        });
};
*/

var express = require('express');
var app = express();

exports.getAchievements = function(req, res) {
    console.log("getAchievements")
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&hd=true`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then(function (response) {
        console.log("call to /getAchievement detected");
        res.json("response from /getAchievement: yo");
    })
        .catch(err => {
            res.json(err.response.status); //envoie le code d'erreur au client
        });
};

//récupère différentes données météo pour une ville [city]
exports.getMeteoForCity = function(req, res) {
    let city = req.query.city;
    if (city === 'null') {
        console.log("city var not defined");
        res.send("Error");
        return -1;
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then(function (response) {
        console.log("call to /getMeteoForCity detected");
        console.log(response.data.main.temp);
        response.data.main.temp = utils.kelvinToFahrenheit(response.data.main.temp);
        response.data.main.feels_like = utils.kelvinToFahrenheit(response.data.main.feels_like);
        res.json(response.data);
    })
        .catch(err => {
            res.json(err.response.status); //envoie le code d'erreur au client
        });
};


//fonctions d'exemple pour utilisation de la db
exports.showWidgets = function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};