import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { edit_count, fetch_count } from '../../actions/action';

class EditCount extends Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    this.props.fetch_count(id);
  }
  handleSubmit = (event) => {
    event.preventDefault();

    let { id } = this.props.match.params;

    const fullName =
      event.target.firstName.value + ' ' + event.target.lastName.value;
    let genders = event.target.gender.value;
    let rates = event.target.ratings.value;
    let feedback = event.target.feedbacks.value;
    let arr = { fullName, genders, rates, feedback };
    this.props.edit_count(id, arr);
  };
  render() {
    return (
      <Container
        fluid
        className="vh-100"
        style={{ backgroundColor: 'gainsboro' }}
      >
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
                  defaultValue={
                    this.props.targetInfo
                      ? this.props.targetInfo.fullName.trim().split(' ')[0]
                      : null
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  required
                  placeholder="Last name"
                  type="text"
                  id="lastName"
                  defaultValue={
                    this.props.targetInfo
                      ? this.props.targetInfo.fullName
                          .trim()
                          .split(' ')
                          .slice(-1)[0]
                      : null
                  }
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Text className="text-muted">
            English names are prefered.
          </Form.Text>

          <Form.Group>
            <Form.Label>Ex's gender</Form.Label>
            <Form.Control
              required
              as="select"
              id="gender"
              defaultValue={
                this.props.targetInfo ? this.props.targetInfo.genders : null
              }
            >
              <option>Choose...</option>
              <option>male</option>
              <option>female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rate this relationship</Form.Label>
            <div>(10 as best in my life, 1 as a total disaster)</div>
            <Form.Control
              id="ratings"
              as="select"
              defaultValue={
                this.props.targetInfo ? this.props.targetInfo.rates : null
              }
            >
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
              defaultValue={
                this.props.targetInfo ? this.props.targetInfo.feedback : null
              }
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
const mapStateToProps = (state, ownProps) => {
  let datas = [...Object.values(state.countReducers)];

  // console.log(datas);
  // datas.map((na) => console.log(na.uuid));
  // console.log(ownProps.match.params.id);
  let result = datas.filter(
    (info) => info.uuid === ownProps.match.params.id
  )[0];

  console.log(result);
  return {
    targetInfo: result,
  };
};

export default connect(mapStateToProps, { edit_count, fetch_count })(EditCount);
