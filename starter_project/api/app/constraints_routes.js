module.exports = (() => {
    'use strict';
  
    const {getConstraints} = require('./constraints_actions.js');
  
    const getConstraintsRoute = (req, res) => {

      getConstraints().then((constraint) => {
        console.log('constraints');
        res.json({success: true, constraints});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });

    };
  
    return {
      getConstraintsRoute
    };
  })();