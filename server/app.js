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

app.get('/', (req, res) => {
  res.sendFile(pathname);
});

app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/bundle.js'));
});

// CRUD

// addResource
app.post('/resources_db/resources/', (req, res) => {
  pg.addResource(req.body)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => console.log(err));
});

// deleteResource
app.delete('/resources_db/resources/:id', (req, res) => {
  pg.deleteResource(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

// getAllResources
app.get('/resources_db/resources', (req, res) => {
  pg.getAllResources()
    .then((results) => {
      res.send({ data: results });
    })
    .catch((err) => console.log('app.js: gARs: err: ', err));
});

// getResource
app.get('/resources_db/resources/:id', (req, res) => {
  pg.getResource(req.params.id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// updateResource
app.put('/resources_db/resources/:id', (req, res) => {
  pg.updateResource(req.body)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => console.log(err));
});

module.exports = app;
