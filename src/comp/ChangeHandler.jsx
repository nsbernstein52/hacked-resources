// ChangeHandler.jsx

import React from 'react';

class ChangeHandler extends React.Component {
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
                <input name="topic" onChange={this.handleChange} placeholder="topic ..." type="text" size="10" /> &nbsp;&nbsp;
                {/* <br /> */}
                <input name="abbrev" onChange={this.handleChange} placeholder="abbrev ..." type="text" size="10" /> &nbsp;&nbsp;
                {/* <br /> */}
                <input name="level" onChange={this.handleChange} placeholder="level ..." type="text" size="10" /> &nbsp;&nbsp;
                {/* <br /> */}
                <input name="link" onChange={this.handleChange} placeholder="link ..." type="text" size="10" /> &nbsp;&nbsp;
                {/* <br /> */}
                <input name="description" onChange={this.handleChange} placeholder="description ..." type="number" /> &nbsp;&nbsp;
                {/* <br /> */}
                <button text-color="red" onClick={(e) => this.props.addResource(e, 
                  this.state.topic, 
                  this.state.abbrev, 
                  this.state.level, 
                  this.state.link, 
                  this.state.description
                )}><b>Add A Resource</b></button>
            </form>
        )
    }
}

export default ChangeHandler;
