module.exports = (() => {
    'use strict';
    const Group = require('./models/group');
  
    const newGroup = ({name, number, year, subjects}) => {
      return new Group()
        .insert()
        .set('name', name)
        .set('number', number)
        .set('year', year)
        .set('subjects', subjects) //not sure here
        .valueOf()
        .then(() => {
          return true;
        });
    };
  
    const getGroup = ({id}) => {
      if (id){
        return new Group()
          .field('*')
          .where({id})
          .valueOf()
          .then((res) => {
            return res[0];
          });
      }
    };

    const getGroups = () => {
      return new Group()
        .field('*')
        .valueOf()
        .then((res) => {
          return res;
        });
    };
  
    return {
      newGroup,
      getGroup,
      getGroups
    };
  })();