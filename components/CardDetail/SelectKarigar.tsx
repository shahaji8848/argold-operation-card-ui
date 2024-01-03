'use client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../../styles/operationDetail.module.css';
const SelectKarigar = () => {
  return (
    <div>
      <div className="form-group row d-flex flex-column ">
        <label
          htmlFor="staticEmail"
          className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
        >
          Karigar:
        </label>
        <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
          <select
            className="form-control inputFields dark-blue"
            id="exampleFormControlSelect1"
          >
            <option selected>Select Karigar</option>
            <option>Select Karigar1</option>
            <option>Select Karigar2</option>
            <option>Select Karigar3</option>
          </select>
        </div>
      </div>

      <div className="form-group row d-flex mt-2 flex-column ">
        <label
          htmlFor="staticEmail"
          className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
        >
          Tounch Purity:
        </label>
        <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
          <input
            type="text"
            className="form-control inputFields dark-blue"
            id="inputText"
            placeholder="Tounch Purity"
            value={'0.0'}
          />
        </div>
      </div>
      <div className="form-group row d-flex mt-2 flex-column ">
        <label
          htmlFor="staticEmail"
          className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
        >
          Quantity:
        </label>
        <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
          <input
            type="text"
            className="form-control inputFields dark-blue"
            id="inputText"
            placeholder="Tounch Purity"
            value={'0.0'}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectKarigar;
