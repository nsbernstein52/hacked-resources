import React from 'react';
// import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddResource.css';

class AddResource extends React.Component {
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
    // console.log({ [e.target.name]: e.target.value });
      this.setState({ [e.target.name]: e.target.value });
  }

    render() {
      return (
        // <Container-fluid className='add-resource-container'>
          <Form className='add-form'>
            <Form.Group as={Row} controlId='topic'>
              <Form.Label column md={2} className='form-caption'>
                Topic
              </Form.Label>
              <Col md={4}>
                <Form.Control
                  name='topic'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='topic' 
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='abbrev'>
              <Form.Label column sm={2} className='form-caption'>
                Abbreviation
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  name='abbrev'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='abbrev' 
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='link'>
              <Form.Label column sm={2} className='form-caption'>
                Link
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name='link'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='example: http://tbd.com'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='level'>
              <Form.Label column sm={2} className='form-caption'>
                Level
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  name='level'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='Level:  Jr, Sr, All'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='contributor'>
              <Form.Label column sm={2} className='form-caption'>
                Contributor
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name='contributor'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='name, affiliation (e.g., BLD08)'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='description'>
              <Form.Label column sm={2} className='form-caption'>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name='description'
                  className='form-val'
                  as="textarea" rows="3" 
                  size='sm'
                  type='text'
                  placeholder='description'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button  className='btn' onClick={(e) => this.props.addResource(e,
                  this.state.abbrev, 
                  this.state.contributor, 
                  this.state.description,
                  this.state.level, 
                  this.state.link, 
                  this.state.topic
                )}>Add Resource</Button>
              </Col>
            </Form.Group>
          </Form>
        // </Container-fluid>
      )
    }
}

export default AddResource;
