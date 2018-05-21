module.exports = (() => {
    'use strict';
  
    const {getConstraints, addConstraint} = require('./constraints_actions.js');
  
    const getConstraintsRoute = (req, res) => {
      getConstraints().then((constraints) => {
        console.log(constraints);
        res.json({success: true, constraints});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });

    };

    const newConstraintRoute = (req, res) => {
      addConstraint(req).then(() => {
        res.json({success: true, message: "Added constraint"});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };
  
    return {
      getConstraintsRoute,
      newConstraintRoute
    };
  })();