import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import BootstrapTable from 'reactjs-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// import "react-scripts"
// import FormControl from "react-bootstrap/FormControl";

import './App.css';

// import gfimage from './public/favicon.ico';

// const path = require('path');
// console.log("PATH.BASENAME: :", path.basename('/Users/nsb52/Box Sync/galvanize/mvp/hacked-resources/src/legacyData.data'));

import importedDataJSON from './legacyData.js';


const initialDataJSON = [
  {
    "Topic": "Accessibility",
    "Level": "All",
    "Link": "https://shoptalkshow.com/367/",
    "Description": "Podcast about accessibility",
    "Contributor": ""
  },
  {
    "Topic": "Accessibility",
    "Level": "All",
    "Link": "https://a11yproject.com/checklist/",
    "Description": "Accessiblity checklist to  determine how accessible your site is",
    "Contributor": ""
  },
  {
    "Topic": "Accessibility",
    "Level": "All",
    "Link": "https://webaim.org/techniques/alttext/#basics",
    "Description": "Alternative Text basics",
    "Contributor": ""
  },
  {
    "Topic": "Accessibility",
    "Level": "All",
    "Link": "https://webaim.org/techniques/images/",
    "Description": "Image accessibility",
    "Contributor": ""
  },
  {
    "Topic": "Accessibility",
    "Level": "All",
    "Link": "https://www.deque.com/blog/dont-screen-readers-read-whats-screen-part-1-punctuation-typographic-symbols/",
    "Description": "Good info about how screen readers read the web",
    "Contributor": ""
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourcesArr: [],
      resourcesChanged: false,
      currentResourceArr: []
    };

    // function bindings for non-lifecycle and non-arrow functions
  }

  componentDidMount() {
    // console.log("App: PRE cDM: t.s.r(s): ", this.state.resourcesArr)
    // console.log("App: PRE cDM: iD: ", initialDataJSON)
    // this.loadResourcesLandingPage();
    // this.loadImportedResources(initialDataJSON);
    // this.loadImportedResources(importedDataJSON);
    this.getAllResources();
    // console.log("App: POST cDM: t.s.r(s): ", this.state.resourcesArr)
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log("App: cDU: t.p: ", prevState, this.state);
  //   if (this.prevState.resourcesArr.length !== this.state.resourcesArr.length) {
  //     // this.setState.resourcesChanged = false;
  //     this.getAllResources();
  //   }
  // }

  loadResourcesLandingPage = () => {

  }

  loadImportedResources = (initialDataJSON) => {
    // console.log("App: PRE: lIR: iD:  ", initialDataJSON);
    this.setState({
      resourcesArr: initialDataJSON
    })
  // this.setState({ resourcesArr: data })
    // this.setState({ resourcesArr: initialDataJSON.slice() })
    // console.log("App: POST: lIRs: iD:  ", initialDataJSON);  
    // console.log("App: POST: lIRs: rA:  ", resourcesArr);
  };

  clickHandler = (index) => {
    this.setState({ currentResourceArr: this.state.resourcesArr[index] })
  }
  
  addResource = (contributor, description, level, link, topic) => {
    this.event.preventDefault();

    const resourceObj = {
      contributor: contributor,
      description: description,
      level: level,
      link: link,
      topic: topic
    };
    
    // console.log("App: aR: rO: ", resourceObj);
    fetch('http://localhost:3000/resources_db/resourcesflat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceObj)
    })
      // .then(res => console.log(res.rows[0]))
      .catch(err => console.error(err));
  }

  getAllResources = () => {
    // this.event.preventDefault();
    
    // console.log("App: gAR: ENTERING "); 
    fetch('http://localhost:3000/resources_db/resourcesflat', {
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

  // async deleteResource(resource) {
  //   if (window.confirm(`Are you sure you want to delete "${resource}"`)) {
  //     await this.fetch('delete', `/resources/${resource.id}`);
  //     // this.getResources();
  //   }
  // }

  // deleteResource = (id) => {
  //   // event.preventDefault();
  //   console.log("App: dR: id: ", id);
  //   fetch('http://localhost:3000/resources_db', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(id)
  //     // body: id
  //   })
  //     .then(res => console.log(res));
  //  }

  // addResourcesFromData = (exampleResourceData) => {
  //  for (let i = 0; i < exampleResourceData.length; i++ ) {
  //    let currentResourceArr = exampleResourceData[i];
  //    let e = 'event';
  //    this.addResource(e, 
  //      currentResourceArr.abbrev,
  //      currentResourceArr.contributor,
  //      currentResourceArr.description,
  //      currentResourceArr.level,
  //      currentResourceArr.link,
  //      currentResourceArr.topic
  //    );
  //   }
  // };
/*
priceFormatter(cell, row) {   // String example
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}
*/
  topicFormatter = (cell, row) => {
    return <a href={row.link}>{cell}</a>

  }

  isReadytoRenderLandingPage = () => {
    return (
      true
    );
  };

  isReadytoRenderResources = () => {
    return (
      this.state.resourcesArr !== null &&
      this.state.resourcesArr.length !== 0
    );
  };

  render() {

    // console.log("App: iD: ", initialDataJSON)

    const { resourcesArr, resourcesChanged, currentResourceArr } = this.state;

    // console.log("App: PRE: render: rA: ", resourcesArr);
    // console.log("App: PRE: render: t.s.rA: ", this.state.resourcesArr);
    // console.log("App: PRE: render: cRA: ", this.state.currentResourceArr);

    if (!this.isReadytoRenderResources()) return null;

    // console.log("App: POST: render: rA.d: ", resourcesArr.data);
    // console.log("App: POST: render: rA: ", resourcesArr);
    // console.log("App: POST: iD: ", initialDataJSON)
    // console.log("App: POST: render: rA: ", this.state.resourcesArr);
    // console.log("App: POST: render: cRA: ", this.state.currentResourceArr);

    const bstOptions = {
      sortIndicator: true
    };

    return (


      // <Container-fluid className="layout">
      <div className="container-fluid">
        <Col className="layout header">
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
              <b>HACKED RESOURCES</b> &mdash; Hack your resources {" "}
              before they hack you!
              <br /> &nbsp; <br />
            </Col>
          </Row>
          <Row>

              <BootstrapTable data={resourcesArr} striped hover version='4' options={ bstOptions } condensed columnFilter>
                <TableHeaderColumn isKey dataField='topic' dataSort dataFormat={ this.topicFormatter} width='15%' tdStyle={ { whiteSpace: 'normal' }}>Topic</TableHeaderColumn>
                <TableHeaderColumn dataField='level' dataSort width='10%' tdStyle={ { whiteSpace: 'normal' }}>Level</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='link' dataSort>Link</TableHeaderColumn> */}
                <TableHeaderColumn dataField='contributor' dataSort width='10%' tdStyle={ { whiteSpace: 'normal' }}>Contributor</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataSort width='65%' tdStyle={ { whiteSpace: 'normal' }}>Description</TableHeaderColumn>
              </BootstrapTable>
          </Row>
        </Col>
      </div>
      // </Container-fluid>
    );
  }
}

export default App;
