import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
// import "react-scripts"
// import FormControl from "react-bootstrap/FormControl";

// import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

// import ResourceRow from '../ResourceRow';
// import ResourceInfo from '../ResourceInfo';
// import ChangeHandler from '../ChangeHandler';

let dataPath = '/data';
console.log("App: dataPath: ", dataPath);
// let legacyData = require('./data/legacy_data.json');

const initialData = [
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
    console.log("App: PRE cDM: t.s.r(s): ", this.state.resourcesArr)
    console.log("App: PRE cDM: iD: ", initialData)
    // this.loadResourcesLandingPage();
    this.loadImportedResources(initialData);
    console.log("App: POST cDM: t.s.r(s): ", this.state.resourcesArr)
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log("App: cDU: t.p: ", prevState, this.state);
  //   if (this.prevState.resourcesArr.length !== this.state.resourcesArr.length) {
  //     // this.setState.resourcesChanged = false;
  //     this.loadImportedResources(initialData);
  //   }
  // }

  loadResourcesLandingPage = () => {

  }

  loadImportedResources = (initialData) => {
    // console.log("App: PRE: lIR: iD:  ", initialData);
    this.setState({
      resourcesArr: initialData
    })
  // this.setState({ resourcesArr: data })
    // this.setState({ resourcesArr: initialData.slice() })
    // console.log("App: POST: lIRs: iD:  ", initialData);  
    // console.log("App: POST: lIRs: rA:  ", resourcesArr);
  };

  clickHandler = (index) => {
    this.setState({ currentResourceArr: this.state.resourcesArr[index] })
  }
  
  addResource = (abbrev, contributor, description, level, link, topic) => {
    this.event.preventDefault();

    const resourceObj = {
      abbrev: abbrev,
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

    // console.log("App: iD: ", initialData)

    const { resourcesArr, resourcesChanged, currentResourceArr } = this.state;

    // console.log("App: PRE: render: rA: ", this.state.resourcesArr);
    // console.log("App: PRE: render: cRA: ", this.state.currentResourceArr);

    if (!this.isReadytoRenderResources()) return null;

    // console.log("App: POST: iD: ", initialData)
    console.log("App: POST: render: rA: ", this.state.resourcesArr);
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
                <thead className="resources-header">
                  <tr>
                    <th className="col-sm-2 topic_col" >Topic</th>
                    <th className="col-sm-1">Abbrev</th>
                    <th className="col-sm-1">Link</th>
                    <th className="col-sm-1">Level</th>
                    <th className="col-sm-2">Contributor</th>
                    <th className="col-sm-5">Description</th>
                  </tr>
                </thead>
                <tbody className="resources-body"> 
                  <tr>
                    <td className="col-sm-2">A topic</td>
                    <td className="col-sm-1">An abbrev</td>
                    <td className="col-sm-1">A link</td>
                    <td className="col-sm-1">A level</td>
                    <td className="col-sm-2">A contributor</td>
                    <td className="col-sm-5">A description</td>
                  </tr>
                  <tr>
                    <td className="col-sm-2">A topic but longer than the first one</td>
                    <td className="col-sm-1">An abbrev</td>
                    <td className="col-sm-1">A link</td>
                    <td className="col-sm-1">A level</td>
                    <td className="col-sm-2">A contributor</td>
                    <td className="col-sm-5">A description that is much longer than the other stuff in many ways. See Spot. See Spot run.</td>
                  </tr>
                  {
                    resourcesArr.map((resource, index) => {
                      console.log("App: render: rA: ", resourcesArr)
                      // initialData.map((resource, index) => {
                      // console.log("App: render: iD: ", initialData)
                      return (
                        <tr className="cols layout resources-body dynamic-rows" key={index}>
                          <td>{resourcesArr[index].Topic}</td>
                          <td>{resourcesArr[index].Abbrev}</td>
                          <td>{resourcesArr[index].Link}</td>
                          <td>{resourcesArr[index].Level}</td>
                          <td>{resourcesArr[index].Contributor}</td>
                          <td>{resourcesArr[index].Description}</td>
                        </tr>
                      )
                    })
                  }
                  <tr>
                    <td className="col-sm-2">A topic but longer than the first one</td>
                    <td className="col-sm-1">An abbrev</td>
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
