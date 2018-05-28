module.exports = (() => {
    'use strict';
    const Subject = require('./models/subject');
    const SubjectUser = require('./models/subject_user');
  
    const newSubject = ({name, short, date, frequency}) => {
      return new Subject()
      .insert()
      .set ('name', name)
      .set ('short', short)
      .set ('date', date)
      .set ('frequency', frequency)
      .valueOf()
        .then((res) => {
            return res;
        });
    };
  
    const getSubject = ({id}) => {
      if (id){
        return new Subject()
          .field('*')
          .where({id})
          .valueOf()
          .then((res) => {
            return res[0];
          });
      }
    };

    const getUserSubjects = (userId) => {
      console.log(userId);
      if (userId) {
        return new SubjectUser()
          .field('*')
          .where({userId})
          .valueOf()
          .then((res) => {
            return res;
          });
      }
    }

    const getSubjects = () => {
      
      return new Subject()
        .field('*')
        .valueOf()
        .then((res) => {
          return res;
        });
    };
  
    return {
      getSubject,
      getSubjects,
      getUserSubjects,
      newSubject
    };
  })();