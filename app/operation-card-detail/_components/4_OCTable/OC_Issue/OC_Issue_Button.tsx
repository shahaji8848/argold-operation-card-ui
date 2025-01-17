import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';
// import AutoCompleteField from './AutoCompleteField';
import POSTModalData from '@/services/api/operation-card-detail-page/modal-save';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';
import { Toast, ToastContainer } from 'react-bootstrap';

const OperationCardIssueButton = ({
  search,
  operationCardDetail,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardConcept,
  operationCardThickness,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextProductProcess,
  operationCardNextDesign,
  operationCardNextProductProcessDepartment,
  getOperationCardDetailDesignCodeCategoryAPICall,
  getOperationCardDetailDesignAPICall,
  getOperationCardDetailDesignCodeTypeAPICall,
  operationCardNextDesignCodeType,
  operationCardProductCategory,
  operationCardNextProductCategory,
  getOperationCardDetailNextProductCategoryAPICallFunc,
}: any) => {
  const checkArray = [
    'karigar',
    'next_karigar',
    'machine_size',
    'variant',
    'next_process',
    'concept',
    'thickness',
    'machine_category',
    'next_product_process',
    'design_code_category',
    'next_product_process_department',
    'next_product_category',
    'product',
    'product_category',
    'next_design',
    'next_design_code_type',
  ];

  const [show, setShow] = useState(false);
  const [showToastErr, setShowToastErr] = useState<boolean>(false);

  const [errMessage, setErrMessage] = useState<any>('');
  const [itemName, setItemName] = useState('');

  // Below State is to iterate over an array of objs to display fields inside the modal.
  const [getValues, setGetValues] = useState<any>([]);

  // Below State is to set the value of input fields inside the modal. These values are coming from OC Detail API.
  const [modalFieldValuesState, setModalFieldValuesState] = useState<any>({});

  // Below State is to create an object of dropdown values
  const [modalDropdownFields, setModalDropdownFields] = useState<any>({});

  const handleDropDownValuesChange = (labelValue: string, selectedValue: any) => {
    if (labelValue === 'next_karigar' || labelValue === 'karigar') {
      setModalDropdownFields({
        ...modalDropdownFields,
        [labelValue]: selectedValue?.value,
      });
    } else {
      setModalDropdownFields({
        ...modalDropdownFields,
        [labelValue]: selectedValue?.name,
      });
    }
  };

  // const handleSubmit = async () => {
  //   const mergedObjs = {
  //     ...modalFieldValuesState,
  //     ...modalDropdownFields,
  //     item: itemName,
  //   };
  //   // const callSaveAPI: any = await POSTModalData(search, mergedObjs);

  //   if (callSaveAPI?.status === 200) {
  //     operationCardDetail();
  //     handleClose();
  //   } else {
  //     handleClose();
  //     const parsedObject = JSON.parse(callSaveAPI?.response?.data?._server_messages);

  //     // Access the "message" property
  //     const messageValue = parsedObject[0] ? JSON.parse(parsedObject[0]).message : null;
  //     setErrMessage(messageValue);
  //     setShowToastErr(true);
  //   }
  // };
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
    const operationCardValue = operationCardProductDept?.issue_items?.filter((issueVal: any) => issueVal.item === value);

    const showKeys = Object.keys(operationCardValue[0]).filter((key) => key.startsWith('show'));
    const setKeys = Object.keys(operationCardValue[0]).filter((key) => key.startsWith('set'));

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

    let filterArray: any[];

    filterArray = resultArray?.filter((obj: any) => {
      const hasNonZeroShow = Object.keys(obj).some((key) => key.startsWith('show') && obj[key] !== 0);

      const hasNonZeroSet = Object.keys(obj).some((key) => key.startsWith('set') && obj[key] !== 0);

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

    const index = filterArray?.findIndex((obj: any) => obj.label === 'in_weight');

    // If 'in_weight' is found, move it to the front of the array
    if (index !== -1) {
      const inWeightObject = filterArray?.splice(index, 1)[0];
      filterArray?.unshift(inWeightObject);
    }

    setGetValues(filterArray);

    const getOperationCardDetailDataValue = operationCardDetailData?.operation_card_issue_details?.filter(
      (issueVal: any) => issueVal.item === value
    );

    getOperationCardDetailNextKarigarFunc(getOperationCardDetailDataValue[0]?.next_product_process_department);
    getOperationCardDetailNextProductProcessAPICallFunc();

    getOperationCardDetailNextProductProcessDepartmentAPICallFunc();

    getOperationCardDetailDesignCodeCategoryAPICall();

    getOperationCardDetailDesignAPICall();

    getOperationCardDetailDesignCodeTypeAPICall();

    getOperationCardDetailNextProductCategoryAPICallFunc();

    let alteredObjToCreateDataFields: any = {};
    let alteredObjToCreateDropDownFields: any = {};

    filterArray.forEach((item: any) => {
      const label = item?.label;

      if (!checkArray?.includes(label)) {
        alteredObjToCreateDataFields[label] = '';
      }

      if (checkArray?.includes(label)) {
        alteredObjToCreateDropDownFields[label] = '';
      }
    });

    setModalFieldValuesState(alteredObjToCreateDataFields);

    setModalDropdownFields(alteredObjToCreateDropDownFields);
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
                operationCardProductDept?.issue_items.map((val: any, i: any) => (
                  <button
                    type="button"
                    className={`btn btn-blue btn-py  mt-1 px-3 ms-2`}
                    onClick={() => handleShow(val.item)}
                    key={i}
                  >
                    {val?.item}
                  </button>
                ))}
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
                let propToPass: any;
                let funcData: any;
                const setKey: any = `set_${val.label.toLowerCase().replace(' ', '_')}`;

                const handleField = (val: any) => {
                  const propMappings: any = {
                    machine_size: operationCardMachineSize,
                    thickness: operationCardThickness,
                    variant: operationCardVariant,
                    karigar: operationCardKarigar,
                    concept: operationCardConcept,
                    next_karigar: operationCardNextKarigar,
                    next_design: operationCardNextDesign,
                    next_design_code_type: operationCardNextDesignCodeType,
                    design_code_category: operationCardDesignCodeCategory,
                    next_product_process: operationCardNextProductProcess,
                    next_product_process_department: operationCardNextProductProcessDepartment,
                    next_product_category: operationCardNextProductCategory,
                  };
                  propToPass = propMappings[val];
                  return propToPass;
                };
                funcData = handleField(val?.label);
                return (
                  <div className="col-md-4 " key={i}>
                    {checkArray?.includes(val?.label) ? (
                      <>
                        <label
                          htmlFor="staticEmail"
                          className={`${styles.labelFlex} col-sm-10 col-form-label dark-blue mt-2 font-weight-bold`}
                        >
                          {val?.label
                            ?.split('_')
                            ?.filter((val: any) => val !== 'set' && val !== 'readonly' && val !== 'show')
                            ?.map((val: any, index: any) => (index === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val))
                            .join(' ')}
                        </label>
                        {/* <AutoCompleteField
                          listOfDropdownObjs={funcData}
                          modalDropdownFieldsProp={modalDropdownFields}
                          handleDropDownValuesChange={handleDropDownValuesChange}
                          label={val?.label}
                        /> */}
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="staticEmail"
                          className={`${styles.labelFlex} col-sm-10 col-form-label dark-blue mt-2 font-weight-bold`}
                        >
                          {val?.label
                            ?.split('_')
                            ?.filter((val: any) => val !== 'set' && val !== 'readonly' && val !== 'show')
                            ?.map((val: any, index: any) => (index === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val))
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
                      </>
                    )}
                  </div>
                );
              })}
          </div>
          {getValues?.length > 0 ? (
            <div className="d-flex justify-content-start mt-3">
              <button type="button" className={`btn btn-blueColor ${styles.submit_btn}`} onClick={handleSubmit}>
                Save
              </button>
            </div>
          ) : (
            ''
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-end">
        <Toast onClose={() => setShowToastErr(false)} show={showToastErr} delay={5000} autohide bg="danger">
          <Toast.Body className="text-white">{errMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default OperationCardIssueButton;
