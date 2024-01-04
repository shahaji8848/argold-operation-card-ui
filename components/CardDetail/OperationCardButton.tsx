import React, { useState } from 'react';
import styles from '../../styles/operationDetail.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OperationCardButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="operationCardId mt-3">
        <p className="mb-0 dark-blue">Operation Card: OP--Flatting-00014</p>
        <p className="mb-0 dark-blue">Add Weight: Issue</p>
      </div>
      <div className="row mb-5 mt-3">
        <div className="col-md-9 col-12">
          <div className="row">
            {['Chain', 'Melting Wastage', 'Loss', 'Ghiss'].map(
              (val, i: any) => (
                <div className="col-md-3 col-6" key={i}>
                  <button
                    type="button"
                    className="btn btn-blueColor"
                    onClick={handleShow}
                  >
                    {val}
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl"></div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {' '}
          <div className="modal-content p-3">
            <div className="d-flex justify-content-between ">
              <h6 className="modal-title " id="exampleModalLabel">
                Item: Chain
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row d-flex mt-2">
                    <label
                      htmlFor="staticEmail"
                      className={`${styles.labelFlex} col-sm-2 col-form-label dark-blue`}
                    >
                      Weight:
                    </label>
                    <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
                      <input
                        type="text"
                        className="form-control inputFields dark-blue"
                        id="inputText"
                        placeholder="Enter Weight"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row d-flex mt-2">
                    <label
                      htmlFor="staticEmail"
                      className={`${styles.labelFlex} col-sm-2 col-form-label dark-blue`}
                    >
                      Machine Size:
                    </label>
                    <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
                      <input
                        type="text"
                        className="form-control inputFields dark-blue"
                        id="inputText"
                        placeholder="Enter Machine Size"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className={`btn btn-blueColor ${styles.submit_btn}`}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OperationCardButton;
