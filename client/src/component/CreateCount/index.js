import React, { Component } from 'react';

import './CreateCount.scss';
import CreateForm from '../CreateForm/CreateForm';

class CreateCount extends Component {
  render() {
    return (
      <>
        <div className="CreateCount vh-100 pt-5">
          <CreateForm />
        </div>
      </>
    );
  }
}

export default CreateCount;
