import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signed_In, signed_Out } from '../actions/action';
import history from '../history';
import { Link, Router } from 'react-router-dom';
import './App.scss';

import Count from '../component/Count';
import CreateCount from '../component/CreateCount';
import DeleteCount from '../component/DeleteCount/DeleteCount';
import EditCount from '../component/EditCount/EditCount';
import MenuCount from '../component/MenuCount';

class App extends Component {
  componentDidMount() {
    window.gapi.load('client: auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '214183684841-emf8emvsajq313ff75h1414uchloljbr.apps.googleusercontent.com',

          scope: 'email profile',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.userName = this.auth.currentUser
            .get()
            .getBasicProfile()
            .getName();

          this.id = this.auth.currentUser.get().getBasicProfile().getId();

          this.onAuthChange(this.auth.isSignedIn.get());
          console.log(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (value) => {
    if (value) {
      this.props.signed_In(this.id, this.userName);
    } else {
      this.props.signed_Out();
    }
  };

  renderButton() {
    if (this.props.isSignedIn) {
      return (
        <Button variant="danger" size="md" onClick={() => this.auth.signOut()}>
          Signed Out
        </Button>
      );
    } else {
      return (
        <Button variant="primary" size="md" onClick={() => this.auth.signIn()}>
          Sign in with Google
        </Button>
      );
    }
  }

  render() {
    return (
      <Router history={history}>
        {/* nav starts */}
        <Container fluid className="App ">
          <Row>
            <Col className="App__title mt-3 ">
              <Link to="/countable" className="text-decoration-none">
                <h3>Countable</h3>
              </Link>
            </Col>
            <Col className="mt-3 text-right text-decoration-none">
              {/* <Link to="/countable">{this.renderButton()}</Link> */}
              {this.renderButton()}
            </Col>
          </Row>
        </Container>

        {/* nav ends  */}
        <Switch>
          <Route path="/" exact component={Count}></Route>
          <Route path="/countable" exact component={MenuCount} />
          <Route
            path="/countable/createCount/new"
            exact
            component={CreateCount}
          />
          <Route path="/countable/deleteCount/:id" component={DeleteCount} />
          <Route path="/countable/editCount/:id" component={EditCount} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.reducers.isSignedIn };
};

export default connect(mapStateToProps, { signed_In, signed_Out })(App);
