const path = require('path');

// crud functions

const addResource = (event, abbrev, contributor, description, level, link, topic, callback) => {
  event.preventDefault();
  const resourceObj = {
    abbrev, contributor, description, level, link, topic,
  };

  // naming QQQ
  // abbrev: abbrev,
  // contributor: contributor,
  // description: description,
  // level: level,
  // link: link,
  // topic: topic

  fetch('/resources_db/resources/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resourceObj),
  })
    .then(response => { // why eslnt catch?
      this.setState({
        resourcesChanged: true,
      });
    })
    .catch((error) => console.error('crud: aR: catch: ', error)); // eslint-disable-line
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
  this.setState({
    resourcesArr: this.state.resourcesArr.filter((elem) => {
      return elem.id !== rowKeys[0];
    }), // how???
  }, () => {
    event.preventDefault();
    const pathResoures = '/resources_db/resources/';
    const pathRowKeys0 = path.join(pathResoures, rowKeys[0]);
    fetch(pathRowKeys0, {
    // fetch('/resources_db/resources/' + rowKeys[0], {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        this.setState({
          resourcesChanged: true,
        });
      })
      .catch((error) => console.error('crud: dR: catch: ', error)); // eslint-disable-line
  });
};

const updateResource = (row, cellName, cellValue) => {
  const pathResoures = '/resources_db/resources/';
  const pathRowId = path.join(pathResoures, row.id);
  fetch(pathRowId, {
  // fetch('/resources_db/resources/' + row.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(row),
  })
    .then(response => {
      this.setState({
        resourcesChanged: true,
      });
    })
    .catch((error) => console.error('crud: uR: catch: ', error)); // eslint-disable-line
};

module.exports = {
  addResource,
  deleteResource,
  updateResource,
};
