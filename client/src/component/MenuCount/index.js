import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetch_counts } from '../../actions/action';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class MenuCount extends Component {
  componentDidMount() {
    this.props.fetch_counts();

    //testing

    // window.gapi.load('client: auth2', () => {
    //   window.gapi.client
    //     .init({
    //       clientId:
    //         '214183684841-emf8emvsajq313ff75h1414uchloljbr.apps.googleusercontent.com',

    //       scope: 'email profile',
    //     })
    //     .then(() => {
    //       this.auth = window.gapi.auth2.getAuthInstance();
    //       this.onAuthChange(this.auth.isSignedIn.get());
    //       console.log(this.auth.isSignedIn.get());
    //       this.auth.isSignedIn.listen(this.onAuthChange);

    //       this.userName = this.auth.currentUser
    //         .get()
    //         .getBasicProfile()
    //         .getName();

    //       this.id = this.auth.currentUser.get().getBasicProfile().getId();

    //       // Listen for sign-in state changes.
    //       // GoogleAuth.isSignedIn.listen(updateSigninStatus);
    //     });
    // });

    //testing ends
  }

  // onAuthChange = (value) => {
  //   if (value) {
  //     this.props.signed_In(this.id, this.userName);
  //   } else {
  //     this.props.signed_Out();
  //   }
  // };

  renderList() {
    return this.props.datas.map((data) => {
      return (
        <Card className="mt-3 shadow" key={this.props.datas.id}>
          <Card.Header as="h5">Name: {data.fullName}</Card.Header>
          <Card.Body>
            <Card.Text>
              Rating: {data.rates === 'Choose...' ? 'no data' : data.rates}
            </Card.Text>
            <Card.Text>
              Gender: {data.genders === 'Choose...' ? 'no data' : data.genders}
            </Card.Text>
            <Card.Text>
              {data.feedback === 'Choose...' ? 'no feedbacks' : data.feedback}
            </Card.Text>
            <Link to={`/countable/editCount/3`}>
              <Button variant="primary m-2">edit</Button>
            </Link>
            <Button variant="primary m-2">delete</Button>
          </Card.Body>
        </Card>
      );
    });
  }

  renderButton() {
    if (this.props.isSignedIn)
      return (
        <Link to="countable/createCount/new">
          <Button variant="primary m-5">Create new Ex's</Button>
        </Link>
      );
  }

  render() {
    return (
      <div className="" style={{ backgroundColor: 'gainsboro' }}>
        <Container fluid className="pr-5 pl-5 pt-5">
          <div
            style={{ justifyContent: 'center', backgroundColor: 'gainsboro' }}
          >
            {this.renderList()}
          </div>
          {this.renderButton()}
          {/* <Link to="countable/createCount/new">
            <Button variant="primary m-5">Create new Ex's</Button>
          </Link> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    datas: Object.values(state.countReducers),
    isSignedIn: state.reducers.isSignedIn,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    fetch_counts,
  })(MenuCount)
);
