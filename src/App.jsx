import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
// import "react-scripts"
// import FormControl from "react-bootstrap/FormControl";

// import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

// const path = require('path');
// console.log("PATH.BNS: :", path.basename('/Users/nsb52/Box Sync/galvanize/mvp/hacked-resources/src/legacyData.data'));

// import ResourceRow from '../ResourceRow';
// import ResourceInfo from '../ResourceInfo';
// import ChangeHandler from '../ChangeHandler';

// let dataPath = '/data';
// console.log("App: dataPath: ", dataPath);
// let legacyData = require('./data/legacy_data.json');
// let dataPath= '/Users/nsb52/Box\ Sync/galvanize/mvp/hacked-resources/src/data/'
// console.log("App: dataPath: ", dataPath);
// import legacyDataJSON from dataPath + 'legacy_data.json';
import legacyDataJSON from './legacyData.js';
// const fs = require('fs');
// const legacyDataJSON = JSON.parse(fs.readFileSync('./legacyData.json', 'utf8'));
// const json = require('json-loader!/legacyData.json');
// console.log("App: lDJ: ", legacyDataJSON);



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
    this.loadImportedResources(initialDataJSON);
    // console.log("App: POST cDM: t.s.r(s): ", this.state.resourcesArr)
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log("App: cDU: t.p: ", prevState, this.state);
  //   if (this.prevState.resourcesArr.length !== this.state.resourcesArr.length) {
  //     // this.setState.resourcesChanged = false;
  //     this.loadImportedResources(initialDataJSON);
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
  
  addResource = (abbrev, contributor, description, level, link, topic) => {
    this.event.preventDefault();

    const resourceObj = {
      contributor: contributor,
      description: description,
      level: level,
      link: link,
      topic: topic
    };
    
    console.log("App: aR: rO: ", resourceObj);
    fetch('http://localhost:3000/resources_db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceObj)
    })
      .then(res => console.log(res));
  }

  getOneResource = (resource_id) => {
    this.event.preventDefault();

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

    // console.log("App: PRE: render: rA: ", this.state.resourcesArr);
    // console.log("App: PRE: render: cRA: ", this.state.currentResourceArr);

    if (!this.isReadytoRenderResources()) return null;

    // console.log("App: POST: iD: ", initialDataJSON)
    // console.log("App: POST: render: rA: ", this.state.resourcesArr);
    // console.log("App: POST: render: cRA: ", this.state.currentResourceArr);

    return (


      // <Container-fluid className="layout">
      <div className="container-fluid">
        <Col className="layout header">
          <Row className="layout">
            {/* <Col className="layout bold" sm={2}> */}
            <Col className="layout bold">
              <img
                // src={require("./logo.svg")}
                // src={require("./public/favicon.ico")}
                alt="logo: HACK-mask"
                id="logo"
              />{" "}
              Hacked Resources
            </Col>
          </Row>
          <Row className="layout">
            <Col className="layout" id="announcements">
              <i>HACK YOUR RESOURCES</i> &mdash;{" "}
              <b>BEFORE THEY HACK YOU</b> &mdash;{" "}
              <u>FIND THEM HERE</u>
              <br /> &nbsp; <br />
            </Col>
          </Row>
          <Row>
              <Table id="resources-table" responsive striped bordered hover border-style="solid">
                <thead className="resources-header" border-style="solid">
                  <tr>
                    <th className="col-sm-2 topic_col" >Topic</th>
                    {/* <th className="col-sm-1">Abbrev</th> */}
                    <th className="col-sm-1">Link</th>
                    <th className="col-sm-1">Level</th>
                    <th className="col-sm-2">Contributor</th>
                    <th className="col-sm-5">Description</th>
                  </tr>
                </thead>
                <tbody className="resources-body"> 
                  <tr>
                    <td className="col-sm-2">A topic</td>
                    {/* <td className="col-sm-1">An abbrev</td> */}
                    <td className="col-sm-1">A link</td>
                    <td className="col-sm-1">A level</td>
                    <td className="col-sm-2">A contributor</td>
                    <td className="col-sm-5">A description</td>
                  </tr>

                  <tr>
                    <td className="col-sm-2">A topic but longer than the first one</td>
                    <td className="col-sm-1">A link</td>
                    <td className="col-sm-1">A level</td>
                    <td className="col-sm-2">A contributor</td>
                    <td className="col-sm-5">A description that is much longer than the other stuff in many ways. See Spot. See Spot run.</td>
                  </tr>
                </tbody>
              </Table>
          </Row>
        </Col>
      </div>
      // </Container-fluid>
    );
  }
}

export default App;
