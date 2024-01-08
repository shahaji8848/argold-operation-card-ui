import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';

const OperationCardIssueButton = ({ operationCardProductDept }: any) => {
  console.log(operationCardProductDept, 'operationCardProductDeptsdds');
  const [show, setShow] = useState(false);
  const [itemName, setItemName] = useState('');
  const [getValues, setGetValues] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (value: any) => {
    setShow(true);
    setItemName(value);
    const operationCardValue = operationCardProductDept?.issue_items.filter(
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

  console.log('Keys with 0 value:', getValues.length);
  return (
    <div>
      {/* <div className="operationCardId mt-3">
        <p className="mb-0 dark-blue">Operation Card: OP--Flatting-00014</p>
        <p className="mb-0 dark-blue">Add Weight: Issue</p>
      </div> */}
      <div className="row ">
        <div className="col-md-12  ">
          <div className="row">
            <div className="col-md-3">
              <span className="bold">Issue :</span>
            </div>
            <div className="col-md-9 ">
              <div className="d-flex justify-content-between">
                {operationCardProductDept?.issue_items?.length > 0 &&
                  operationCardProductDept?.issue_items.map(
                    (val: any, i: any) => (
                      <div className="col-md-3 col-6" key={i}>
                        <button
                          type="button"
                          className={`btn btn-blueColor ${styles.btn_tab}`}
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
          <div className="row">
            {getValues?.length > 0 &&
              getValues?.map((val: any, i: any) => (
                <div className="col-md-6">
                  {/* <label
                        htmlFor="staticEmail"
                        className={`${styles.labelFlex} col-sm-2 col-form-label dark-blue`}
                      >
                        Weight:
                      </label> */}
                  <div
                    className={`col-sm-10 text-left ${styles.inputFlex} mt-2`}
                  >
                    <input
                      type="text"
                      className="form-control inputFields dark-blue"
                      id={val}
                      placeholder={
                        val.charAt(0).toUpperCase() +
                        val
                          .slice(1)
                          .split('_')
                          .filter(
                            (val: any) => val !== 'set' && val !== 'readonly'
                          )
                          .join(' ')
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
          {getValues?.length > 0 ? (
            <div className="d-flex justify-content-start mt-3">
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

export default OperationCardIssueButton;
