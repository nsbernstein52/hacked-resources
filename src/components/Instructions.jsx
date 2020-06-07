import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Instructions.css';

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: null,
    };
  }

  render() {
    const { dummy } = this.state;

    return (
      <div>
        <Row>
          <Col className="instr-caption" md={2}>
            Sort by column:
          </Col>
          <Col className="instr-body" md={10}>
            Click on column header
          </Col>
        </Row>
        <Row>
          <Col className="instr-caption" md={2}>
            Edit cell:
          </Col>
          <Col className="instr-body" md={10}>
            Click in cell (for &quot;link&quot;, click to right side of link), change text, press ENTER (or ESC to cancel)
          </Col>
        </Row>
        <Row>
          <Col className="instr-caption" md={2}>
            Delete row:
          </Col>
          <Col className="instr-body" md={10}>
            Click on radio button, click on DELETE
          </Col>
        </Row>
        <Row>
          <Col className="instr-caption" md={2}>
            Filter by column:
          </Col>
          <Col className="instr-body" md={10}>
            Enter text (not case sensitive) in box at bottom of column
          </Col>
        </Row>
        <Row>
          <Col className="instr-caption" md={2}>
            Add a resource:
          </Col>
          <Col className="instr-body" md={10}>
            Use
            {' '}
            <a href="./#add-resource">Add Resource</a>
            {' '}
            form at the bottom of the page
          </Col>
        </Row>
      </div>
    );
  }
}

export default Instructions;
