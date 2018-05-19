module.exports = (() => {
  'use strict';
  const User = require('./models/user');

  const newUser = ({password, mail, name}) => {
    return new User()
      .insert()
      .set('password', password)
      .set('mail', mail)
      .set('name', name)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const getUser = ({id, password, mail}) => {

    if (id){
      return new User()
        .field('*')
        .where({id})
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

  const updateUser = ({id, mail, name, old_password, new_password}) => {
    return new User()
      .update()
      // .set('mail', mail)
      .set('name', name)
      .set('password', new_password)
      .where({
        id
      })
      .valueOf()
      .then((res) => {
        return true;
      });
  };

    const updatePassword = ({id, new_password}) => {
        return new User()
            .update()
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

  return {
    getUser,
    newUser,
    updateUser,
      getUsers,
      updatePassword
  };
})();