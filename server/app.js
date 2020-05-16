require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const pg = require('../db/query.js');

const PORT = process.env.PORT || 3000;
const app = express();

// const bodyParser = require('body-parser'); QQQ NOT USED

// get - tests that this file executes
// app.get('/', (req, res) => {
//   res.send('hello')
// });

const pathname = path.join(__dirname, '../public/index.html');
// console.log('app: pathname: ', pathname);
app.use(express.static(pathname));
app.use(cors());
app.use(express.json());

const entryTime = new Date().toLocaleTimeString();
// console.log(new Date());
// console.log('a.js: ENTERING', entryTime);
// console.log('PORT: ', PORT);
// console.log(__dirname);

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname + '/../public/index.html'))
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/dist/bundle.js', (req, res) => {
  // res.sendFile(path.resolve(__dirname + '/../dist/bundle.js'))
  res.sendFile(path.join(__dirname, '/../dist/bundle.js'));
});

// CRUD

// addResource
app.post('/resources_db/resources/', (req, res) => {
  // let entryTime = new Date();
  // console.log('a:: aR: ENTERED: req.url: ', req.url);
  // console.log('a:: aR: ENTERED: req.body: ', req.body);
  pg.addResource(req.body)
    .then((results) => {
    // console.log('a:: aR: r.r.[0]: COMPLETED', results);
    // console.log('duration to complete call: ', new Date() - entryTime, req.url);
      res.sendStatus(201);
    })
    .catch((err) => console.log(err)); // eslint: unexpected console statement
});


// deleteResource
app.delete('/resources_db/resources/:id', (req, res) => {
  // console.log('a: dR: ENTERED: r.body[0]: ', req.body[0]);
  pg.deleteResource(req.body[0])
    .then(() => {
      // console.log('a: dR: COMPLETED');
      res.sendStatus(204); // null-ish
    })
    .catch((err) => console.log(err));
});

// getAllResources
app.get('/resources_db/resources', (req, res) => {
  // console.log('a:: gARs: ENTERED');
  pg.getAllResources()
    .then((results) => {
      const resultsJSON = JSON.stringify({ data: results });
      // console.log('a:: gARs: r.rJ[3]: COMPLETED', resultsJSON[3]);
      res.send(resultsJSON);
    })
    .catch((err) => console.log('app.js: gARs: err: ', err));
});

// getResource
app.get('/resources_db/resources/:id', (req, res) => {
  // console.log('a:: gR: ENTERED: req.id: ', req.params.id);
  // console.log('a:: gOR: ENTERED');
  pg.getResource(req.params.id)
    .then((results) => {
      // console.log('a:: gR: rs: COMPLETED', results);
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// getUser
app.get('/resources_db/users/:id', (req, res) => {
  // console.log('a:: gU: ENTERED');
  pg.getUser(req.params.id)
    .then((results) => {
      // console.log('a:: gU: rs: COMPLETED', results);
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// getTopic
app.get('/resources_db/topics/:id', (req, res) => {
  // console.log('a:: gT: ENTERED');
  pg.getTopic(req.params.id)
    .then((results) => {
      // console.log('a:: gT: rs: COMPLETED', results);
      res.send(results);
    })
    .catch((err) => console.log(err));
});


// updateResource // put request handler, i.e. register a put with path, will call function
app.put('/resources_db/resources/:id', (req, res) => {
  // console.log('a:: uR: ENTERED');
  // console.log('a:: uR: ENTERED: req.body: ', req.body);
  pg.updateResource(req.body)
    .then((results) => {
      // console.log('a:: uR: r.rs: COMPLETED', results);
      res.sendStatus(201);
    })
    .catch((err) => console.log(err));
});

// console.log('a:: LEAVING');

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}, at`, new Date().toLocaleTimeString());
});
