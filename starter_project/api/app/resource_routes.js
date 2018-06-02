module.exports = (() => {
  'use strict';

  const resource = require('./models/resource');
    const {
        getRoom,
        getRooms,
        newRoom
    } = require('./room_actions');

  const {
    newResource,
    getResources,
    getLastId,
    updateResource,
    deleteResource
  } = require('./resource_actions');

  const newResourceRoute = (req, res) => {
    const type = req.body.type;
    const name = req.body.name;
    const capacity = req.body.capacity;

      if (type.toLowerCase() == 'sala') {
          newRoom({name: name, capacity: capacity}).then((rezult) => {
              if (typeof rezult != 'undefined' && rezult)
                  res.json({success: true, message: 'Resursa de tip sala a fost inserata'});
              else
                  res.json({success: false, message: 'Request invalid. Resursa nu a fost adaugata'});
          });
      }
      else if (type || name || capacity) {
          newResource({ type, name, capacity })
              .then((result) => {
                  console.log(result);
                  res.json({ success: result });
              })
              .catch((e) => {
                  console.log(e);
                  res.json({ success: false, message: 'An error occured!' });
              })
      }
      else {
          res.json({ success: false, message: 'Resource type, name and capacity must be provided.' });
      }
  };

  const getResourcesRoute = (req, res) => {
    getResources(req.query)
      .then((resources) => {
        console.log(resources);
        res.json({ success: true, resources });
      })
      .catch((e) => {
        console.log(e);
        res.json({ success: false, message: 'An error occured!' });
      })
  };

  const updateResourceRoute = (req, res) => {
    const id = req.body.id;
    const body = req.body;
    body.id = id;
    getResources({ id }).then((resource) => {
      if (resource.length === 1) {
        return updateResource(body)
          .then(() => {
              res.json({ success: true })
          });
      }
      else {
        res.json({ success: false, message: "Element not found" });
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