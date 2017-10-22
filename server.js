const express = require('express');
const hbs = require('hbs');

var app = express(); // create a new express app

/*
Using hbs as the default view engine.
This will render .hbs files when res.render is called.
*/
app.set('view engine', 'hbs');
/*
views is the default directory that Express uses for your templates
*/

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
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  // The 2nd argument is the data we want to inject into templates
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
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
