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

  const getResourceById = ({id}) => {
    if (id) {
      return new Resource()
        .field('*')
        .where({id})
        .valueOf()
        .then((res) => {
          return res[0];
        });
    }
  };

  const getResourceByType = ({type}) => {
    if (type) {
      return new Resource()
        .field('*')
        .where({type})
        .valueOf()
        .then((res) => {
          return res;
        });
    }
  };

  const getResourceByName = ({name}) => {
    if (type) {
      return new Resource()
        .field('*')
        .where({name})
        .valueOf()
        .then((res) => {
          return res;
        });
    }
  };

  const getResourceByCapacity = ({capacity}) => {
    if (capacity) {
      return new Resource()
        .field('*')
        .where({capacity})
        .valueOf()
        .then((res) => {
          return res;
        });
    }
  };

  const getAllResources = () => {
    return new Resource()
      .field('*')
      .valueOf()
      .then((res) => {
        return res;
      }, (err) => {
        console.log(err);
        return undefined;
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
      .valueOf()
      .then(() => {
        return true;
      });
  };

  return {
    newResource,
    getResourceById,
    getResourceByType,
    getResourceByName,
    getResourceByCapacity,
    getAllResources,
    updateResource,
    deleteResource
  };
})();