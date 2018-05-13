module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class Resource extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "resource");
      }
  
      where({
        id,
        name
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        if (name) {
          whereClause = whereClause.and("name = ?", name);
        }
       
        this.query = this.query.where(whereClause);
        return this;
      }
    }
  
    return User;
  })();
  