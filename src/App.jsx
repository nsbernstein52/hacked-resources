import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import "react-bootstrap/Container";
// import FormControl from "react-bootstrap/FormControl";

// import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

// import ResourceRow from '../ResourceRow';
// import ResourceInfo from '../ResourceInfo';
// import ChangeHandler from '../ChangeHandler';

import legacyData from './data/legacy_data.json';

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
    // console.log("App: cDM: r(s): ", resourcesArr)
    // this.loadResourcesLandingPage();
    this.loadImportedResources();
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("App: cDU: t.p: ", prevState, this.state);
    if (this.state.resourcesChanged) {
      this.setState.resourcesChanged = false;
      this.loadImportedResources();
    }
  }

  loadResourcesLandingPage = () => {

  }

  loadImportedResources = (legacyData) => {
    this.setState({ resourcesArr: legacyData.slice() })
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

    console.log("App: render: rA: ", this.state.resourcesArr);
    console.log("App: render: cRA: ", this.state.currentResourceArr);

    if (!this.isReadytoRender()) return null;

    const { resourcesArr, resourcesChanged, currentResourceArr } = this.state;
    return (
      <Container-fluid className="layout">
        <Col className="layout header">
          <Row className="layout">
            <Col className="layout bold" sm={2}>
              <img
                // src={require("./logo.svg")}
                src={require("./public/favicon.ico")}
                alt="Hacked Resourcse logo: HACK-mask"
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
            </Col>
          </Row>
          <Row>
            <Table responsive>
              <thead className="resources-header">
                <tr>
                  <th>Topic</th>
                  <th>Abbrev</th>
                  <th>Link</th>
                  <th>Level</th>
                  <th>Description</th>
                  <th>Contributor</th>
                </tr>
              </thead>
              <tbody className="resources-body"> 
                {
                  resourcesArr.map((resource, index) => {
                    // console.log("PComp: render: allRs: ", resource)
                    return (
                      <tr className="cols layout resources-body rows" key={index}>
                        <td>{resourcesArr[index].topic}</td>
                        <td>{resourcesArr[index].abbrev}</td>
                        <td>{resourcesArr[index].link}</td>
                        <td>{resourcesArr[index].level}</td>
                        <td>{resourcesArr[index].description}</td>
                        <td>{resourcesArr[index].contributor}</td>
                      </tr>
                      )
                    })
                  }
              </tbody>
            </Table>
          </Row>
        </Col>
      </Container-fluid>
    );
  }
}

export default App;
