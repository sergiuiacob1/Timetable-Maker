module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class Constraint extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "constraints");
      }
  
      where({
        id,
        startDate,
        endDate,
        room
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        if (startDate) {
          whereClause = whereClause.and("startDate = ?", startDate);
        }
        if (endDate) {
            whereClause = whereClause.and("endDate = ?", endDate);
        }
        if (room) {
            whereClause = whereClause.and("room = ?", room);
        }
       
        this.query = this.query.where(whereClause);
        return this;
      }
    }
  
    return Constraint;
  })();
  