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
        id, type, name, capacity
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        if (type) {
          whereClause = whereClause.and('type = ?', type);
        }
        if (name) {
          whereClause = whereClause.and('name = ?', name);
        }
        if (capacity) {
          whereClause = whereClause.and('capacity = ?', capacity);
        }
       
        this.query = this.query.where(whereClause);
        return this;
      }

      lastId() {
        this.query = squel.select()
          .from(this.table)
          .field("id")
          .order("id", false)
          .limit(1);
        return this;
      }
    }
  
    return Resource;
  })();
  