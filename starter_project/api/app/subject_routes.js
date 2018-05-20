module.exports = (() => {
    'use strict';
    const {getSubjects} = require('./subject_actions');
    
    const getSubjectsRoute = (req, res) => {
      getSubjects().then((subjects) => {
        res.json({success: true, subjects});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };
  
    return {
      getSubjectsRoute
    };
  })();