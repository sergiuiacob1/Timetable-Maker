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

  return {
    updateUserInfo,
    getUserRoute,
    getAllUsers
  };
})();