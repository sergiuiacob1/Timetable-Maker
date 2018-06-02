module.exports = (() => {
  'use strict';

  const {getConstraints, addConstraint, deleteConstraint} = require('./constraints_actions.js');

  const deleteConstraintRoute = (req, res) => {
    const id = req.body.id;
    deleteConstraint({id}).then((constraint) => {
      console.log (constraint);
      res.json({success: true, message: "Deleted constraint"});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  };

  const getConstraintsRoute = (req, res) => {
    var constraint_id = req.param('id') || req.headers['id'];

    const userId = parseInt(constraint_id);

    if(isNaN(userId)) {
      res.json({success: false});
      return;
    }

    getConstraints({userId}).then((constraints) => {
      console.log(constraints);
      res.json({success: true, constraints});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });

  };

  const newConstraintRoute = (req, res) => {
    const userId = req.decoded.user.id;
    req.body.userId = userId;

    addConstraint(req.body).then(() => {
      res.json({success: true, message: "Added constraint"});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  };

  return {
    getConstraintsRoute,
    newConstraintRoute,
    deleteConstraintRoute
  };
})();