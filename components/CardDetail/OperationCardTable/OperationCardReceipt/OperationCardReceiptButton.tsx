import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';
import POSTModalData from '@/services/api/operation-card-detail-page/modal-save';
import AutoCompleteField from '../OperationCardIssue/AutoCompleteField';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
interface IModalFields {
  show_in_weight: number;
  set_in_weight: number;
  label: string;
}

const OperationCardReciptButton = ({
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
  operationCardNextProductProcessDepartment,
}: any) => {
  const { token } = useSelector(get_access_token);
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
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);

  const [showToastErr, setShowToastErr] = useState<boolean>(false);

  const [errMessage, setErrMessage] = useState<any>('');
  const [itemName, setItemName] = useState('');

  // Below State is to iterate over an array of objs to display fields inside the modal.
  const [getValues, setGetValues] = useState<any>([]);

  // Below State is to set the value of input fields inside the modal. These values are coming from OC Detail API.
  const [modalFieldValuesState, setModalFieldValuesState] = useState<any>({
    in_weight: '',
  });

  // Below State is to create an object of dropdown values
  const [modalDropdownFields, setModalDropdownFields] = useState<any>({});

  const handleDropDownValuesChange = (labelValue: string, selectedValue: any) => {
    //
    setModalDropdownFields({
      ...modalDropdownFields,
      [labelValue]: selectedValue?.name,
    });
  };

  const handleSubmit = async () => {
    setDisableSubmitBtn((prev) => !prev);
    const hrefValue = window.location.href;
    const splitValue = hrefValue.split('=');
    const mergedObjs = {
      ...modalFieldValuesState,
      ...modalDropdownFields,
      item: itemName,
    };
    try {
      const callSaveAPI: any = await POSTModalData('receipt', decodeURI(splitValue[1]), mergedObjs, token);
      if (callSaveAPI?.status === 200) {
        operationCardDetail();
        handleClose();
        if (callSaveAPI?.data?.message?.msg === 'success') {
          toast.success(callSaveAPI?.data?.message?.data?.success_msg);
        } else {
          toast.error(callSaveAPI?.data?.message?.error);
        }
      } else {
        handleClose();
        const parsedObject = JSON.parse(callSaveAPI?.response?.data?._server_messages);

        // Access the "message" property
        const messageValue = parsedObject[0] ? JSON.parse(parsedObject[0]).message : null;
        setErrMessage(messageValue);
        setShowToastErr(true);
      }
    } catch (error) {
      setErrMessage('Some error occured while saving the entry');
    } finally {
      setDisableSubmitBtn((prev) => !prev);
    }
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

    const operationCardValue = operationCardProductDept?.receipt_items?.filter((receiptVal: any) => receiptVal.item === value);
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

        groupedKeys[keyword][key] = operationCardValue[0][key];
      });

      return Object.values(groupedKeys);
    }

    let filterArray: any[];
    let storeNonZeroSetAndShow: any;

    filterArray = resultArray?.filter((obj: any) => {
      const hasNonZeroShow = Object.keys(obj).some((key) => key.startsWith('show') && obj[key] !== 0);

      const hasNonZeroSet = Object.keys(obj).some(
        (key) =>
          key.startsWith('set') &&
          key !== 'set_fine_purity_based_on_tounch_purity' &&
          key !== 'set_operation_card_balance_weight_as_in_weight' &&
          key !== 'set_line_number' &&
          obj[key] !== 0
      );
      storeNonZeroSetAndShow = [hasNonZeroSet, hasNonZeroShow];

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

    const modalObj: IModalFields = {
      show_in_weight: 1,
      set_in_weight: 1,
      label: 'in_weight',
    };

    filterArray = [...filterArray, modalObj]

    const index = filterArray?.findIndex((obj: any) => obj.label === 'in_weight');

    // If 'in_weight' is found, move it to the start of the array
    if (index !== -1) {
      const inWeightObject = filterArray?.splice(index, 1)[0];
      filterArray?.unshift(inWeightObject);
    }

    setGetValues(filterArray);
  };


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
                operationCardProductDept?.receipt_items.map((val: any, i: any) => {
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
                  );
                })}
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
                    design_code_category: operationCardDesignCodeCategory,
                    next_product_process: operationCardNextProductProcess,
                    next_product_process_department: operationCardNextProductProcessDepartment,
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
                        <AutoCompleteField
                          listOfDropdownObjs={funcData}
                          modalDropdownFieldsProp={modalDropdownFields}
                          handleDropDownValuesChange={handleDropDownValuesChange}
                          label={val?.label}
                        />
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
              <button
                type="button"
                className={`btn btn-blueColor ${styles.submit_btn} `}
                onClick={handleSubmit}
                disabled={disableSubmitBtn}
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
