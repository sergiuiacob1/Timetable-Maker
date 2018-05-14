module.exports = (() => {
  'use strict';

  const resource = require('./models/resource');
  const {
    newResource,
    getResources,
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

  const getResourcesRoute = (req, res) => {
    getResources(req.query).then((resource) => {
      console.log(resource);
      res.json({success: true, resource});
    }).catch((e) => {
      console.log(e);
      res.json({success: false, message: 'An error occured!'});
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
    getResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  };
})();