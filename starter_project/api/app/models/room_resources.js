module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class RoomResource extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "rooms_resources");
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
  
    return RoomResource;
  })();
  