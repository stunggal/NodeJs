// create web server with http
var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    const url = req.url;
    if (url === '/') {
        res.write('<h1>Hello World</h1>');
    } else if (url === '/about') {
        res.write('<h1>About</h1>');
    } else {
        res.write('<h1>404</h1>');
    }
    res.end();
}
);
server.listen(1337, 'localhost');
console.log('Server running at http://localhost:1337/');
// create web server with http