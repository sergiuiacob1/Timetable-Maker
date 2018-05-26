module.exports = (() => {
    'use strict';
    const Constraint = require('./models/constraint.js');

    const getConstraints = () => {
      return new Constraint()
        .field('*')
        .valueOf()
        .then((res) => {
            return res;
        });
    };

    const addConstraint = (request) => {
        console.log(JSON.stringify(request));
    }
  
    return {
        getConstraints,
    };
  })();