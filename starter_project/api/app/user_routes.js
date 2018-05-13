module.exports = (() => {
  'use strict';

  const User = require('./models/user');
  const {getUser, updateUser, getUsers} = require('./user_actions');

  const updateUserInfo = (req, res) => {
    const id = req.decoded.user.id;

    const body = req.body;
    body.id = id;
    getUser({id}).then((user) => {
      console.log(user);
      if (user.password === body.old_password)
        return updateUser(body).then(() => {
          res.json({success: true});
        });
      res.json({success: false, message: 'Wrong password'});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };

  const getUserRoute = (req, res) => {
    const id = req.decoded.user.id;
    getUser({id}).then((user) => {
      delete user.password;
      res.json({success: true, user});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };

  // for admin

  const getAllUsers = (req, res) => {
    getUsers().then((users) => {
      users.map( (user) => {
        delete user.password;
        return user;
      } )
      res.json({success: true, users});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: "An error occured"});
    });
  };

  const showUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    console.log('Show:' + id);
    res.json({success: true, message: 'user info'});
  };

  const insertUserRoute = (req, res) => {
    console.log('Insert:');
    res.json({success: true, message: 'user insert'});
  };

  const updateUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    console.log('Update:' + id);
    res.json({success: true, message: 'user update'});
  };

  const deleteUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    console.log('Delete:' + id);
    res.json({success: true, message: 'user delete'});
  };

  return {
    updateUserInfo,
    getUserRoute,
    getAllUsers,
    showUserRoute,
    insertUserRoute,
    updateUserRoute,
    deleteUserRoute
  };
})();