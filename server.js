const express = require('express');

var app = express(); // create a new express app

/*
Bind application-level middleware to
an instance of the app object by using the app.use()

express.static, a built-in middleware of Express,
serves static assets such as HTML files, images, and so on.
*/

app.use(express.static(__dirname + '/public'));

// setup HTTP route handlers (for HTTP 'GET' request)
// 1st argument is URL
// 2nd one is a function
app.get('/', (req, res) => {
  // respond to the request sending some data back
  res.send({
    // The content type would be JSON if we send an object back
    name: 'CH',
    like: [
      'Biking',
      'Cities'
    ]
  });
});

app.get('/about', (req, res) => {
  // Express automatically sets the content type to HTML
  res.send('<h1>About page</h1>');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle the request'
  });
});

// bind the application to a port on our machine
// use 'http://localhost:3000/' to see the response
app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // 3000 is the port
