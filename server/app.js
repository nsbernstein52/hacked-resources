// require('newrelic');
require('dotenv').config();

// const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const pg = require("../db/query.js");

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

let entryTime = new Date();
// console.log("a.js: ENTERING");

// getAllResources
app.get('/resources_db/resources', (req, res) => {
  // console.log("a:: gARs: ENTERED");
  pg.getAllResources()
  .then((results) => {
    // console.log("a:: gARs: r.r.[0]: COMPLETED", results[0]);
    res.send(results);
  })
  .catch(err => console.log(err));
});

// getOneResource
app.get('/resources_db/:id', (req, res) => {
  // let entryTime = new Date();
  // console.log("a:: gOR: req.url: ", req.url);
  // console.log("a:: gOR: ENTERED");
  pg.getOneResource(req.params.id)
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