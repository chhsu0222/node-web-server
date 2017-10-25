const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); // create a new express app

hbs.registerPartials(__dirname + '/views/partials');
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

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// 1st argument: name; 2nd one: function
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// e.g. {{screamIt welcomeMessage}}
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// setup HTTP route handlers (for HTTP 'GET' request)
// 1st argument is URL
// 2nd one is a function
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  // The 2nd argument is the data we want to inject into templates
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'New project',
    message: 'Let\'s find out'
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
