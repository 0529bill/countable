import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from './history';
function Modals(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return ReactDOM.createPortal(
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onExited={() => history.push('/countable')}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete <strong>{props.fullName}</strong>, rating{' '}
          <strong>{props.rates}</strong>'s file?`
        </Modal.Body>
        <Modal.Footer>
          <Link to="/countable">
            <Button variant="secondary">Close</Button>
          </Link>
          <Link to="/countable">
            <Button variant="primary" onClick={() => props.handleDelete()}>
              Delete
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>,
    document.querySelector('#modal')
  );
}

export default Modals;
