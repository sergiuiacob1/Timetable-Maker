module.exports = (() => {
    'use strict';
    const Subject = require('./models/subject');
  
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

    const getSubjects = ({userId}) => {
      console.log(userId);
      if (userId) {
        return new Subject()
          .field('*')
          .where({userId})
          .valueOf()
          .then((res) => {
            return res;
          });
      }
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
      newSubject
    };
  })();