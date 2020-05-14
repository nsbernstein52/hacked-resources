console.log("FINDABLE");
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import AddResourceHandler from './comp/AddResourceHandler';
// import UpdateResourceHandler from './comp/UpdateResourceHandler';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import BootstrapTable from 'reactjs-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// import "react-scripts"
// import FormControl from "react-bootstrap/FormControl";

import './App.css';

// import gfimage from './public/favicon.ico';

// const path = require('path'); 
// console.log("PATH.BASENAME: :", path.basename('/Users/nsb52/Box Sync/galvanize/mvp/hacked-resources/src/legacyData.data'));

// ////// OBSOLETE for testing
// import importedDataJSON from './legacyData.js';
// const initialDataJSON = [
//   {
//     "Topic": "Accessibility",
//     "Level": "All",
//     "Link": "https://shoptalkshow.com/367/",
//     "Description": "Podcast about accessibility",
//     "Contributor": ""
//   }
// ];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // legacyResourcesArr: [],
      resourcesArr: [],
      resourcesChanged: false,
      selectedRow: null,
      currentCell: null,
      prevCellValue: null,
      newCellValue: null,
      resourceElem: null
      // currentResourceArr: []
    };

    // function bindings for non-lifecycle and non-arrow functions
  }

  componentDidMount() {
    // console.log("App: PRE cDM: t.s.r(s): ", this.state.legacyResourcesArr)
    // console.log("App: PRE cDM: iD: ", initialDataJSON)
    // this.loadResourcesLandingPage();
    // this.loadImportedResources(initialDataJSON);
    // this.loadImportedResources(importedDataJSON);
    // this.loadAllLegacyResources();
    this.loadAllResources();
    // console.log("App: POST cDM: t.s.r(s): ", this.state.legacyResourcesArr)
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log("App: cDU: t.p: ", prevState, this.state);
    // if (this.state.resourcesArr.length !== prevState.resourcesArr.length) {
    if (this.state.resourcesChanged ) {
      this.setState( {
        resourcesChanged: false
      });
      // this.loadAllLegacyResources();
      this.loadAllResources();
    }
  }

  // loadResourcesLandingPage = () => {

  // }

  // //// loadImportedResources
  // loadImportedResources = (initialDataJSON) => {
    // console.log("App: PRE: lIR: iD:  ", initialDataJSON);
    // this.setState({
      // legacyResourcesArr: initialDataJSON
    // })
  // this.setState({ legacyResourcesArr: data })
    // this.setState({ legacyResourcesArr: initialDataJSON.slice() })
    // console.log("App: POST: lIRs: iD:  ", initialDataJSON);  
    // console.log("App: POST: lIRs: rA:  ", legacyResourcesArr);
  // };

  // //// loadLegacyResources
  // loadAllLegacyResources = () => {
  //   // this.event.preventDefault();
    
  //   // console.log("App: gAR: ENTERING "); 
  //   fetch('http://localhost:3000/resources_db/resources_legacy', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }    })
  //     .then((results) => {
  //       return results.json();
  //       // console.log("App: gARs: r.r.[N]: COMPLETED", resultsParsed);
  //       // console.log("App: gARs: r.r.[N].key: COMPLETED", results.key);
        
  //       // res.send(results);
  //     })
  //     .then(( res ) => {
  //       // console.log("App: gARs: .then.then res: ", res)
  //       this.setState({
  //         legacyResourcesArr:  res.data
  //       });

  //     })
  //     .catch(err => console.error(err));
  // }

  // //// loadAllResources
  loadAllResources = () => {
    // this.event.preventDefault();

    // console.log("App: gAR: ENTERING "); 
    fetch('http://localhost:3000/resources_db/resources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }    })
      .then((results) => {
        return results.json();
        // console.log("App: gARs: r.r.[N]: COMPLETED", resultsParsed);
        // console.log("App: gARs: r.r.[N].key: COMPLETED", results.key);
        
        // res.send(results);
      })
      .then(( res ) => {
        // console.log("App: gARs: .then.then res: ", res)
        this.setState({
          resourcesArr:  res.data
        });

      })
      .catch(err => console.error(err));
  }

  // clickHandler = (index) => {
  //     this.setState({ currentResourceArr: this.state.legacyResourcesArr[index] })
  //   }
  
  // //// addResource
  addResource = (event, abbrev, contributor, description, level, link, topic, callback) => {
    // return new Promise( (resolve, reject) => {

    event.preventDefault(); // needed?

    const resourceObj = {
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
        console.log("App: response, r.sT: ", response, response.statusText)
        this.setState( {
          resourcesChanged: true
        });
        // return response.statusText()
      })
      // .then(data => callback(data))
      .catch(err => console.error("App: aR: catch: ", err));
  };

  //// handleRowSelect
  // handleRowSelect = (row, isSelected, e) => {
  //   this.setState({
  //     selectedRow:  row
  //   });
  // }

  //// deleteResource
  deleteResource = (id) => {  // why not this.selectedRow QQQ
      // deleteResource = (event, id, callback) => {
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

  //// updateResource
  updateResource = (row, cellName, cellValue) => {
    const resourceElemObj = {
      id: row.id,
      column: cellName,
      value: cellValue
    };    
    console.log("App: uR: ENTERED: id, col, val: ", resourceElemObj.id, resourceElemObj.column, resourceElemObj.value);
    // console.log("App: uR: rO: ", resourceObj);
    fetch('http://localhost:3000/resources_db/resources/' + resourceElemObj.id, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceElemObj)
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
      // this.state.legacyResourcesArr !== null &&
      // this.state.legacyResourcesArr.length !== 0 &&
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
    // console.log("App: iD: ", initialDataJSON)

    // const { legacyResourcesArr, resourcesArr, resourcesChanged, currentResourceArr } = this.state;
    const { resourcesArr, resourcesChanged } = this.state;

    // console.log("App: PRE: render: rA: ", legacyResourcesArr);
    // console.log("App: PRE: render: rV01A: ", resourcesArr);
    // console.log("App: PRE: render: t.s.rA: ", this.state.legacyResourcesArr);
    // console.log("App: PRE: render: cRA: ", this.state.currentResourceArr);

    if (!this.isReadytoRenderResources()) return null;
    // console.log("App: render: ", "APP AFTER RENDERABLE TEST")

    // console.log("App: POST: render: rA.d: ", legacyResourcesArr.data);
    // console.log("App: POST: render: rA: ", legacyResourcesArr);
    // console.log("App: POST: iD: ", initialDataJSON)
    // console.log("App: POST: render: rA: ", this.state.legacyResourcesArr);
    // console.log("App: POST: render: cRA: ", this.state.currentResourceArr);

    // react-bootstrap-table OPTIONS
    const bstOptions = { 
      afterDeleteRow: this.deleteResource,
      sortIndicator: true
    };
    const cellEdit = { 
      mode: 'dbclick',
      // beforeSaveCell: this.beforeSaveCell,
      // updateResource: this.updateResource.bind(this) // scope is render, component instance
      afterSaveCell: this.updateResource
    }
    const selectRow = {
       mode: 'radio'
      //  onSelect: this.handleRowSelect
    }

    return(

      // <Container-fluid className="layout">
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
              <br /> Hack your resources {" "}
              even more than before!
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
      // </Container-fluid>
    )
  };
  
}

export default App;
