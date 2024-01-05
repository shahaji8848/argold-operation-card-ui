import React, { useEffect, useState } from 'react';
import styles from '../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';

const OperationCardReciptButton = ({ operationCardProductDept }: any) => {
  console.log(operationCardProductDept, 'operationCardProductDept');
  const [show, setShow] = useState(false);
  const [itemName, setItemName] = useState('');
  const [getValues, setGetValues] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (value: any) => {
    setShow(true);
    setItemName(value);
    const operationCardValue = operationCardProductDept?.receipt_items.filter(
      (issueVal: any) => issueVal.item === value
    );
    console.log(operationCardValue, 'operationCardValue');

    const filterZeroFields = operationCardValue.map((item: any) =>
      Object.entries(item)
        .filter(([key, value]) => value === 0 && key !== 'docstatus')
        .map(([key]) => key)
    );
    setGetValues(filterZeroFields[0]);
  };

  console.log('Keys with 1 value:', getValues);
  return (
    <div>
      <div className="operationCardId mt-3">
        <p className="mb-0 dark-blue">Operation Card: OP--Flatting-00014</p>
        <p className="mb-0 dark-blue">Add Weight: Issue</p>
      </div>
      <div className="row mb-5 mt-3">
        <div className="col-md-9 col-12">
          <div className="row">
            {operationCardProductDept?.receipt_items?.length > 0 &&
              operationCardProductDept?.receipt_items.map(
                (val: any, i: any) => (
                  <div className="col-md-3 col-6" key={i}>
                    <button
                      type="button"
                      className="btn btn-blueColor"
                      onClick={() => handleShow(val.item)}
                    >
                      {val?.item}
                    </button>
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          {' '}
          <h6 className="">Item: {itemName}</h6>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className="d-flex justify-content-between "></div>
          <div className="modal-body">
            <div className="row">
              {getValues?.length > 0 &&
                getValues?.map((val: any, i: any) => (
                  <div className="col-md-6">
                    <div className="form-group row d-flex mt-2">
                      <label
                        htmlFor="staticEmail"
                        className={`${styles.labelFlex} col-sm-2 col-form-label dark-blue`}
                      >
                        Weight:
                      </label>
                      <div
                        className={`col-sm-10 text-left ${styles.inputFlex}`}
                      >
                        <input
                          type="text"
                          className="form-control inputFields dark-blue"
                          id={val}
                          placeholder={val}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {getValues?.length > 0 ? (
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className={`btn btn-blueColor ${styles.submit_btn}`}
                onClick={handleClose}
              >
                Submit
              </button>
            </div>
          ) : (
            ''
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OperationCardReciptButton;
