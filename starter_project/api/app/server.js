module.exports = (() => {
  "use strict";
  const express = require("express");
  const bodyParser = require('body-parser');
  const morgan = require('morgan');

  const config = require('./../config/config');
  const {authenticate, register, checkAuthenticated, forgot} = require('./authentication');
  const {updateUserInfo, getUserRoute} = require('./user_routes');
  const {
    newResourceRoute,
    getResourceByIdRoute,
    getResourcesByTypeRoute,
    getResourcesByNameRoute,
    getResourcesByCapacityRoute,
    getAllResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  } = require('./resource_routes');

  let serverInterface = undefined;

  const getInstance = () => {
    serverInterface || (serverInterface = initialize());

    return serverInterface;
  };

  const initialize = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // use morgan to log requests to the console
    app.use(morgan('dev'));


    app.get('/', function (req, res) {
      res.send('Hello! The API is at http://localhost/api');
    });

    app.post('/authenticate', authenticate);
    app.post('/register', register);
    app.post('/forgot', forgot);
    app.get('/resources', getAllResourcesRoute);
    app.post('/resources/byId', getResourceByIdRoute);
    app.post('/resources/byType', getResourcesByTypeRoute);
    app.post('/resources/byName', getResourcesByNameRoute);
    app.post('/resources/byCapacity', getResourcesByCapacityRoute);
    app.post('/resources/add', newResourceRoute);
    app.post('/resources/update', updateResourceRoute);
    app.post('/resources/remove', deleteResourceRoute);
    

    const apiRoutes = express.Router();

    apiRoutes.use(checkAuthenticated);

    apiRoutes.get('/', function (req, res) {
      res.json({success: true, message: 'Welcome to the coolest API on earth!' });
    });

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
