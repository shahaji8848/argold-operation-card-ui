import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';

const OperationCardReciptButton = ({ operationCardProductDept }: any) => {
  console.log(
    operationCardProductDept,
    'operationCardProductDept  from receipt'
  );
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
    <>
      <div className="row ">
        <div className="col-md-12  ">
          <div className="row">
            <div className="col-xxl-2 col-xl-2  col-lg-3 col-md-3 ">
              <span className="bold">Receipt :</span>
            </div>
            <div className="col-xxl-10 col-xl-10 col-lg-9 col-md-9 ">
              <div className="d-flex justify-content-between ">
                {operationCardProductDept?.receipt_items?.length > 0 &&
                  operationCardProductDept?.receipt_items.map(
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
                          placeholder={
                            val.charAt(0).toUpperCase() +
                            val
                              .slice(1)
                              .split('_')
                              .filter(
                                (val: any) =>
                                  val !== 'set' && val !== 'readonly'
                              )
                              .join(' ')
                          }
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
    </>
  );
};

export default OperationCardReciptButton;
