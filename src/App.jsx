import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import AddResourceHandler from './comp/AddResourceHandler';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourcesArr: [],
      resourcesChanged: false
    };
  }

  // componentDidMount
  componentDidMount() {
    this.loadAllResources();
  }

  // componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (this.state.resourcesChanged ) {
      this.setState( {
    resourcesChanged: false
      });
      this.loadAllResources();
    }
  }

  // loadAllResources
  loadAllResources = () => {
    fetch('http://localhost:3000/resources_db/resources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }    })
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

  // addResource
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
    
    fetch('http://localhost:3000/resources_db/resources/', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceObj)
    })
      .then(response =>  {
    this.setState( {
          resourcesChanged: true
        });
      })
      .catch(err => console.error("App: aR: catch: ", err));
  };

  // deleteResource
  deleteResource = (rowKeys) => {
    this.setState( {
      resourcesArr: this.state.resourcesArr.filter( (elem) => { return elem.id !== rowKeys[0] } )
    });
    event.preventDefault();
    fetch('http://localhost:3000/resources_db/resources/' + rowKeys[0], {
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
    .catch(err => console.error("App: dR: catch: ", err));
  };

  // updateResource
  updateResource = (row, cellName, cellValue) => {
    fetch('http://localhost:3000/resources_db/resources/' + row.id, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
    })
      .then(response =>  {
        this.setState( {
          resourcesChanged: true
        });
      })
      .catch(err => console.error("App: uR: catch: ", err));
  };

  topicFormatter = (cell, row) => {
    return <a href={row.link} target="_blank" title={row.link}>link</a>
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
    const bstOptions = { 
      afterDeleteRow: this.deleteResource,
      sortIndicator: true
    };
    const cellEdit = { 
      mode: 'dbclick',
      afterSaveCell: this.updateResource
    }
    const selectRow = {
       mode: 'radio'
      }

    return(

      <Container-fluid className="layout" id="container-all">

      <div className="container-fluid">
        <Col className="layout #header">
          <Row className="layout">
            <Col className="layout" id="announcements">
              <b>HACKED RESOURCES</b>
              <br /> 
              <Row className="subheader">
                Find and contribute to Hack Reactor's Software Engineering Immersive (SEI) resources
              </Row>
            </Col>
          </Row>
          <Row>
              <div id="update-resource">
                <AddResourceHandler addResource={this.addResource}/>
              </div>
          </Row>
          <br />
          <Row className="layout, instructions" align="center" >
            <Col className="instr-caption" md={3}>
              Sort by column: &nbsp;
            </Col>
            <Col className="instr-body" md={9}>
              Click on column header
            </Col>
          </Row>
          <Row>            
            <Col className="instr-caption" md={3}>
              Edit cell: &nbsp; 
            </Col>
            <Col className="instr-body" md={9}>
              Double-click in cell (for &quot;link&quot;, click to right side of link), change text, press ENTER (or ESC to cancel)<br />
            </Col>
          </Row>
          <Row>
            <Col className="instr-caption" md={3}>
              Delete row: &nbsp; 
            </Col>
            <Col className="instr-body" md={9}>
              Click on radio button, click on DELETE<br />
            </Col>
          </Row>
          <Row>            
            <Col className="instr-caption" md={3}>
              Filter by column: &nbsp; 
            </Col>
            <Col className="instr-body" md={9}>
              Enter text (not case sensitive) in box at bottom of column<br /> &nbsp;
            </Col>
          </Row>
          <Row className="bst">
            <BootstrapTable 
              cellEdit = { cellEdit }
              columnFilter 
              condensed 
              data = { resourcesArr } 
              deleteRow
              hover 
              options = { bstOptions }
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
      </Container-fluid>

    )
  };  
}

export default App;
