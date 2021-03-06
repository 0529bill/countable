import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ThemeProvider,
} from 'react-bootstrap';

import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { create_count } from '../../actions/action';

class CreateForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const fullName =
      event.target.firstName.value + ' ' + event.target.lastName.value;

    let genders = event.target.gender.value;

    let rates = event.target.ratings.value;

    let feedback = event.target.feedbacks.value;

    let arr = { fullName, genders, rates, feedback };
    this.props.create_count(arr);
  };

  render() {
    return (
      <Container fluid>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Your ex's name</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="First name"
                  required
                  type="text"
                  id="firstName"
                />
              </Col>
              <Col>
                <Form.Control
                  required
                  placeholder="Last name"
                  type="text"
                  id="lastName"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Text className="text-muted">
            English names are prefered.
          </Form.Text>

          <Form.Group>
            <Form.Label>Ex's gender</Form.Label>
            <Form.Control required as="select" id="gender">
              <option>Choose...</option>
              <option>male</option>
              <option>female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rate this relationship</Form.Label>
            <div>(10 as best in my life, 0 as a total disaster)</div>
            <Form.Control id="ratings" as="select">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              id="feedbacks"
              type="textarea"
              placeholder="write any comments.."
            />
          </Form.Group>

          <Button variant="primary mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { create_count })(CreateForm);
