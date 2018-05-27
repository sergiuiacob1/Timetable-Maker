module.exports = (() => {
    'use strict';
    const LinkedConstraint = require('./models/linked_constraint.js');

    const getLinkedConstraints = ({userId}) => {
      if (userId) {
        return new LinkedConstraint()
        .field('*')
        .where({userId})
        .valueOf()
        .then((res) => {
          return res.map((element) => {
            return {
              id: element.id,
              ids: JSON.parse(element.ids),
              days: JSON.parse(element.days),
              win: element.win
            };
          });
        });  
      }
    };

    const addLinkedConstraint = ({userId, ids, days, win}) => {
        return new LinkedConstraint()
        .insert()
        .set('user_id', userId)
        .set('ids', JSON.stringify(ids))
        .set('days', JSON.stringify(days))
        .set('win', win)
        .valueOf()
        .then((res) => {
            return res;
        });
        // console.log(JSON.stringify(request));
    }
  
    return {
        getLinkedConstraints,
        addLinkedConstraint
    };
  })();