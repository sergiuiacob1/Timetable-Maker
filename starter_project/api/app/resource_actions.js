module.exports = (() => {
    'use strict';
    const Resource = require('./models/resource');
  
    const newResource = ({name}) => {
      return new Resource()
        .insert()
        .set('name', name)
        .valueOf()
        .then(() => {
          return true;
        });
    };
  
    const getResource = ({id, name}) => {
      if (id){
        return new Resource()
          .field('*')
          .where({id})
          .valueOf()
          .then((res) => {
            return res[0];
          });
      }
      return new Resource()
      .field('*')
      .where({name})
      .valueOf()
      .then((res) => {
        console.log("ASDASDAS" + JSON.stringify(res));
        if (res.length > 1)
          return null;
        return res[0];
      });
    };

    const getResources = () => {
        return new Room()
          .field('*')
          .valueOf()
          .then((res) => {
            return res;
          });
      };
    
  
    return {
        newResource,
        getResource,
        getResources
    };
  })();