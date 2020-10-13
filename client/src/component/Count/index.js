import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Count.scss';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Count extends Component {
  disable = () => {
    if (this.props.isSignedIn) {
      return false;
    } else {
      alert('you have to sign in first');
      return true;
    }
  };

  render() {
    return (
      <>
        <div className="Count vh-100 ">
          <div className="text-center  pt-5">
            <p style={{ fontSize: '7vw' }} className="Count__title ">
              Memories that will last...
            </p>
          </div>
          <div className="ml-5 mr-5 ">
            <Link to="/countable" onClick={() => console.log('hi')}>
              <Button
                className="text-decoration-none "
                variant="secondary"
                size="lg"
                block
                disabled={this.props.isSignedIn ? false : true}
              >
                Click to enter
              </Button>
            </Link>
            <p className="Count__sign mt-3">
              ** you have to sign in in order to enter
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.reducers.isSignedIn };
};

export default connect(mapStateToProps)(Count);
