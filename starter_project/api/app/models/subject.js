
module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class Subject extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "subjects");
      }
  
      where({
        id
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        this.query = this.query.where(whereClause);
        return this;
      }
    }
  
    return Subject;
  })();
  