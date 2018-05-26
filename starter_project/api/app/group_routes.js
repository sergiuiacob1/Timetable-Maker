module.exports = (() => {
    'use strict';
    const {getGroups} = require('./group_actions');
    
    const getGroupsRoute = (req, res) => {
      getGroups().then((groups) => {
        res.json({success: true, groups});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };
  
    return {
      getGroupsRoute
    };
  })();