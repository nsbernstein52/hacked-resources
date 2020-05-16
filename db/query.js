const { Pool } = require('pg');
let pool;
if (!process.env.DATABASE_URL) {
  pool = new Pool({
    database: 'resources_db',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// console.log("q: process.env.DB_HOST: ", process.env.DB_HOST);
// console.log("q: process.env.DB_USER: ", process.env.DB_USER);
// console.log("q: process.env.DB_USER: ", process.env.DB_PASS);

// //// TEST POOL:  the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// //// TEST CLIENT:  callback - checkout a client
pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT * FROM resources WHERE id = $1', [1], (err, res) => {
    done()
    if (err) {
      console.log("q: p.c: err: ", err.stack)
    } else {
      // console.log("q: p.c res.rows[0]: ", res.rows[0])
    }
  })
})

// //// CRUD

// //// addResource
const addResource = (resource) => {
  let values = [resource.abbrev, resource.contributor, resource.description, resource.level, resource.link, resource.topic];
  // console.log("q: aR: ENTERED");
  return pool.query('INSERT INTO resources (abbrev, contributor, description, level, link, topic) VALUES ($1, $2, $3, $4, $5, $6)', values)
  .then(res => {
    // console.log("q: gARs r.r[3]:", res.rows[3]);
    // console.log("q: aR: COMPLETED");
    return res.rows;
  })
  .catch(err => {console.error("error from DB", err)})
};

// //// deleteResource
const deleteResource = (id) => {
  let values = [id]
  return pool.query('DELETE FROM resources WHERE id = $1', values)
    .then(() => {
      // console.log("q: dR: COMPLETED: ");
      return true
   })
   .catch(err => {console.error("error from DB", err)})
};

// //// getAllResources
const getAllResources = () => {
  // console.log("q: gARs: ENTERED");
  return pool.query("SELECT * FROM resources")
  .then(res => {
    // console.log("q: gARs r.r[3]:", res.rows[3]);
    return res.rows;
  })
  .catch(err => {console.error("error from DB", err)})
};

// //// getResource
const getResource = (id) => {
  let values = [id];
  // console.log("q: gR: id ENTERED", id);
  return pool.query("SELECT * FROM resources where id = $1", values)
  .then(res => {
    // console.log("q: gR r.r[0]:", res.rows[0]);
    return res.rows;
  })
};

// //// getUser
const getUser = (id) => {
  let values = [id];
  // console.log("q: gUs: id ENTERED", id);
  return pool.query("SELECT * FROM users where id = $1", values)
  .then(res => {
    // console.log("q: gS r.rs:", res.rows);
    return res.rows;
  })
};

// //// getTopic
const getTopic = (id) => {
  let values = [id];
  // console.log("q: gT: id ENTERED", id);
  return pool.query("SELECT * FROM topics where id = $1", values)
  .then(res => {
    // console.log("q: gT: r.rs:", res.rows);
    // return res.rows[0];
    return res.rows;
  })
};

// //// updateResource
const updateResource = (row) => {
  // console.log("q: uR: ", row)
  let values = [row.id, row.abbrev, row.contributor, row.description, row.leve, row.link, row.topic];
  return pool.query("UPDATE resources SET (abbrev, contributor, description, level, link, topic) = ($2, $3, $4, $5, $6, $7) WHERE id = $1", values)
    .then(() => {
      // console.log("q: uR: COMPLETE");
      return true
   })
   .catch(err => {console.error("error from DB", err)})
};

// console.log("q.js: LEAVING");

module.exports = {
  addResource,
  deleteResource,
  getAllResources,
  getResource,
  getUser,
  getTopic,
  updateResource
}

