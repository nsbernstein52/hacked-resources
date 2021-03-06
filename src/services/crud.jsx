const path = require('path');

const pathResources = '/resources_db/resources/';

const addResource = (resourceObj) => {
  return (
    fetch(`${pathResources}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceObj),
    })
      .catch((error) => console.error('crud: aR: catch: ', error))
  );
};

const deleteResource = (rowKeys) => {
  const pathRowKeys0 = path.join(pathResources, rowKeys[0].toString());
  return (
    fetch(`${pathRowKeys0}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.error('crud: dR: catch: ', error))
  );
};

const getAllResources = (callback) => {
  return (
    fetch(`${pathResources}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((data) => callback(data))
      .catch((error) => console.error('crud: dR: catch: ', error))
  );
};

const updateResource = (row, cellName, cellValue) => {
  const pathRowId = path.join(pathResources, row.id.toString());
  return (
    fetch(`${pathRowId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(row),
    })
      .catch((error) => console.error('crud: uR: catch: ', error))
  );
};

module.exports = {
  addResource,
  deleteResource,
  getAllResources,
  updateResource,
};
