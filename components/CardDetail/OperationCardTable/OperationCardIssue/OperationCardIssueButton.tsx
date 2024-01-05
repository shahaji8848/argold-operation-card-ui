import React from 'react';
import styles from '../../../../styles/operationDetail.module.css';

const OperationCardIssueButton = () => {
  return (
    <div>
      {/* <div className="operationCardId mt-3">
        <p className="mb-0 dark-blue">Operation Card: OP--Flatting-00014</p>
        <p className="mb-0 dark-blue">Add Weight: Issue</p>
      </div> */}

      <div className="row py-3 ps-2 pe-4">
        <div className="col-md-12 p-0 m-0 ">
          <div className="row">
            <div className="col-md-2 ">
              <span className='bold'>Issue :</span>
            </div>
            <div className="col-md-10 p-0 m-0">
              <div className="row ">
                {['Chain', 'Melting Wastage', 'Loss', 'Ghiss'].map(
                  (val, i: any) => (
                    <div className="col-md-3 col-6" key={i}>
                      <button
                        type="button"
                        className={`btn btn-blueColor ${styles.btn_tab}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        {val}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
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
        <div className="modal-dialog modal-xl">
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
        </div>
      </div>
    </div>
  );
};

export default OperationCardIssueButton;