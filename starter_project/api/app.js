const Server = require('./app/server');

const server = Server.getInstance();
const port = 2222;

server.start(port);
