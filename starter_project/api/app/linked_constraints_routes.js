module.exports = (() => {
    'use strict';
  
    const {getLinkedConstraints, addLinkedConstraint} = require('./linked_constraints_actions.js');
  
    const getLinkedConstraintsRoute = (req, res) => {
      const userId = req.decoded.user.id;
      getLinkedConstraints({userId}).then((constraints) => {
        console.log(constraints);
        res.json({success: true, constraints});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });

    };

    const newLinkedConstraintRoute = (req, res) => {
      const userId = req.decoded.user.id;
      req.body.userId = userId;

      addLinkedConstraint(req.body).then(() => {
        res.json({success: true, message: "Added constraint"});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };
  
    return {
      getLinkedConstraintsRoute,
      newLinkedConstraintRoute
    };
  })();