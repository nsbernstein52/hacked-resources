// require('newrelic');
require('dotenv').config();
const path = require('path');

// const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const pg = require('../db/query.js');

// // get/ test that running this file
app.get('/', (req, res) => {
  res.send("hello")
});

// app.use(express.static(__dirname + '/public'));
let pathname = path.join(__dirname, '../public/index.html');
// console.log("app: pathname: ", pathname);
app.use(express.static(pathname));

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

let entryTime = new Date();
// console.log(new Date());
console.log("a.js: ENTERING", new Date());

// addResource
app.post('/resources_db/resources/', (req, res) => {
  // let entryTime = new Date();
  // console.log("a:: aoR: req.url: ", req.url);
  // console.log("a:: aoR: ENTERED");
  pg.addResource(req.body)
  .then((results) => {
    // console.log("a:: aoR: r.r.[0]: COMPLETED", results);
    // console.log("duration to complete call: ", new Date() - entryTime, req.url);
    res.sendStatus(201);
  })
  .catch(err => console.log(err));
});

// deleteResource
app.delete('/resources_db/resources/:id', (req, res) => {
  console.log("i: dR: ENTERED");
  pgdb.deleteResource(req.params.id)
    .then(() => {
      console.log("i: dR: COMPLETED");
      res.sendStatus(204); // null-ish
    })
    .catch(err => console.log(err));
});



// getAllResources
app.get('/resources_db/resources_flat', (req, res) => {
  // console.log("a:: gARs: ENTERED");
  pg.getAllResources()
  .then((results) => {
    let resultsJSON = JSON.stringify({data: results})
    // console.log("a:: gARs: r.r.[0]: COMPLETED", resultsJSON[4]);
    // let resObj = {key: results};
    // res.send(results);
    res.send(resultsJSON);
  })
  .catch(err => console.log("app.js: gAR: err: ", err));
});

// getAllResourcesV01
app.get('/resources_db/resources', (req, res) => {
  // console.log("a:: gARv01s: ENTERED");
  pg.getAllResourcesV01()
  .then((results) => {
    let resultsJSON = JSON.stringify({data: results})
    // console.log("a:: gARv01s: r.r.[0]: COMPLETED", resultsJSON[4]);
    // let resObj = {key: results};
    // res.send(results);
    res.send(resultsJSON);
  })
  .catch(err => console.log("app.js: gAR: err: ", err));
});

// getResource
app.get('/resources_db/resources_flat/:id', (req, res) => {
  // let entryTime = new Date();
  // console.log("a:: gOR: req.url: ", req.url);
  // console.log("a:: gOR: ENTERED");
  pg.getResource(req.params.id)
  .then((results) => {
    // console.log("a:: gOR: r.r.[0]: COMPLETED", results);
    // console.log("duration to complete call: ", new Date() - entryTime, req.url);
    res.send(results);
  })
  .catch(err => console.log(err));
});

// getOneUser
app.get('/resources_db/users/:id', (req, res) => {
  // let entryTime = new Date();
  // console.log("a:: gOU: ENTERED");
  pg.getOneUser(req.params.id)
  .then((results) => {
    // console.log("a:: gOU: r.r.[0]: COMPLETED", results);
    // console.log("duration to complete call: ", new Date() - entryTime, req.url);
    res.send(results);
  })
  .catch(err => console.log(err));
});

// getOneTopic
app.get('/resources_db/topics/:id', (req, res) => {
  // let entryTime = new Date();
  // console.log("a:: gOT: ENTERED");
  pg.getOneTopic(req.params.id)
  .then((results) => {
    // console.log("a:: gOT: r.rs: COMPLETED", results);
    // console.log("duration to complete call: ", new Date() - entryTime, req.url);
    res.send(results);
  })
  .catch(err => console.log(err));
});

// console.log("a:: LEAVING");

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});