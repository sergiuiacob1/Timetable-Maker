module.exports = (() => {
  "use strict";
  const express = require("express");
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  // const cors = require('cors');

  const config = require('./../config/config');
  const { authenticate, register, checkAuthenticated, forgot } = require('./authentication');
  const { updateUserInfo, getUserRoute } = require('./user_routes');
  const {
    newResourceRoute,
    getResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  } = require('./resource_routes');
  const { getRoomsRoute } = require('./room_routes');

  let serverInterface = undefined;

  const getInstance = () => {
    serverInterface || (serverInterface = initialize());

    return serverInterface;
  };

  const initialize = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // app.use(cors());

    // use morgan to log requests to the console
    app.use(morgan('dev'));


    app.get('/', function (req, res) {
      res.send('Hello! The API is at http://localhost/api');
    });

    app.post('/authenticate', authenticate);
    app.post('/register', register);
    app.post('/forgot', forgot);
    app.post('/resources/add', newResourceRoute);
    app.get('/resources/get', getResourcesRoute);
    app.post('/resources/update', updateResourceRoute);
    app.post('/resources/remove', deleteResourceRoute);

    const apiRoutes = express.Router();

    apiRoutes.use(checkAuthenticated);

    apiRoutes.get('/', function (req, res) {
      res.json({ success: true, message: 'Welcome to the coolest API on earth!' });
    });
    apiRoutes.post('/api/resources/add', function (req, res) {
      newResourceRoute(req, res);
    });
    apiRoutes.get('/api/resources/get', function (req, res) {
      getResourcesRoute(req, res);
    });
    apiRoutes.post('/api/resources/update', function (req, res) {
      updateResourceRoute(req, res);
    });
    apiRoutes.post('/api/resources/remove', function (req, res) {
      deleteResourceRoute(req, res);
    });



    apiRoutes.get('/rooms', getRoomsRoute);

    app.use('/api', apiRoutes);

    const start = (port) => {
      app.listen(port);
    };

    return Object.freeze({
      start
    });
  };

  return Object.freeze({
    getInstance
  });
})();
