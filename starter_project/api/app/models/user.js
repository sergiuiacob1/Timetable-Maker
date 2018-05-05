module.exports = (() => {
  'use strict';

  const squel = require('squel');
  const { Extension } = require('./../../config/pools.js');
  const ApplicationRecord = require('./application_record.js');

  class User extends ApplicationRecord {
    constructor() {
      console.log(Extension);
      super(Extension, "users");
    }

    where({
      mail,
      password,
      id
    }) {
      let whereClause = squel.expr();

      if (id) {
        whereClause = whereClause.and("id = ?", id);
      }
      if (mail && password) {
        whereClause = whereClause.and("password = ?", password).and("mail = ?", mail);
      }
     
      this.query = this.query.where(whereClause);
      return this;
    }
  }

  return User;
})();
