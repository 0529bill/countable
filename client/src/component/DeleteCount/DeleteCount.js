import React, { Component } from 'react';
import Modals from '../../Modals';
import { connect } from 'react-redux';
import { fetch_count, delete_count } from '../../actions/action';
class DeleteCount extends Component {
  componentDidMount() {
    this.props.fetch_count(this.props.match.params.id);
  }
  render() {
    console.log('renderingDeleteCount');
    return (
      <div className="vh-100" style={{ backgroundColor: 'gainsboro' }}>
        <Modals
          fullName={
            this.props.targetInfo ? this.props.targetInfo.fullName : 'unknown'
          }
          rates={
            this.props.targetInfo ? this.props.targetInfo.rates : 'unknown'
          }
          handleDelete={() =>
            this.props.delete_count(this.props.match.params.id)
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { targetInfo: state.countReducers[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetch_count,
  delete_count,
})(DeleteCount);
