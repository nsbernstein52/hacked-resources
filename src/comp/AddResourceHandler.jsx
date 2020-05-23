import React from 'react';
import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';
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
      this.setState({ [e.target.name]: e.target.value });
  }

    render() {
      return (

        // <div class="container">
        //   <form>
        //     <ul class="flex-outer">
        //       <li>
        //         <label for="first-name">First Name</label>
        //         <input type="text" id="first-name" placeholder="Enter your first name here">
        //       </li>
        //       <li>
        //         <label for="last-name">Last Name</label>
        //         <input type="text" id="last-name" placeholder="Enter your last name here">
        //       </li>
        //       <li>
        //         <label for="email">Email</label>
        //         <input type="email" id="email" placeholder="Enter your email here">
        //       </li>
        //       <li>
        //         <label for="phone">Phone</label>
        //         <input type="tel" id="phone" placeholder="Enter your phone here">
        //       </li>
        //       <li>
        //         <label for="message">Message</label>
        //         <textarea rows="6" id="message" placeholder="Enter your message here"></textarea>
        //       </li>
        //       <li>
        //         <p>Age</p>
        //         <ul class="flex-inner">
        //           <li>
        //             <input type="checkbox" id="twenty-to-twentynine">
        //             <label for="twenty-to-twentynine">20-29</label>
        //           </li>
        //           <li>
        //             <input type="checkbox" id="thirty-to-thirtynine">
        //             <label for="thirty-to-thirtynine">30-39</label>
        //           </li>
        //           <li>
        //             <input type="checkbox" id="fourty-to-fourtynine">
        //             <label for="fourty-to-fourtynine">40-49</label>
        //           </li>
        //           <li>
        //             <input type="checkbox" id="fifty-to-fiftynine">
        //             <label for="fifty-to-fiftynine">50-59</label>
        //           </li>
        //           <li>
        //             <input type="checkbox" id="sixty-to-sixtynine">
        //             <label for="sixty-to-sixtynine">60-69</label>
        //           </li>
        //           <li>
        //             <input type="checkbox" id="other">
        //             <label for="other">Other</label>
        //           </li>
        //         </ul>
        //       </li>
        //       <li>
        //         <button type="submit">Submit</button>
        //       </li>
        //     </ul>
        //   </form>
        // </div> 

        <form id='addResourceForm' className='add-resource-form'>
            <Row>
                &nbsp; &nbsp; &nbsp; <b>Topic:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input name='topic' onChange={this.handleChange} placeholder='topic ...' type='text' size='30' />  
            </Row>
            <Row>
            &nbsp; &nbsp; &nbsp; <b>Abbreviation:</b> &nbsp;  <input name='abbrev' onChange={this.handleChange} placeholder='abbrev...' type='text' size='10' />                  
            </Row>
            <Row>
            &nbsp; &nbsp; &nbsp; <b>Link:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    <input name='link' onChange={this.handleChange} placeholder='link ...' type='text' size='70' /> 
            </Row>
            <Row>
            &nbsp; &nbsp; &nbsp; <b>Level:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <input name='level' onChange={this.handleChange} placeholder='level ...' type='text' size='10' /> 
            </Row>
            <Row>                 
            &nbsp; &nbsp; &nbsp; <b>Contributor:</b> &nbsp; &nbsp;  <input name='contributor' onChange={this.handleChange} placeholder='contributor ...' type='text' size='30' /> 
            </Row>
            <Row>
            &nbsp; &nbsp; &nbsp; <b>Description:</b> &nbsp; &nbsp;  <input name='description' onChange={this.handleChange} placeholder='description ...' size='70' /> 
            </Row>
            &nbsp; <button style={{color: 'red'}} onClick={(e) => this.props.addResource(e, 
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
