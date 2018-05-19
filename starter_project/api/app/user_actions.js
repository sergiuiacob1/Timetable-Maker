module.exports = (() => {
  'use strict';
  const User = require('./models/user');

  const newUser = ({ password, mail, userName, fullName }) => {
    return new User()
      .insert()
      .set('password', password)
      .set('mail', mail)
      .set('userName', userName)
      .set('fullName', fullName)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const getUser = ({ id, password, mail }) => {

    if (id) {
      return new User()
        .field('*')
        .where({ id })
        .valueOf()
        .then((res) => {
          return res[0];
        });
    }
    console.log(mail, password);
    return new User()
      .field('*')
      .where({
        mail, password
      }).valueOf()
      .then((res) => {
        if (res.length > 1)
          return null;
        return res[0];
      });
  };

  const updateUser = ({ id, mail, fullName, userName, old_password, new_password }) => {
    return new User()
      .update()
      .set('mail', mail)
      .set('fullName', fullName)
      .set('userName', userName)
      .set('password', new_password)
      .where({
        id
      })
      .valueOf()
      .then((res) => {
        return true;
      });
  };

  const getUsers = () => {
    return new User()
      .field('*')
      .valueOf()
      .then((res) => {
        return res;
      });
  }

  const deleteUser = ({ id }) => {
    console.log(id);
    if (id) {
      return new User()
        .delete()
        .where({
          id
        })
        .valueOf()
        .then((res) => {
          return res;
        });
    }
  }

  return {
    getUser,
    newUser,
    updateUser,
    getUsers,
    deleteUser
  };
})();