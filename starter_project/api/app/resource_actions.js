module.exports = (() => {
  'use strict';
  const Resource = require('./models/resource');
  
  const newResource = ({type, name, capacity}) => {
    return new Resource()
    .insert()
    .set('type', type)
    .set('name', name)
    .set('capacity', capacity)
    .valueOf()
    .then(() => {
      return true;
    });
  };

  const getResources = (query) => {
    return new Resource()
      .field('*')
      .where(query)
      .valueOf()
      .then((res) => {
        return res;
      });
  }

  const getLastId = () => {
    return new Resource()
      .lastId()
      .valueOf()
      .then((res) => {
        return res[0];
      })
  }

  const updateResource = ({id, type, name, capacity}) => {
    let updatedResource = new Resource().update();
    updatedResource.where({id});

    if (type && name && capacity) {
      return new Resource()
        .update()
        .set('type', type)
        .set('name', name)
        .set('capacity', capacity)
        .where({id})
        .valueOf()
        .then((res) => {
          return res;
        })
    }
  }

  const deleteResource = ({id}) => {
    return new Resource()
      .delete()
      .where({id})
      .valueOf()
      .then(() => {
        return true;
      });
  };

  return {
    newResource,
    getResources,
    getLastId,
    updateResource,
    deleteResource
  };
})();
