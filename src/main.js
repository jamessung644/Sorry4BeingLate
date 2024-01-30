var http = require('http');
var fs = require('fs');
var path = require('path');

var app = http.createServer(function(request, response) {
    var url = request.url;

    // Correcting the condition to serve 'index.html' when the root is accessed
    if (url === '/') {
        url = '/index.html';
    }

    // Handling favicon requests to prevent unnecessary processing
    if (url === '/favicon.ico') {
        response.writeHead(404);
        response.end(); // End the response after sending 404 status
        return;
    }

    // Define the full path to the file
    var filePath = path.join(__dirname, url);

    // Check if the file exists
    fs.exists(filePath, function(exists) {
        if (exists) {
            // Serve the file
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        } else {
            // File not found, send a 404 response
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});
