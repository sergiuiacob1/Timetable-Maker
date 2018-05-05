module.exports = (() => {
  'use strict';

  const User = require('./models/user');
  const {getUser, updateUser} = require('./user_actions');

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

  return {
    updateUserInfo,
    getUserRoute
  };
})();