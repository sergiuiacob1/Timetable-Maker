module.exports = (() => {
  'use strict';

  const resource = require('./models/resource');
  const {
    newResource,
    getResourceById,
    getResourceByType,
    getResourceByName,
    getResourceByCapacity,
    getAllResources,
    updateResource,
    deleteResource
  } = require('./resource_actions');

  const newResourceRoute = (req, res) => {
    const type = req.body.type;
    const name = req.body.name;
    const capacity = req.body.capacity;

    if (type || name || capacity) {
      newResource({type, name, capacity})
      .then((result) => {
        console.log(result);
        res.json({success: result});
      }).catch((e) => {
        console.log(e);
        res.json({success: false, message: 'An error occured!'});
      })
    }
    else {
      res.json({success: false, message: 'Resource type, name and capacity must be provided.'});
    }
  };

  const getResourceByIdRoute = (req, res) => {
    const id = req.body.id;
    getResourceById({id}).then((resource) => {
      if (resource) {
        console.log(resource);
        res.json({success: true, resource});
      }
      else {
        console.log('Result is undefined');
        res.json({success: false, message: 'Resource not found'});
      }
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };
  
  const getResourcesByTypeRoute = (req, res) => {
    const type = req.body.type;
    getResourceByType({type}).then((resources) => {
      if (resources) {
        console.log(resources);
        res.json({success: true, resources});
      }
      else {
        console.log('Result is undefined');
        res.json({success: false, message: 'Resource not found'});
      }
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  }; 
  
  const getResourcesByNameRoute = (req, res) => {
    const name = req.body.name;
    getResourceByName({name}).then((resources) => {
      if (resources) {
        console.log(resources);
        res.json({success: true, resources});
      }
      else {
        console.log('Result is undefined');
        res.json({success: false, message: 'Resource not found'});
      }
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  }; 
  
  const getResourcesByCapacityRoute = (req, res) => {
    const capacity = req.body.capacity;
    getResourceByCapacity({capacity}).then((resources) => {
      if (resources) {
        console.log(resources);
        res.json({success: true, resources});
      }
      else {
        console.log('Result is undefined');
        res.json({success: false, message: 'Resource not found'});
      }
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };
  
  const getAllResourcesRoute = (req, res) => {
    getAllResources().then((resources) => {
      console.log(resources);
      res.json({success: true, resources});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })
  };

  const updateResourceRoute = (req, res) => {
    const id = req.body.id;
    const body = req.body;
    body.id = id;
    getResourceById({id}).then((resource) => {
      console.log(resource);
      return updateResource(body).then(() => {
        res.json({success: true});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occurred'});
    })}
  )};

  const deleteResourceRoute = (req, res) => {
    const id = req.body.id;

    if (id) {
      deleteResource({id})
      .then((result) => {
        console.log(result);
        res.json({success: result});
      }).catch((e) => {
        console.log(e);
        res.json({success: false, message: 'An error occured!'});
      })
    }
    else {
      res.json({success: false, message: 'Resource id must be provided.'});
    }
  };

  return {
    newResourceRoute,
    getResourceByIdRoute,
    getResourcesByTypeRoute,
    getResourcesByNameRoute,
    getResourcesByCapacityRoute,
    getAllResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  };
})();