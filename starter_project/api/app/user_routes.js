module.exports = (() => {
  'use strict';

  const User = require('./models/user');
  const {
    newUser,
    getUser,
    updateUser,
    getUsers,
    deleteUser,
      updatePassword,
      newTeacherSubjectMap,
      getUserSubjects
  } = require('./user_actions');
  const Mail = require('./mail_service');

  const updateUserInfo = (req, res) => {
      console.log(req.body);
    const id = req.decoded.user.id;

    const body = req.body;
    body.id = id;
    getUser({
      id
    }).then((user) => {
      console.log(user);
      if (user.password === body.old_password)
        return updateUser(body).then(() => {
          res.json({
            success: true
          });
        });
      res.json({
        success: false,
        message: 'Wrong password'
      });
    }).catch((e) => {
      console.log(e);
      res.json({
        success: false,
        message: e
      });
    })
  };

  const getUserRoute = (req, res) => {
    const id = req.decoded.user.id;
    getUser({
      id
    }).then((user) => {
      delete user.password;
      res.json({
        success: true,
        user
      });
    }).catch((e) => {
      console.log(e);
      res.json({
        success: false,
        message: e
      });
    })
  };

  // for admin

  const getAllUsers = (req, res) => {

    getUsers().then((users) => {
        Promise.all(users.map((user) => {
        delete user.password;
            return getUserSubjects(user.id).then((subjects) => {
                user.subject_ids = subjects.map(s => s.id_subject);
                console.log("Functionback");
                console.log(subjects);
                console.log(user);
                return user;
            });
            // return user;
        })).then((users) => {
            res.json({
                success: true,
                users
            });
      });
    }).catch((e) => {
      console.log(e);
      res.json({
        success: false,
        message: e
      });
    });
  };

  const showUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    console.log('Show:' + id);
    getUser({
        id
      }).then((user) => {
        console.log('Show:' + user.mail);
        delete user.password;
        res.json({
          success: true,
          user
        });
      })
      .catch((e) => {
        console.log(e);
        res.json({
          success: false,
          message: e
        });
      });
  };

  const insertUserRoute = (req, res) => {
    const {
      body
    } = req;
      console.log('PAOAKJNKJDNN');
      console.log(body);
    body.password = makePassword();
    if (body.mail === undefined) {
      res.json({
        success: false,
        message: "Cannot insert user without an email."
      })
    }
    // if(body.name === undefined){
    //   res.json({success: false, message: "Cannot insert user without a name."})
    // }
    console.log(body.password); //TODO: send this with SMTP
      // Mail.sendMail(body.mail,'[TimetableMaker] Your user has been created','Password :' + body.password);
    newUser(body).then((result) => {

        getUser({mail: body.mail, password: body.password}).then((user) => {

            let i;
            console.log(body);
            for (i = 0; i < body.id_subjects.length; i++) {
                let values = {id_subject: body.id_subjects[i], id_user: user.id};
                newTeacherSubjectMap(values).then((relation) => {
                    console.log('Added relation from ' + values.id_subject + ' to ' + values.id_user);
                });
            }

            res.json({
                success: true,
                message: 'user insert'
            });
        });



    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({
        success: false,
        message: e
      })
    });
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
    const {
      body
    } = req;
    console.log('Update:' + id);
    updateUser({
      mail: body.mail,
      id: id,
      fullName: body.fullName
    }).then((result) => {
      res.json({
        success: true,
        message: 'user updated'
      });
    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({
        success: false,
        message: e
      })
    })
  };

  const resetPasswordRoute = (req, res) => {
    const id = req.params.id;

    getUser({
      id
    }).then((user) => {
      console.log(user);
      if (typeof user != 'undefined' && user) {
        const updateSet = {
          id: id,
          new_password: makePassword()
        };
        updatePassword(updateSet);

        console.log('Password reset:' + id);
        res.json({
          success: true,
          message: 'password reset'
        });
      } else {
        console.log('Failed password reset');
        res.json({
          success: false,
          message: 'invalid user id'
        });
      }
    });
  };

  const changePasswordRoute = (req, res) => {

    // params: id
    const id = req.params.id;
    getUser({
      id
    }).then((user) => {
      console.log(user)
      if (typeof user != 'undefined' && user) {

        if (!req.body.new_password)
          res.json({
            success: false,
            message: 'please give a new password'
          });

        if (req.body.new_password.length < 6)
          res.json({
            success: false,
            message: 'password is too short'
          });

        const updateSet = {
          id: id,
          new_password: req.body.new_password
        };
        updatePassword(updateSet);

        console.log('Update:' + id);
        res.json({
          success: true,
          message: 'user update'
        });
      } else {
        res.json({
          success: false,
          message: 'invalid user id'
        });
      }

    });

  }

  const deleteUserRoute = (req, res) => {
    // params: id
    const id = req.params.id;
    deleteUser({
      id
    }).then((resul) => {
      res.json({
        success: true,
        message: 'user deleted'
      });
    }).catch((e) => {
      console.log("eroarea e", e);
      res.json({
        success: false,
        message: e
      })
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
    changePasswordRoute,
    resetPasswordRoute
  };
})();