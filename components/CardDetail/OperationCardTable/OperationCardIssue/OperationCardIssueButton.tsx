import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';

const OperationCardIssueButton = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  const [show, setShow] = useState(false);
  const [itemName, setItemName] = useState('');
  const [getValues, setGetValues] = useState<any>([]);

  const [modalFieldValuesState, setModalFieldValuesState] = useState<any>({});
  const handleSubmit = () => {
    console.log('keys modal fields', modalFieldValuesState);
  };
  const handleClose = () => setShow(false);
  const handleModalFieldsChange = (e: any) => {
    const { name, value } = e.target;
    setModalFieldValuesState({
      ...modalFieldValuesState,
      [name]: value,
    });
  };
  const handleShow = (value: any) => {
    setShow(true);
    setItemName(value);
    const operationCardValue = operationCardProductDept?.issue_items?.filter(
      (issueVal: any) => issueVal.item === value
    );

    const showKeys = Object.keys(operationCardValue[0]).filter((key) =>
      key.startsWith('show')
    );
    const setKeys = Object.keys(operationCardValue[0]).filter((key) =>
      key.startsWith('set')
    );

    const resultArray = groupByKeyWords(showKeys, setKeys);

    function groupByKeyWords(showKeys: any, setKeys: any) {
      const groupedKeys: any = {};

      showKeys.concat(setKeys).forEach((key: any) => {
        const keyword = key.substring(key.indexOf('_') + 1);

        if (!groupedKeys[keyword]) {
          groupedKeys[keyword] = {};
        }

        groupedKeys[keyword][key] = operationCardValue[0][key]; // Access value correctly
      });

      return Object.values(groupedKeys);
    }
    console.log('keys 2', resultArray);

    let filterArray: any[];

    filterArray = resultArray?.filter((obj: any) => {
      const hasNonZeroShow = Object.keys(obj).some(
        (key) => key.startsWith('show') && obj[key] !== 0
      );

      const hasNonZeroSet = Object.keys(obj).some(
        (key) => key.startsWith('set') && obj[key] !== 0
      );

      return hasNonZeroShow || hasNonZeroSet;
    });

    filterArray = filterArray.map((obj) => {
      const updatedObj: any = { ...obj }; // Create a copy of the original object
      Object.keys(updatedObj).forEach((key) => {
        if (key.startsWith('show_')) {
          const label = key.replace('show_', ''); // Remove "show_" from the key
          updatedObj[key] = obj[key];
          updatedObj['label'] = label; // Add the "label" key with the modified label value
        }
      });
      return updatedObj;
    });
    console.log('keys after filtered', filterArray);

    setGetValues(filterArray);

    const getOperationCardDetailDataValue =
      operationCardDetailData?.operation_card_issue_details?.filter(
        (issueVal: any) => issueVal.item === value
      );

    console.log('keys og', getOperationCardDetailDataValue);

    let output_obj: any = {};

    filterArray.forEach((item: any) => {
      const label = item?.label;

      if (getOperationCardDetailDataValue[0]?.hasOwnProperty(label)) {
        output_obj[label] = getOperationCardDetailDataValue[0][label];
      }
    });

    console.log('keys in og obj', output_obj);

    setModalFieldValuesState(output_obj);
  };

  return (
    <div>
      <div className={`row ${styles.mob_wrapper} `}>
        <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-3">
          <span className="bold">Issue :</span>
        </div>
        <div className="col-xxl-11 col-xl-10 col-lg-10 col-md-9 ">
          <div className=" row btn_wrapper_end">
            <div className={`col-md-12 text-end ${styles.btn_wrapper_mob}`}>
              {operationCardProductDept?.issue_items?.length > 0 &&
                operationCardProductDept?.issue_items.map(
                  (val: any, i: any) => (
                    <button
                      type="button"
                      className={`btn btn-blue btn-py  mt-1 px-3 ms-2`}
                      onClick={() => handleShow(val.item)}
                      key={i}
                    >
                      {val?.item}
                    </button>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          {' '}
          <h6 className="">Item: {itemName}</h6>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className="d-flex justify-content-between "></div>
          <div className="row">
            {getValues?.length > 0 &&
              getValues?.map((val: any, i: any) => {
                const setKey: any = `set_${val.label
                  .toLowerCase()
                  .replace(' ', '_')}`;
                return (
                  <div className="col-md-4 " key={i}>
                    <label
                      htmlFor="staticEmail"
                      className={`${styles.labelFlex} col-sm-10 col-form-label dark-blue mt-2 font-weight-bold`}
                    >
                      {val?.label
                        ?.split('_')
                        ?.filter(
                          (val: any) =>
                            val !== 'set' &&
                            val !== 'readonly' &&
                            val !== 'show'
                        )
                        ?.map((val: any, index: any) =>
                          index === 0
                            ? val.charAt(0).toUpperCase() + val.slice(1)
                            : val
                        )
                        .join(' ')}
                    </label>
                    <div className={`col-sm-10 text-left ${styles.inputFlex} `}>
                      <input
                        type="text"
                        className="form-control inputFields dark-blue"
                        name={val?.label}
                        id={val?.label}
                        disabled={val[setKey] === 0}
                        value={modalFieldValuesState[val?.label]}
                        onChange={handleModalFieldsChange}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          {getValues?.length > 0 ? (
            <div className="d-flex justify-content-start mt-3">
              <button
                type="button"
                className={`btn btn-blueColor ${styles.submit_btn}`}
                onClick={handleSubmit}
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
