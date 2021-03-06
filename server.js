const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'hbs');
app.use((request, response, next) => {
  let now = new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to server.log.');
  })
  next();
});
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (request, response) => {
  response.render('index.hbs', {
    pageTitle: 'Home page',
    message: 'Welcome to my page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Portfolio page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    error: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
