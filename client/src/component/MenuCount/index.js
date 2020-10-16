import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetch_counts, reloading } from '../../actions/action';
import {
  Container,
  Card,
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signed_In } from '../../actions/action';
import { reduce } from 'lodash';

class MenuCount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    setTimeout(
      function () {
        this.props.fetch_counts(); //After 1 second, set render to true
      }.bind(this),
      500
    );
  }
  /////////////action creator is syncronous so i have it add a setTimeOut in order to wait for other actions to complete first!

  renderList() {
    return this.props.datas.map((data) => {
      return (
        <Card className="mt-3 shadow" key={this.props.datas.uuid}>
          <Card.Header as="h5">{data.fullName}</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong> Rating:</strong>
              {data.rates ? `   ${data.rates}` : '  no data'}
            </Card.Text>
            <Card.Text>
              <strong>Gender:</strong>
              {data.genders === 'Choose...'
                ? '  no data'
                : `   ${data.genders}`}
            </Card.Text>
            <Card.Text>
              <strong>feedback:</strong>
              {data.feedback === '' ? '  no feedbacks' : `    ${data.feedback}`}
            </Card.Text>
            {this.props.userInfo &&
            data.userId === this.props.userInfo.userId ? (
              <>
                <Link to={`/countable/editCount/${data.uuid}`}>
                  <Button variant="primary m-2">edit</Button>
                </Link>
                <Link to={`/countable/deleteCount/${data.uuid}`}>
                  <Button variant="primary m-2">delete</Button>
                </Link>
              </>
            ) : null}
          </Card.Body>
        </Card>
      );
    });
  }

  renderRankCount = () => {
    return Object.keys(this.props.datas).length;
  };

  renderRankStar = () => {
    let targetedData = this.props.datas.filter(
      (data) =>
        this.props.userInfo && data.userId === this.props.userInfo.userId
    );

    let total = 0;
    for (let i = 0; i < Object.keys(targetedData).length; i++) {
      total += Number(targetedData[i].rates);
    }
    return total ? total : 'undefined';
  };

  renderRank = () => {
    if (this.renderRank && this.renderRankCount) {
      if (this.renderRankStar() / this.renderRankCount() >= 7) {
        return ' You are a master!';
      } else if (this.renderRankStar() / this.renderRankCount() > 4) {
        return 'You are a pro';
      } else {
        return 'You are a beginner';
        // return this.renderRankStar() / this.renderRankCount();
      }
    } else {
      return 'undefined! try refresh the window again';
    }
  };

  renderRankDecide = () => {
    if (this.renderRank()) {
      return this.renderRank();
    } else {
      return 'undefinded! try refresh the window again';
    }
  };

  renderIcon = () => {
    if (this.renderRank() === 'You are a pro') {
      return (
        <div>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
      );
    } else if (this.renderRank() === 'You are a beginner') {
      return (
        <div>
          <i class="fa fa-star"></i>
        </div>
      );
    } else if (this.renderRank() === ' You are a master!') {
      return (
        <div>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
      );
    } else {
      return 'something went wrong! try refresh the window again!';
    }
  };

  renderColor = () => {
    if (this.renderRank() === 'You are a pro') {
      return '#92a8d1';
    } else if (this.renderRank() === 'You are a beginner') {
      return '#b1cbbb';
    } else if (this.renderRank() === ' You are a master!') {
      return '#eea29a';
    } else {
      return 'something went wrong! try refresh the window again!';
    }
  };

  renderUserInfo() {
    return (
      <Card
        className="mt-3  mb-3 shadow-lg"
        style={{
          backgroundColor: `${this.renderColor()}`,
          fontSize: '18px',
          filter: 'brightness(1.1)',
        }}
      >
        <Card.Header as="h5">User's Basic Info</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong> Name:</strong>
            {this.props.userInfo
              ? `  ${this.props.userInfo.userName}`
              : 'undefined'}
          </Card.Text>
          <Card.Text>
            <strong>Your Status:</strong>
            {this.props.isSignedIn
              ? ` You are signed in!`
              : ` Please signed in first!`}
          </Card.Text>
          <Card.Text>
            <strong>HighLight: </strong> You have{' '}
            <strong>{this.renderRankCount()}</strong> Ex's and{' '}
            <strong>{this.renderRankStar()}</strong> points out of satisfaction
          </Card.Text>
          <Card.Text>
            <strong>Rank: </strong>
            <strong>{this.renderRankDecide()}</strong>
          </Card.Text>
          {this.renderIcon()}
        </Card.Body>
      </Card>
    );
  }
  renderDropDown = () => {
    return (
      <DropdownButton className="m-3" variant="info" title="Sort">
        <Dropdown.Item>Sorting accoring user</Dropdown.Item>
        <Dropdown.Item>Sorting according rating</Dropdown.Item>
      </DropdownButton>
    );
  };

  renderButton() {
    if (this.props.isSignedIn)
      return (
        <Link to="/countable/createCount/new">
          <Button variant="primary m-5">Create new Ex's</Button>
        </Link>
      );
  }

  render() {
    return (
      <div
        className=""
        style={{
          backgroundColor: 'gainsboro',
          height: '100%',
        }}
      >
        <Container className="pr-5 pl-5 pt-5">
          <div
            style={{
              justifyContent: 'center',
              backgroundColor: 'gainsboro',
            }}
          >
            {this.renderDropDown()}
            {this.renderUserInfo()}
            {this.renderList()}
            {this.renderButton()}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    datas: Object.values(state.countReducers),
    isSignedIn: state.reducers.isSignedIn,
    userInfo: state.reducers.userInfo,
  };
};
export default connect(mapStateToProps, {
  fetch_counts,
  signed_In,
  reloading,
})(MenuCount);
