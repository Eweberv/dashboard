'use strict';


const axios = require('axios');
var mongoose = require('mongoose'),
    User = require('../models/user');
const utils = require("../utils/utils");

exports.register = async function(req, res) {
    console.log("register appelé");
    const body = req.body;

    const user = new User({
        name: body.name,
        password: body.password
    });
    console.log(user);
    user.save(async function (err) {
        if (err) {
                return res.status(400).json({err: err.message});
        }
        res.json("Registered !");
    });
};

exports.login = async function(req, res) {
    const name = req.body.login;
    const pass = req.body.password;

    console.log(name);
    console.log(pass);
    if (!name || !pass) {
        return res.json({message: 'invalid fields'});
    }
    try {
    const user = await User.findOne({name: name});
        if (user && user.password === pass) {
            res.json({message: "logged in"});
        } else {
            return res.json({message: 'invalid email or password'});
        }
    } catch (e) {
        res.json("An error occured with the database.")
    }
};

exports.showWidgets = function(req, res) {
    User.find({}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};

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

//AppID 40800 = super meat boy (for achievements)
exports.getAchievements = function(req, res) {
    axios.get(`http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=40800`)
        .then(function (response) {
            console.log("call to /getAchievements detected");
        })
        .catch(err => {
            res.send(err);
        });
};

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

exports.list_all_tasks = function(req, res) {
    User.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_task = function(req, res) {
    var new_task = new User(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    User.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    User.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {
    User.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};