module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class Dependency extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "dependencies");
      }
  
      where({
        id, dependant, dependency
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        if (dependant) {
          whereClause = whereClause.and('dependant = ?', dependant);
        }
        if (dependency) {
          whereClause = whereClause.and('dependency = ?', dependency);
        }
       
        this.query = this.query.where(whereClause);
        return this;
      }
    }
  
    return Dependency;
  })();
  