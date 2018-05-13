var http = require('http');

http.createServer(function (request, res) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    });
}).listen(2223);

console.log('Server running at http://127.0.0.1:2223/');