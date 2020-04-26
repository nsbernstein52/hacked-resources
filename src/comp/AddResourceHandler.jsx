// AddResourceHandler.jsx

import React from 'react';
import Row from 'react-bootstrap/Row';

class AddResourceHandler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          abbrev: null,
          contributor: null,
          description: null,
          level: null,
          link: null,
          topic: null
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
      return (
          <form id="addResourceForm">
              <Row>
              &nbsp;&nbsp; Topic: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input name="topic" onChange={this.handleChange} placeholder="topic ..." type="text" size="50" />  
              </Row>
              <Row>
              &nbsp;&nbsp; Link: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    <input name="link" onChange={this.handleChange} placeholder="link ..." type="text" size="70" /> 
              </Row>
              <Row>
              &nbsp;&nbsp; Abbreviation: &nbsp;  <input name="abbrev" onChange={this.handleChange} placeholder="abbrev..." type="text" size="10" />                  
              </Row>
              <Row>
              &nbsp;&nbsp; Level: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <input name="level" onChange={this.handleChange} placeholder="level ..." type="text" size="5" /> 
              </Row>
              <Row>                 
              &nbsp;&nbsp; Contributor: &nbsp; &nbsp;  <input name="contributor" onChange={this.handleChange} placeholder="contributor ..." type="text" size="20" /> 
              </Row>
              <Row>
              &nbsp;&nbsp; Description: &nbsp; &nbsp;  <input name="description" onChange={this.handleChange} placeholder="description ..." size="70" /> 
              </Row>
               <button text-color="red" onClick={(e) => this.props.addOneResource(e, 
                  this.state.abbrev, 
                  this.state.contributor, 
                  this.state.description,
                  this.state.level, 
                  this.state.link, 
                  this.state.topic
                )}><b>Add A Resource</b></button>
            </form>
        )
    }
}

export default AddResourceHandler;
