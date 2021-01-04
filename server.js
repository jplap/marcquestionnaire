let http = require('http');
var app = require('./app');
let port = 8686;
var httpServer = http.createServer( app);

console.log ("listen port:"+ port)
httpServer.listen(port);