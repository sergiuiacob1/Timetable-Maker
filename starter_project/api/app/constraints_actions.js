module.exports = (() => {
    'use strict';
    const Constraint = require('./models/constraint.js');

    const deleteConstraint = ({id}) => {
      if (id) {
        return new Constraint()
          .delete()
          .where({id})
          .valueOf()
          .then((res) => {
            return res;
          });
      }
    }

    const getConstraints = ({userId}) => {
      if (userId) {
        return new Constraint()
        .field('*')
        .where({userId})
        .valueOf()
        .then((res) => {
          return res.map((element) => {
            return {
              id: element.id,
              subjectId: element.subject_id,
              roomIds: JSON.parse(element.room_ids),
              groupIds: element.group_ids !== 'undefined' ? JSON.parse(element.group_ids): [],
              date: element.date,
              possibleIntervals: JSON.parse(element.possible_intervals),
              important: element.important,
              motive: element.motive
            }    
          });
        });  
      }
      // return new Constraint()
      //   .field('*')
      //   .valueOf()
      //   .then((res) => {
      //       return res;
      //   });
    };

    const addConstraint = ({userId, subjectId, roomIds, groupIds, date, possibleIntervals, important, motive}) => {
        return new Constraint()
        .insert()
        .set('user_id', userId)
        .set('subject_id', subjectId)
        .set('room_ids', JSON.stringify(roomIds))
        .set('group_ids', JSON.stringify(groupIds))
        .set('date', date)
        .set('possible_intervals', JSON.stringify(possibleIntervals))
        .set('important', important)
        .set('motive', motive)
        .valueOf()
        .then((res) => {
            return res;
        });
        // console.log(JSON.stringify(request));
    }
  
    return {
        getConstraints,
        addConstraint,
        deleteConstraint
    };
  })();