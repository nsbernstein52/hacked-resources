import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import AddResource from './components/AddResource';
import Instructions from './components/Instructions';
import './App.css';

const crud = require('./services/crud.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcesArr: [],
      resourcesChanged: false
    };
  }

  componentDidMount() {
    this.loadAllResources();
  }

  componentDidUpdate() {
    if (this.state.resourcesChanged ) {
      this.setState( {
        resourcesChanged: false
      });
      this.loadAllResources();
    }
  }

  loadAllResources = () => {
    fetch('/resources_db/resources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resources) => {
        return resources.json();
      })
      .then((resourcesJSON) => {
        this.setState({
          resourcesArr:  resourcesJSON.data
        });
      })
      .catch(error => console.error(error));
  }

  // CRUD

  addResource = (event, abbrev, contributor, description, level, link, topic) => {
    event.preventDefault();
    const resourceObj = {
      abbrev, contributor, description, level, link, topic,
    };
    crud.addResource(resourceObj)
    .then(() => {
      this.setState( {
        resourcesChanged: true
      });
    })
    .catch(error => console.error('App: aR: catch: ', error));
  };


  deleteResource = (rowKeys) => {
    this.setState( {
      resourcesArr: this.state.resourcesArr.filter( (elem) => { return elem.id !== rowKeys[0] } )
    }, () => {
      event.preventDefault();
      crud.deleteResource(rowKeys)
      .then(() => {
        this.setState( {
          resourcesChanged: true
        });
      })
      .catch(error => console.error('App: dR: catch: ', error));  
    });
  };

  updateResource = (row, cellName, cellValue) => {
    event.preventDefault();
    crud.updateResource(row, cellName, cellValue)
    .then(() => {
      this.setState( {
        resourcesChanged: true
      });
    })
    .catch(error => console.error('App: uR: catch: ', error));
  };

  getAllResources = () => {
    crud.getAllResources()
    .then(() => {
      this.setState( {
        resourcesChange: true,
      })
    })
    .catch(error => console.error('App: dR: catch: ', error));
  };

  // for displaying link in rbt (react-bootstrap-table)
  linkFormatter = (cell, row) => { // cell argument required by rbt built-in function
    return <a href={row.link} target='_blank' title={row.link}>link</a>
  }

  isReadytoRenderResources = () => {
    return (
      this.state.resourcesArr !== null &&
      this.state.resourcesArr.length !== 0
    );
  }

  render() {
    const { resourcesArr } = this.state;

    if (!this.isReadytoRenderResources()) return null;

    // react-bootstrap-table OPTIONS
    const rbtOptions = {
      afterDeleteRow: this.deleteResource,
      sortIndicator: true
    };
    const cellEdit = { 
      mode: 'click',
      afterSaveCell: this.updateResource
    }
    const selectRow = {
       mode: 'radio'
      }

    return(
      <Container-fluid>
        
        <div className='container-fluid'>
          <Col>
            <Row className='page-header'>
              <Col >
                <b>HACKED RESOURCES</b>
                <Row className='subheader'>
                  Find and contribute to Hack Reactor's Software Engineering Immersive (SEI) resources
                </Row>
              </Col>
            </Row>
            
            <Instructions/>

            <Row className='bootstrap-table-row'>
              <BootstrapTable 
                cellEdit = { cellEdit }
                columnFilter 
                condensed 
                data = { resourcesArr } 
                deleteRow
                hover 
                options = { rbtOptions }
                selectRow = { selectRow }
                striped
                version = '4' 
              > 
                <TableHeaderColumn isKey dataField='id' dataSort width='6%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; ID</TableHeaderColumn>
                <TableHeaderColumn dataField='topic' dataSort width='15%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Topic</TableHeaderColumn>
                <TableHeaderColumn dataField='abbrev' dataSort width='8%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Abbrev</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort dataFormat={ this.linkFormatter} width='6%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Link</TableHeaderColumn>
                <TableHeaderColumn dataField='level' dataSort width='8%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Level</TableHeaderColumn>
                <TableHeaderColumn dataField='contributor' dataSort width='10%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Contributor</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataSort width='46%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Description</TableHeaderColumn>
              </BootstrapTable>
            </Row>

          </Col>
        </div>

        <div>
          <a name='add-resource'></a>
            <Row className='add-resource-row'>
              <AddResource className='add-resource-call'
                addResource={ this.addResource }
              />
            </Row>
        </div>

      </Container-fluid>
    )
  };  
}

export default App;
