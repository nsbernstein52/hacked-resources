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

pool.on('error', (err, client) => {
  console.error('Unexpected postgres pool error on idle client', err); // eslint-disable-line
  process.exit(-1);
});

pool.connect((connectionErr, client, done) => {
  if (connectionErr) throw connectionErr;
  client.query('SELECT * FROM resources WHERE id = $1', [1], (queryErr, res) => {
    done();
    if (queryErr) {
      console.error('Failed to get resources from postgres pool: ', queryErr); // eslint-disable-line
    }
  });
});

// CRUD

const addResource = (resource) => {
  const values = [resource.abbrev, resource.contributor, resource.description, resource.level,
    resource.link, resource.topic];
  return pool.query('INSERT INTO resources (abbrev, contributor, description, level, link, topic) VALUES ($1, $2, $3, $4, $5, $6)', values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => { console.error('error from DB', err); }); // eslint-disable-line
};

const deleteResource = (id) => {
  const values = [id];
  return pool.query('DELETE FROM resources WHERE id = $1', values)
    .then(() => {
      return true;
    })
    .catch((err) => { console.error('error from DB', err); });
};

const getAllResources = () => {
  return pool.query('SELECT * FROM resources')
    .then((res) => {
      return res.rows;
    })
    .catch((err) => { console.error('error from DB', err); }); // eslint-disable-line
};

const getResource = (id) => {
  const values = [id];
  return pool.query('SELECT * FROM resources where id = $1', values)
    .then((res) => {
      return res.rows;
    });
};

const updateResource = (row) => {
  const values = [row.id, row.abbrev, row.contributor, row.description, row.level, row.link,
    row.topic];
  return pool.query('UPDATE resources SET (abbrev, contributor, description, level, link, topic) = ($2, $3, $4, $5, $6, $7) WHERE id = $1', values)
    .then(() => {
      return true;
    })
    .catch((err) => { console.error('error from DB', err); });
};

module.exports = {
  addResource,
  deleteResource,
  getAllResources,
  getResource,
  updateResource,
};
