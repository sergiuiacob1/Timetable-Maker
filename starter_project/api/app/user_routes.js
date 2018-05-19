module.exports = (() => {
  'use strict';

  const User = require('./models/user');
  const {newUser, getUser, updateUser, getUsers, deleteUser, updatePassword} = require('./user_actions');

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
      res.json({success: false, message: e});
    })
  };

  const getUserRoute = (req, res) => {
    const id = req.decoded.user.id;
    getUser({id}).then((user) => {
      delete user.password;
      res.json({success: true, user});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: e});
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
      res.json({success: false, message: e});
    });
  };

  const showUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    console.log('Show:' + id);
    getUser({id}).then((user) => {
        console.log('Show:' + user.mail);
        delete user.password;
        res.json({success: true, user});
    })
    .catch((e) => {
      console.log(e);
      res.json({success: false, message: e});
    });
  };

  const insertUserRoute = (req, res) => {
    const {body} = req;
    body.password = makePassword();
    if(body.mail === undefined){
      res.json({success: false, message: "Cannot insert user without an email."})
    }
    // if(body.name === undefined){
    //   res.json({success: false, message: "Cannot insert user without a name."})
    // }
    console.log(body.password);//TODO: send this with SMTP
    newUser(body).then((result) => {
      res.json({success: true, message: 'user insert'});
    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({success: false, message: e})
    })
  };

  function makePassword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  const updateUserRoute = (req, res) => {
    // params: id
      const id = req.params.id;
    const {body} = req;
    console.log('Update:' + id);
    updateUser(body).then((result) => {
      res.json({success: true, message: 'user updated'});
    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({success: false, message: e})
    })
  };

    const changePasswordRoute = (req, res) => {

        // params: id
        const id = req.params.id;
        getUser({id}).then((user) => {
            console.log(user)
            if (typeof user != 'undefined' && user) {

                if (!req.body.new_password)
                    res.json({success: false, message: 'please give a new password'});

                if (req.body.new_password.length < 6)
                    res.json({success: false, message: 'password is too short'});

                const updateSet = {id: id, new_password: req.body.new_password};
                updatePassword(updateSet);

                console.log('Update:' + id);
                res.json({success: true, message: 'user update'});
            }
            else {
                res.json({success: false, message: 'invalid user id'});
            }

        });

    }

  const deleteUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    deleteUser({id}).then((resul) => {
      res.json({success: true, message: 'user deleted'});
    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({success: false, message: e})
    });
    console.log('Delete:' + id);
  };

  return {
    updateUserInfo,
    getUserRoute,
    getAllUsers,
    showUserRoute,
    insertUserRoute,
    updateUserRoute,
      deleteUserRoute,
      changePasswordRoute
  };
})();