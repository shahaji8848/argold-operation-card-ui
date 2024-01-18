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
  const values = 'set_product_category';
  values.split('_').filter((val) => val === 'set' || val === 'readonly');
  console.log(
    'values:',
    values
      .split('_')
      .filter((val) => val !== 'set' && val !== 'readonly' && val !== 'show')
      .map((val, index) =>
        index === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val
      )
      .join(' ')
  );
  return (
    <>
      <div className="row">
        <div className="col-xxl-2 col-xl-3  col-lg-3 col-md-3 ">
          <span className="bold">Receipt :</span>
        </div>
        <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-9 ">
          <div className="row btn_wrapper_end">
            <div className={`col-md-12 text-end ${styles.btn_wrapper_mob}`}>
              {operationCardProductDept?.receipt_items?.length > 0 &&
                operationCardProductDept?.receipt_items.map(
                  (val: any, i: any) => {
                    return (
                      <>
                        {val?.item !== 'Chain' && (
                          <button
                            type="button"
                            className={`btn btn-blue btn-py  mt-1 px-3 ms-2 `}
                            onClick={() => handleShow(val.item)}
                            key={i}
                          >
                            {val?.item}
                          </button>
                        )}
                      </>
                      // <div
                      //   className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-2  btn_wrapper"
                      //   key={i}
                      // >

                      // </div>
                    );
                  }
                )}
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
                  <div className="col-md-4" key={i}>
                    <div className="form-group row d-flex mt-2">
                      <label
                        htmlFor="staticEmail"
                        className={`${styles.labelFlex} col-sm-10 col-form-label dark-blue mt-2 font-weight-bold`}
                      >
                        {val
                          .split('_')
                          .filter(
                            (val: any) =>
                              val !== 'set' &&
                              val !== 'readonly' &&
                              val !== 'show'
                          )
                          .map((val: any, index: any) =>
                            index === 0
                              ? val.charAt(0).toUpperCase() + val.slice(1)
                              : val
                          )
                          .join(' ')}
                      </label>
                      <div
                        className={`col-sm-10 text-left ${styles.inputFlex}`}
                      >
                        <input
                          type="text"
                          className="form-control inputFields dark-blue"
                          id={val}
                          placeholder={val
                            .split('_')
                            .filter(
                              (val: any) =>
                                val !== 'set' &&
                                val !== 'readonly' &&
                                val !== 'show'
                            )
                            .map((val: any, index: any) =>
                              index === 0
                                ? val.charAt(0).toUpperCase() + val.slice(1)
                                : val
                            )
                            .join(' ')}
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
                className={`btn btn-blueColor ${styles.submit_btn} `}
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
