module.exports = (() => {
  'use strict';

  const squel = require('squel');
  const { Extension } = require('./../../config/pools.js');
  const ApplicationRecord = require('./application_record.js');

  class RoomHours extends ApplicationRecord {
    constructor() {
      console.log(Extension);
      super(Extension, "room_hours");
    }

    where({
      roomId
    }) {
      let whereClause = squel.expr();

      if (roomId) {
        whereClause = whereClause.and("room_id = ?", roomId);
      }
      this.query = this.query.where(whereClause);
      return this;
    }
  }

  return RoomHours;
})();
