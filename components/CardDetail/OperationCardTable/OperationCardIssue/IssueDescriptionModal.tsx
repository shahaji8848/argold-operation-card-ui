import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const IssueDescriptionModal = ({ description }: any) => {
  const [showPopup, setShowPopup] = useState(false);

  const truncatedDescription = description?.substring(0, 5) + (description?.length > 5 ? '...' : '');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* <div onClick={togglePopup}>{truncatedDescription}</div>
      {showPopup && (
        <div className="popup" onClick={togglePopup}>
          <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
            <div onClick={togglePopup} className="close-btn">
              &times;
            </div>
            <div>{description}</div>
          </div>
        </div>
      )} */}
      <div onClick={toggleModal}>{truncatedDescription}</div>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>Description</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IssueDescriptionModal;
