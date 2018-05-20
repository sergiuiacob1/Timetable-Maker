module.exports = (() => {
    'use strict';
    const Dependency = require('./models/dependency');
    
    const newDependency = ({dependant, dependency}) => {
      return new Dependency()
      .insert()
      .set('dependant', dependant)
      .set('dependency', dependency)
      .valueOf()
      .then(() => {
        return true;
      });
    };
  
    const getDependencies = (query) => {
      return new Dependency()
        .field('*')
        .where(query)
        .valueOf()
        .then((res) => {
          return res;
        });
    }
  
    const deleteDependency = ({dependant, dependency}) => {
      return new Dependency()
        .delete()
        .where({dependant, dependency})
        .valueOf()
        .then(() => {
          return true;
        });
    };
  
    return {
      newDependency,
      getDependencies,
      deleteDependency
    };
  })();