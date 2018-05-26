module.exports = (() => {
    'use strict';
    const {getSubjects, addSubject} = require('./subject_actions');
    
    const getSubjectsRoute = (req, res) => {
      getSubjects().then((subjects) => {
        res.json({success: true, subjects});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };

    const addSubjectRoute = (req, res) => {
      newSubject(req.body).then(() => {
        res.json({success: true, message: "Added subject"});
      }).catch((e) => {
        console.log(e);
        res.json({success: false});
      });
    };
  
    return {
      getSubjectsRoute,
      addSubjectRoute
    };
  })();