var http = require("http");

http.createServer(function (request, response) {
   console.log('incoming request: ' + request.url);
   response.writeHead(200, {'Content-Type': 'application/json'});
   response.end('{"received":true}');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
