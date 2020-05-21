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
  console.log('a:: aR: ENTERED: req.url: ', req.url);
  console.log('a:: aR: ENTERED: req.body: ', req.body);

  pg.addResource(req.body)
    .then((results) => {
      console.log('a:: aR: r.r.[0]: COMPLETED', results);

      res.sendStatus(201);
    })
    .catch((err) => console.log(err)); // eslint: unexpected console statement
});

// deleteResource
app.delete('/resources_db/resources/:id', (req, res) => {
  console.log('a: dR: ENTERED: r.body[0]: ', req.params.id);

  pg.deleteResource(req.params.id)
    .then(() => {
      console.log('a: dR: COMPLETED');

      res.sendStatus(204); // null-ish
    })
    .catch((err) => console.log(err));
});

// getAllResources
app.get('/resources_db/resources', (req, res) => {
  console.log('a:: gARs: ENTERED');

  pg.getAllResources()
    .then((results) => {
      // const resultsJSON = JSON.stringify({ data: results });
      // res.send(resultsJSON);
      console.log('a:: gARs: r.rs[3]: COMPLETED', results[3]);

      res.send({ data: results });
    })
    .catch((err) => console.log('app.js: gARs: err: ', err));
});

// getResource
app.get('/resources_db/resources/:id', (req, res) => {
  console.log('a:: gR: ENTERED: req.id: ', req.params.id);
  console.log('a:: gR: ENTERED');

  pg.getResource(req.params.id)
    .then((results) => {
      console.log('a:: gR: rs: COMPLETED', results);
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// updateResource
app.put('/resources_db/resources/:id', (req, res) => {
  console.log('a:: uR: ENTERED');
  console.log('a:: uR: ENTERED: req.body: ', req.body);

  pg.updateResource(req.body)
    .then((results) => {
      console.log('a:: uR: r.rs: COMPLETED', results);

      res.sendStatus(201);
    })
    .catch((err) => console.log(err));
});

module.exports = app;
