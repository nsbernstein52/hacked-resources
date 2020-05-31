require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const pg = require('../db/query.js');

const app = express();
const pathname = path.join(__dirname, '../public/index.html');

app.use(express.static(pathname));
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(pathname);
});

app.get('/dist/bundle.js', (request, response) => {
  response.sendFile(path.join(__dirname, '/../dist/bundle.js'));
});

// CRUD

app.post('/resources_db/resources/', (request, response) => {
  pg.addResource(request.body)
    .then((results) => {
      response.sendStatus(201);
    })
    .catch((error) => console.error(error));
});

app.delete('/resources_db/resources/:id', (request, response) => {
  pg.deleteResource(request.params.id)
    .then(() => {
      response.sendStatus(204);
    })
    .catch((error) => console.error(error));
});

app.get('/resources_db/resources', (request, response) => {
  pg.getAllResources()
    .then((results) => {
      response.send({ data: results });
    })
    .catch((error) => console.log('app.js: gARs: error: ', error));
});

app.get('/resources_db/resources/:id', (request, response) => {
  pg.getResource(request.params.id)
    .then((results) => {
      response.send(results);
    })
    .catch((error) => console.error(error));
});

app.put('/resources_db/resources/:id', (request, response) => {
  pg.updateResource(request.body)
    .then((results) => {
      response.sendStatus(201);
    })
    .catch((error) => console.error(error));
});

module.exports = app;
