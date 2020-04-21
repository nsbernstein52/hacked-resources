// const { Pool, Client } = require('pg')
const { Pool } = require('pg')
const pool = new Pool({
  database: 'resources_db',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  // process.env.DB_USER should be recognized by root
  // host private dns 
  // security group allow ot access each other
  // ipAddress: 3.16.68.230/32,
  // password: 'PW',
  port: 5432 // GOOD?  BAD?
  // port: 4000 // GOOD?  BAD?
});

// console.log( new Date());
// console.log("q.js: ENTERING");

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// });

// getAllResources
const getAllResources = () => {
  // let values = [];
  // console.log("q: gRs: id ENTERED");
  return pool.query("SELECT * FROM resources")
  .then(res => {
    // console.log("q: gARs r.r[3]:", res.rows[3]);
    // return res.rows[0];
    return res.rows;
  })
};

// getOneResource for a resource_id
const getOneResource = (resource_id) => {
  let values = [resource_id];
  // console.log("q: gOR: id ENTERED", resource_id);
  return pool.query("SELECT * FROM resources where id = $1", values)
  .then(res => {
    // console.log("q: gOR r.r[0]:", res.rows[0]);
    // return res.rows[0];
    return res.rows;
  })
};

//getOneUser
const getOneUser = (user_id) => {
  let values = [user_id];
  // console.log("q: gUs: user_id ENTERED", user_id);
  return pool.query("SELECT * FROM users where user_id = $1", values)
  .then(res => {
    // console.log("q: gS r.rs:", res.rows);
    // return res.rows[0];
    return res.rows;
  })
};

//getOneTopic
const getOneTopic = (topic_id) => {
  let values = [topic_id];
  // console.log("q: gTs: topic_id ENTERED", topic_id);
  return pool.query("SELECT * FROM topics where topic_id = $1", values)
  .then(res => {
    // console.log("q: gTs r.rs:", res.rows);
    // return res.rows[0];
    return res.rows;
  })
};

// console.log("q.js: LEAVING");

module.exports = {
  getAllResources,
  getOneResource,
  getOneUser,
  getOneTopic
}

