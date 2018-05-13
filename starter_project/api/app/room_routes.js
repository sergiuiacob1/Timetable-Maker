module.exports = (() => {
  'use strict';

  const {getRoom, getRooms} = require('./room_actions');

  const getRoomsRoute = (req, res) => {
    const id = req.decoded.user.id;

    getRooms().then((rooms) => {
      console.log('BBBBBBBB');
      console.log(rooms);
      res.json({success: true, rooms});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  };

  return {
    getRoomsRoute
  };
})();