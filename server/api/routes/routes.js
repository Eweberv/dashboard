'use strict';

//les différentes routes accessibles sur le serveur
module.exports = function(app) {
    var serviceController = require('../controllers/ServiceController');
    var authenticationController = require('../controllers/AuthenticationController');
    var authenticationJoyController = require('../controllers/AuthenticationControllerJoy');
//    var AuthenticationController = require('../controllers/AuthenticationController'); pas encore implémenté

    // server Routes
    app.route('/getAchievements')
        .get(serviceController.getAchievements);

    app.route('/getGamePlayerNb')
        .get(serviceController.getGamePlayerNb);

    app.route('/getMeteoForCity')
        .get(serviceController.getMeteoForCity);

    app.route('/login')
        .post(authenticationController.login);
//        AuthenticationJoyController.login)

    app.route('/register')
        .post(authenticationController.register);
    //      authenticationJoyController.register,

};