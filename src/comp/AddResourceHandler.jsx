import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

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
    console.log({ [e.target.name]: e.target.value });
      this.setState({ [e.target.name]: e.target.value });
  }

    render() {
      return (
        <Container-fluid>
          <Form>
            <Form.Group as={Row} controlId='topic'>
              <Form.Label column md={2} className='form-caption'>
                Topic
              </Form.Label>
              <Col md={10} className='inputVal'>
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

            {/* <Form.Group as={Row} controlId='formHorizontalPassword'> */}
            <Form.Group as={Row} controlId='abbrev'>
              <Form.Label column sm={2} className='form-caption'>
                Abbreviation
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name='abbrev'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='abbreviation' 
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
                  placeholder='link'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='level'>
              <Form.Label column sm={2} className='form-caption'>
                Level
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name='level'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='level'
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='contributor'>
              <Form.Label column sm={2} className='form-caption'>
                Contributor
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name='contributor'
                  className='form-val'
                  size='sm'
                  type='text'
                  placeholder='contributor'
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
                {/* <Button type='submit' className='btn'>Add Resource</Button> */}
                {/* <Button  className='btn' onClick={(e) => this.props.addResource(e, */}
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
        </Container-fluid>

        // <form id='addResourceForm' className='add-resource-form'>
        //     <Row>
        //         &nbsp; &nbsp; &nbsp; <b>Topic:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input name='topic' onChange={this.handleChange} placeholder='topic ...' type='text' size='30' />  
        //     </Row>
        //     <Row>
        //     &nbsp; &nbsp; &nbsp; <b>Abbreviation:</b> &nbsp;  <input name='abbrev' onChange={this.handleChange} placeholder='abbrev...' type='text' size='10' />                  
        //     </Row>
        //     <Row>
        //     &nbsp; &nbsp; &nbsp; <b>Link:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    <input name='link' onChange={this.handleChange} placeholder='link ...' type='text' size='70' /> 
        //     </Row>
        //     <Row>
        //     &nbsp; &nbsp; &nbsp; <b>Level:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <input name='level' onChange={this.handleChange} placeholder='level ...' type='text' size='10' /> 
        //     </Row>
        //     <Row>                 
        //     &nbsp; &nbsp; &nbsp; <b>Contributor:</b> &nbsp; &nbsp;  <input name='contributor' onChange={this.handleChange} placeholder='contributor ...' type='text' size='30' /> 
        //     </Row>
        //     <Row>
        //     &nbsp; &nbsp; &nbsp; <b>Description:</b> &nbsp; &nbsp;  <input name='description' onChange={this.handleChange} placeholder='description ...' size='70' /> 
        //     </Row>
        //     &nbsp; <button style={{color: 'red'}} onClick={(e) => this.props.addResource(e, 
        //         this.state.abbrev, 
        //         this.state.contributor, 
        //         this.state.description,
        //         this.state.level, 
        //         this.state.link, 
        //         this.state.topic
        //     )}><b>Add A Resource</b></button>
        // </form>

      )
    }
}

export default AddResourceHandler;
