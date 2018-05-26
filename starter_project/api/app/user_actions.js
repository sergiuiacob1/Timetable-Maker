module.exports = (() => {
  'use strict';
  const User = require('./models/user');
  const TeacherSubjectMap = require('./models/teacher_subject_map');

  const newUser = ({
    password,
    mail,
    userName,
    fullName
  }) => {
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

  const newTeacherSubjectMap = ({
    id_user,
    id_subject
  }) => {
    return new TeacherSubjectMap()
      .insert()
      .set('id_user', id_user)
      .set('id_subject', id_subject)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const getUser = ({
    id,
    password,
    mail
  }) => {

    if (id) {
      return new User()
        .field('*')
        .where({
          id
        })
        .valueOf()
        .then((res) => {
          return res[0];
        });
    }
    console.log(mail, password);
    return new User()
      .field('*')
      .where({
        mail,
        password
      }).valueOf()
      .then((res) => {
        if (res.length > 1)
          return null;
        return res[0];
      });
  };

  const updateUser = ({
    id,
    mail,
    fullName,
    old_password,
    new_password
  }) => {
    return new User()
      .update()
      .set('mail', mail)
      .set('fullName', fullName)
      .set('password', new_password)
      .where({
        id
      })
      .valueOf()
      .then((res) => {
        return true;
      });
  };

  const updatePassword = ({
    id,
    new_password
  }) => {
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

  const deleteUser = ({
    id
  }) => {
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

  const deleteSubject = ({
    id_user
  }) => {
    if (id_user) {
      return new TeacherSubjectMap()
        .delete()
        .where({
          id_user
        })
        .valueOf()
        .then(() => {
          return true;
        });
    }
  }

  return {
    getUser,
    newUser,
    updateUser,
    getUsers,
    deleteUser,
    updatePassword,
    newTeacherSubjectMap,
    deleteSubject
  };
})();