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
      showUserRoute, insertUserRoute, updateUserRoute, deleteUserRoute, changePasswordRoute, resetPasswordRoute
  } = require('./user_routes');
  const {
    newResourceRoute,
    getResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  } = require('./resource_routes');
  const {getGroupsRoute} = require('./group_routes');
  const {getSubjectsRoute, addSubjectRoute} = require('./subject_routes');
  const {getConstraintsRoute, newConstraintRoute} = require('./constraints_routes.js');

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
    // app.post('/resources/add', newResourceRoute);
    // app.get('/resources/get', getResourcesRoute);
    // app.post('/resources/update', updateResourceRoute);
    // app.post('/resources/remove', deleteResourceRoute);

    
    const apiRoutes = express.Router();
    const adminRoutes = express.Router();

    apiRoutes.use(checkAuthenticated);
    adminRoutes.use(checkAdmin);

    apiRoutes.get('/', function (req, res) {
      res.json({ success: true, message: 'Welcome to the coolest API on earth!' });
    });
    apiRoutes.post('/resources/add', newResourceRoute);
    apiRoutes.get('/resources/get', getResourcesRoute);
    apiRoutes.post('/resources/update', updateResourceRoute);
    apiRoutes.post('/resources/remove', deleteResourceRoute);

    apiRoutes.get('/rooms', getRoomsRoute);
      apiRoutes.post('/users/:id/changepassword', changePasswordRoute);
    adminRoutes.post('/users/:id/update', updateUserRoute);
      adminRoutes.post('/users/:id/reset', resetPasswordRoute);
    adminRoutes.post('/users/:id/delete', deleteUserRoute);
    adminRoutes.get('/users/:id', showUserRoute);
    adminRoutes.post('/users', insertUserRoute);
    adminRoutes.get('/users', getAllUsers);
    

    apiRoutes.use('/admin', adminRoutes);

    apiRoutes.get('/groups', getGroupsRoute);
    apiRoutes.get('/subjects', getSubjectsRoute);
    apiRoutes.post('subjects', addSubjectRoute);

    apiRoutes.get('/constraints', getConstraintsRoute);
    apiRoutes.post('/constraints', newConstraintRoute);
    
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
