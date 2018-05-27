module.exports = (() => {
  'use strict';
  const jwt = require('jsonwebtoken');
  const {getUser, newUser, updateUser} = require('./user_actions');
  
  const {secret} = require('../config/config');

  const checkAuthenticated = (req, res, next) => {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {

      jwt.verify(token, secret, function (err, decoded) {
        console.log('decoded');
        console.log(decoded);
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  };

  const checkAdmin = (req, res, next) => {
      const id = req.decoded.user.id;
    getUser({id})
    .then((user) => {
        if (user.is_admin == 1) {
          next();
      } else {
        return res.json({succes: false, message: '403 Forbidden'});
      }
    }).catch((e) => {
      return res.status(403).send({success: false, message: '403 Forbidden'});
    });
  };

  const authenticate = (req, res) => {
    const {body} = req;
    const {mail, password} = body;
    getUser({mail, password}).then((user) => {
       console.log(user);
      if (user) {
        const token = jwt.sign({user}, secret, {
          expiresIn: 86400
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
            is_admin: user.is_admin,
          token: token
        });
      }
      else {
          res.json({success: false, message: 'Authentication failed. Invalid user or password combination'});
      }
    }).catch((e) => {
      console.log(e);
    });

  };

  const register = (req, res) => {
    const {body} = req;
    newUser(body).then((result) => {
      res.json({success: true});
    }).catch((e) => {
      console.log(e);
      res.json({success: false})
    })
  };

  const forgot = (req, res) => {
    const {body} = req;
    getUser(body).then((user) => {
      console.log('found user that forgot his password and or username')
      console.log(user);
      //send mail with mailgun
      res.json({success: true});
    })
  }

  return {
    authenticate,
    register,
    checkAuthenticated,
    forgot,
    checkAdmin
  };
})();