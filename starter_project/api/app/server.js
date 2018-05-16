module.exports = (() => {
  "use strict";
  const express = require("express");
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const cors = require('cors');

  const config = require('./../config/config');
  const {getRoomsRoute} = require('./room_routes');
  const {authenticate, register, checkAuthenticated, forgot, checkAdmin} = require('./authentication');
  const {updateUserInfo, getUserRoute, getAllUsers,
        showUserRoute, insertUserRoute, updateUserRoute, deleteUserRoute} = require('./user_routes');

  let serverInterface = undefined;

  const getInstance = () => {
    serverInterface || (serverInterface = initialize());

    return serverInterface;
  };

  const initialize = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // use morgan to log requests to the console
    app.use(morgan('dev'));


    app.get('/', function (req, res) {
      res.send('Hello! The API is at http://localhost/api');
    });

    app.post('/authenticate', authenticate);
    app.post('/register', register);
    app.post('/forgot', forgot);


    const apiRoutes = express.Router();
    const adminRoutes = express.Router();

    apiRoutes.use(checkAuthenticated);
    adminRoutes.use(checkAdmin);

    apiRoutes.get('/', function (req, res) {
      res.json({success: true, message: 'Welcome to the coolest API on earth!' });
    });

    apiRoutes.get('/rooms', getRoomsRoute);
    adminRoutes.post('/users/:id/update', updateUserRoute);
    adminRoutes.post('/users/:id/delete', deleteUserRoute);
    adminRoutes.get('/users/:id', showUserRoute);
    adminRoutes.post('/users', insertUserRoute);
    adminRoutes.get('/users', getAllUsers);
    

    apiRoutes.use('/admin', adminRoutes);

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
