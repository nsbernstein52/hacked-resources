const path = require('path');

const pathResources = '/resources_db/resources/';

// crud functions

const addResource = (resourceObj) => {
  return (
    fetch(`${pathResources}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', // QQQ
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceObj),
    })
      .catch((error) => console.error('crud: aR: catch: ', error)) // eslint-disable-line
  );
};

// deleteResource = (rowKeys) => {
//   this.setState( {
//     resourcesArr: this.state.resourcesArr.filter( (elem) => { return elem.id !== rowKeys[0] } )
//   });
//   event.preventDefault();
//   fetch('/resources_db/resources/' + rowKeys[0], {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
//   .then(response =>  {
//     this.setState( {
//       resourcesChanged: true
//     });
//   })
//   .catch(error => console.error('crud: dR: catch: ', error));
// };

const deleteResource = (rowKeys) => {
  const pathRowKeys0 = path.join(pathResources, rowKeys[0].toString());
  return (
    fetch(`${pathRowKeys0}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // .then((response) => response.json())
      // .then((data) => callback(data))
      .catch((error) => console.error('crud: dR: catch: ', error)) // eslint-disable-line  
  );
};

const getAllResources = (callback) => {
  fetch(`${pathResources}`)
    .then((resources) => {
      return resources.json();
    })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error('crud: gAR: catch: ', error)); // eslint-disable-line
};

const updateResource = (row, cellName, cellValue, callback) => {
  const pathRowId = path.join(pathResources, row.id);
  fetch(`${pathRowId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json', // QQQ
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error('crud: uR: catch: ', error)); // eslint-disable-line
};

module.exports = {
  addResource,
  deleteResource,
  getAllResources,
  updateResource,
};
