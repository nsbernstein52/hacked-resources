import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import AddResource from './comp/AddResource';

import './App.css';

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

  componentDidUpdate(prevProps, prevState) {
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
      .then((results) => {
        return results.json();
      })
      .then(( res ) => {
        this.setState({
          resourcesArr:  res.data
        });
      })
      .catch(err => console.error(err));
  }

  // CRUD

  addResource = (event, abbrev, contributor, description, level, link, topic, callback) => {
    event.preventDefault();
    const resourceObj = { // naming QQQ
      abbrev: abbrev,
      contributor: contributor,
      description: description,
      level: level,
      link: link,
      topic: topic
    };

    fetch('/resources_db/resources/', {
        method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceObj)
    })
      .then(response =>  {
    this.setState( {
          resourcesChanged: true
        });
      })
      .catch(err => console.error('App: aR: catch: ', err));
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
  //   .catch(err => console.error('App: dR: catch: ', err));
  // };

  deleteResource = (rowKeys) => {
    this.setState( {
      resourcesArr: this.state.resourcesArr.filter( (elem) => { return elem.id !== rowKeys[0] } )
    }, () => {
      event.preventDefault();
      fetch('/resources_db/resources/' + rowKeys[0], {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response =>  {
        this.setState( {
          resourcesChanged: true
        });
      })
      .catch(err => console.error('App: dR: catch: ', err));  
    });
  };

  updateResource = (row, cellName, cellValue) => {
    fetch('/resources_db/resources/' + row.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
    })
      .then(response =>  {
        this.setState( {
          resourcesChanged: true
        });
      })
      .catch(err => console.error('App: uR: catch: ', err));
  };

  topicFormatter = (cell, row) => {
    return <a href={row.link} target='_blank' title={row.link}>link</a>
  }

  isReadytoRenderResources = () => {
    return (
      this.state.resourcesArr !== null &&
      this.state.resourcesArr.length !== 0
    );
  }

  render() {
    const { resourcesArr, resourcesChanged } = this.state;

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
              <Col>
                <b>HACKED RESOURCES</b>
                <Row className='subheader'>
                  Find and contribute to Hack Reactor's Software Engineering Immersive (SEI) resources
                </Row>
              </Col>
            </Row>

            <Row>
              <Col className='instr-caption' md={2}>
                Sort by column:
              </Col>
              <Col className='instr-body' md={10}>
                Click on column header
              </Col>
            </Row>
            <Row>            
              <Col className='instr-caption' md={2}>
                Edit cell: 
              </Col>
              <Col className='instr-body' md={10}>
                Double-click in cell (for &quot;link&quot;, click to right side of link), change text, press ENTER (or ESC to cancel)
              </Col>
            </Row>
            <Row>
              <Col className='instr-caption' md={2}>
                Delete row: 
              </Col>
              <Col className='instr-body' md={10}>
                Click on radio button, click on DELETE
              </Col>
            </Row>
            <Row>            
              <Col className='instr-caption' md={2}>
                Filter by column: 
              </Col>
              <Col className='instr-body' md={10}>
                Enter text (not case sensitive) in box at bottom of column
              </Col>
            </Row>
            <Row>            
              <Col className='instr-caption' md={2}>
                Add a resource: 
              </Col>
              <Col className='instr-body' md={10}>
                Use <a href='#add-resource'>Add Resource</a> form at the bottom of the page
              </Col>
            </Row>

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
                <TableHeaderColumn dataField='link' dataSort dataFormat={ this.topicFormatter} width='6%' tdStyle={{ whiteSpace: 'normal' }}>&#x2195; Link</TableHeaderColumn>
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
                addResource={this.addResource}
              />
            </Row>
        </div>
      </Container-fluid>
    )
  };  
}

export default App;
