module.exports = (() => {
  'use strict';
  const Room = require('./models/room');
  const RoomHours = require('./models/room_hours');
  const RoomResource = require('./models/room_resources');

  const getRoomHours = (roomId) => {
    return new RoomHours()
      .field('day')
      .field('available_hours')
      .where({roomId})
      .valueOf()
      .then((res) => {
        return res;
      });
  };

  const getRoomResources = (roomId) => {
    return new RoomResource()
      .field('resource_id')
      .where({roomId})
      .valueOf()
      .then((res) => {
        return res;
      });
  };

  const getRoom = ({id}) => {
    if (id){
      return new Room()
        .field('*')
        .where({id})
        .valueOf()
        .then((res) => {
          return res[0];
          const room = res[0];

          return getRoomHours(room.id).then((hours) => {
            room.defaultAvailableHours = hours;
            return getRoomResources(room.id).then((resources) => {
              room.resources = resources;
              return room;
            });
          });
        });
    }
  };

  const getRooms = () => {
    return new Room()
      .field('*')
      .valueOf()
      .then((res) => {
        return Promise.all(res.map((room) => {
          return getRoomHours(room.id).then((hours) => {
            room.defaultAvailableHours = hours;
            return getRoomResources(room.id).then((resources) => {
              room.resources = resources;
              return room;
            });
          })
        }));
      });
  };

  

  return {
    getRoom,
    getRooms
  };
})();