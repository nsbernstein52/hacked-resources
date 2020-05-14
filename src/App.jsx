console.log("FINDABLE");
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import AddResourceHandler from './comp/AddResourceHandler';
// import UpdateResourceHandler from './comp/UpdateResourceHandler';

import './App.css';

// console.log("PATH.BASENAME: :", path.basename('/Users/nsb52/Box Sync/galvanize/mvp/hacked-resources/src/legacyData.data'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourcesArr: [],
      resourcesChanged: false
    };

    // function bindings for non-lifecycle and non-arrow functions
  }

  // ////
  componentDidMount() {
    // console.log("App: PRE cDM: t.s.r(s)A: ", this.state.resourcesArr)
    this.loadAllResources();
    // console.log("App: POST cDM: t.s.r(s)A: ", this.state.resourcesArr)
  }

  // ////
  componentDidUpdate = (prevProps, prevState) => {
    // console.log("App: cDU: t.p: ", prevState, this.state);
    if (this.state.resourcesChanged ) {
      this.setState( {
        resourcesChanged: false
      });
      this.loadAllResources();
    }
  }

  // //// loadAllResources
  loadAllResources = () => {
    // this.event.preventDefault();
    // console.log("App: lAR: ENTERING "); 
    fetch('http://localhost:3000/resources_db/resources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }    })
      .then((results) => {
        return results.json();
        // console.log("App: lARs: r.r.[N]: COMPLETED", resultsParsed);
        // console.log("App: lARs: r.r.[N].key: COMPLETED", results.key);       
        // res.send(results);
      })
      .then(( res ) => {
        // console.log("App: lARs: .then.then res: ", res)
        this.setState({
          resourcesArr:  res.data
        });
      })
      .catch(err => console.error(err));
  }

  // //// addResource
  addResource = (event, abbrev, contributor, description, level, link, topic, callback) => {
    // return new Promise( (resolve, reject) => {
    event.preventDefault(); // needed?

    const resourceObj = { // naming?
      abbrev: abbrev,
      contributor: contributor,
      description: description,
      level: level,
      link: link,
      topic: topic
    };
    
    // console.log("App: aR:ENTERED ");
    // console.log("App: aR: rO: ", resourceObj);
    fetch('http://localhost:3000/resources_db/resources/', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceObj)
    })
      .then(response =>  {
        // console.log("App: response, r.sT: ", response, response.statusText)
        this.setState( {
          resourcesChanged: true
        });
        // return response.statusText()
      })
      // .then(data => callback(data))
      .catch(err => console.error("App: aR: catch: ", err));
  };

  // //// deleteResource
  deleteResource = (id) => {
      event.preventDefault();
    // console.log("App: dR: ENTER: id, rA.len: ", id, this.state.resourcesArr.length);
    fetch('http://localhost:3000/resources_db/resources/:id', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    .then(response =>  {
      // console.log("App: response, r.sT: ", response, response.statusText)
      this.setState( {
        resourcesChanged: true
      });
      // console.log("App: dR: EXIT: rA.len: ", this.state.resourcesArr.length);
    })
    .catch(err => console.error("App: dR: catch: ", err));
  };

  // //// updateResource
  updateResource = (row, cellName, cellValue) => {
    // console.log("App: uR: r.id, r,cN,cV: ", row.id, row, cellName, cellValue)
    fetch('http://localhost:3000/resources_db/resources/' + row.id, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
    })
      .then(response =>  {
        // console.log("App: response, r.sT: ", response, response.statusText)
        this.setState( {
          resourcesChanged: true
        });
        // return response.statusText()
      })
      // .then(data => callback(data))
      .catch(err => console.error("App: uR: catch: ", err));
  };


  topicFormatter = (cell, row) => {
    return <a href={row.link} target="_blank" title={row.link}>{cell}</a>
  }

  isReadytoRenderResources = () => {
    return (
      this.state.resourcesArr !== null &&
      this.state.resourcesArr.length !== 0
    );
  }

  // renderCaret = (direction, fieldName) => {
  //   if (direction === 'asc') return 'up';
  //   if (direction === 'desc') return 'down';
  //   return 'up/down';
  // }
  // dataSort caretRender={ this.renderCaret() }

  render() {

    // console.log("App: render: ", "ENTERING APP RENDER")

    const { resourcesArr, resourcesChanged } = this.state;

    // console.log("App: PRE: render: rA: ", resourcesArr);
    // console.log("App: PRE: render: rC: ", resourcesChanged);

    if (!this.isReadytoRenderResources()) return null;
    // console.log("App: render: ", "APP AFTER isReadytoRenderResources TEST")

    // //// react-bootstrap-table OPTIONS
    const bstOptions = { 
      afterDeleteRow: this.deleteResource,
      sortIndicator: true
    };
    const cellEdit = { 
      mode: 'dbclick',
      // beforeSaveCell: this.beforeUpdateResource,
      // updateResource: this.updateResource.bind(this) // scope is render, component instance
      afterSaveCell: this.updateResource
    }
    const selectRow = {
       mode: 'radio'
      }

    return(

      <div className="container-fluid">
        <Col className="layout #header">
          <Row className="layout">
            {/* <Col className="layout bold" sm={2}> */}
            {/* <Col className="layout bold">
              <img
                // src={require("./logo.svg")}
                // src={require("./public/favicon.ico")}
                alt="logo: HACK-mask"
                id="logo"
              />{" "}
              Hacked Resources
            </Col> */}
          </Row>

          <Row className="layout">
            <Col className="layout" id="announcements">
              <b>HACKED RESOURCES +PLUS+</b>
              <br /> Hack your resources even more than before!
              <br /> &nbsp; <br />
            </Col>
          </Row>
          <Row>
              <div id="update-resource">
                <AddResourceHandler addResource={this.addResource}/>
              </div>
          </Row>
          <Row>
            <Col className="layout" align="center" >
              <br />
              (<b>NOTE: Double-click to edit cell text</b>)
              <br /> &nbsp; <br />
            </Col>
          </Row>

          <Row>
            <BootstrapTable 
              cellEdit={ cellEdit }
              columnFilter 
              condensed 
              data={resourcesArr} 
              deleteRow
              hover 
              options = { bstOptions }
              selectRow={ selectRow }
              striped
              version='4' 
            > 
              <TableHeaderColumn isKey dataField='id' dataSort width='5%' tdStyle={ { whiteSpace: 'normal' }}>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='topic' dataSort dataFormat={ this.topicFormatter} width='15%' tdStyle={ { whiteSpace: 'normal' }}>Topic</TableHeaderColumn>
              <TableHeaderColumn dataField='abbrev' dataSort width='9%' tdStyle={ { whiteSpace: 'normal' }}>Abbrev</TableHeaderColumn>
              <TableHeaderColumn dataField='level' dataSort width='6%' tdStyle={ { whiteSpace: 'normal' }}>Level</TableHeaderColumn>
              <TableHeaderColumn dataField='contributor' dataSort width='10%' tdStyle={ { whiteSpace: 'normal' }}>Contributor</TableHeaderColumn>
              <TableHeaderColumn dataField='description' dataSort width='55%' tdStyle={ { whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            </BootstrapTable>
          </Row>

        </Col>
      </div>
    )
  };  
}

export default App;
