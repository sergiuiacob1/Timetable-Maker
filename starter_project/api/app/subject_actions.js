module.exports = (() => {
    'use strict';
    const Subject = require('./models/subject');
  
  
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
      getSubjects
    };
  })();