module.exports = (() => {
  'use strict';

  const resource = require('./models/resource');
  const {
    newResource,
    getResources,
    getLastId,
    updateResource,
    deleteResource
  } = require('./resource_actions');
  const dependency = require('./models/dependency');
  const {
    newDependency,
    getDependencies,
    deleteDependency
  } = require('./dependency_actions');
  const {
    createDependenciesForItem,
    deleteDependenciesForItem
  } = require('./dependency_utils');

  const newResourceRoute = (req, res) => {
    const type = req.body.type;
    const name = req.body.name;
    const capacity = req.body.capacity;
    const dependencies = req.body.dependencies;

    if (type || name || capacity || dependencies) {
      newResource({ type, name, capacity })
        .then((result) => {
          if (Array.isArray(dependencies)) {
            createDependenciesForItem({ dependencies })
              .then((result) => {
                console.log(result);
                res.json({ success: result });
              })
              .catch((e) => {
                console.log(e);
                res.json({ success: false, message: 'An error occured!' });
              });
          }
          else {
            console.log(result);
            res.json({ success: result });
          }
        }).catch((e) => {
          console.log(e);
          res.json({ success: false, message: 'An error occured!' });
        })
    }
    else {
      res.json({ success: false, message: 'Resource type, name and capacity must be provided.' });
    }
  };

  const getResourcesRoute = (req, res) => {
    getResources(req.query).then((resource) => {
      console.log(resource);
      res.json({ success: true, resource });
    }).catch((e) => {
      console.log(e);
      res.json({ success: false, message: 'An error occured!' });
    })
  };

  const updateResourceRoute = (req, res) => {
    const id = req.body.id;
    const dependencies = req.body.dependencies;
    const body = req.body;
    body.id = id;
    getResources({ id }).then((resource) => {
      console.log(resource);
      if (resource.length === 1) {
        return updateResource(body)
          .then(() => {
            if (Array.isArray(dependencies)) {
              deleteDependenciesForItem({ id })
                .then(() => {
                  return createDependenciesForItem({ dependencies })
                })
                .then(() => {
                  res.json({ success: true })
                })
                .catch((e) => {
                  console.log(e);
                  res.json({ success: false });
                })
            }
            else {
              res.json({ success: true })              
            }
          });
      }
      else {
        res.json({ success: false, message: "Element not found"});
      }
    }).catch((e) => {
      console.log(e);
      res.json({ success: false, message: 'An error occurred' });
    })
  }


  const deleteResourceRoute = (req, res) => {
    const id = req.body.id;

    if (id) {
      deleteResource({ id })
        .then((result) => {
          console.log(result);
          res.json({ success: result });
        }).catch((e) => {
          console.log(e);
          res.json({ success: false, message: 'An error occured!' });
        })
    }
    else {
      res.json({ success: false, message: 'Resource id must be provided.' });
    }
  };

  return {
    newResourceRoute,
    getResourcesRoute,
    updateResourceRoute,
    deleteResourceRoute
  };
})();