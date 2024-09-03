import POSTModalData from '@/services/api/operation-card-detail-page/modal-save';
import { get_access_token } from '@/store/slice/login-slice';
import { useEffect, useRef, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import styles from '../../../../styles/operationDetail.module.css';
import AutoCompleteField from './AutoCompleteField';
import ModalSalesTable from './ModalSalesTable';
import { toast } from 'react-toastify';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import Link from 'next/link';
import GETValidationForDesign from '@/services/api/operation-card-detail-page/validation-for-design';
import MPReferenceModal from './MPReferenceModal';

const OperationCardIssueButton = ({
  headerSave,
  operationCardDetail,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardConcept,
  operationCardThickness,
  operationCardTone,
  operationCardVariant,
  operationCardMachine,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextProductProcess,
  onChangeOfProductFetchNextProductProcess,
  operationCardNextDesign,
  operationCardNextProductProcessDepartment,
  operationCardWorkerList,
  operationCardNextDesignCodeType,
  operationCardProductCategory,
  operationCardNextProductCategory,
  operationCardProduct,
  isBalanceWeightSetAsInWeight,
  balanceWeight,
  getOperationCardProductCategory,
  modalFieldsState,
  salesOrderList,
  bunchSalesOrderList,
  mpReferenceList,
}: any) => {
  const { token } = useSelector(get_access_token);

  const checkArray = [
    'karigar',
    'next_karigar',
    'machine',
    'machine_size',
    'variant',
    'tone',
    'next_process',
    'concept',
    'thickness',
    'machine_category',
    'next_product_process',
    'design_code_category',
    'next_product_process_department',
    'next_product_category',
    'gpc_product',
    'product_category',
    'next_design',
    'next_design_code_type',
    'worker',
    'machine',
    'product',
  ];

  const checkboxFieldsList: string[] = ['hold_order_details'];
  const [show, setShow] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);
  const [showToastErr, setShowToastErr] = useState<boolean>(false);
  const [emptyFieldsErr, setEmptyFieldsErr] = useState<boolean>(false);
  const [validationForDesignErr, setvalidationForDesignErr] = useState({ message: '', url: '' });

  const [errMessage, setErrMessage] = useState<string>('');
  const [itemName, setItemName] = useState('');
  const [selectedSalesOrderData, setSelectedSalesOrderData] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [initialValueForActiveField, setInitialValueForActiveField] = useState<any>({});

  // Below State is to iterate over an array of objs to display fields inside the modal.
  const [getValues, setGetValues] = useState<any>([]);
  const [selectedIssueBtnData, setSelectedIssueBtnData] = useState<any>({});

  const [mergedObjsState, setMergedObjsState] = useState<any>({});

  // Below State is to set the value of input fields inside the modal. These values are coming from OC Detail API.
  const [modalFieldValuesState, setModalFieldValuesState] = useState<any>({});
  const [meltingPlanReference, setMeltingPlanReference] = useState<any>('');

  // Below State is to create an object of dropdown values
  const [modalDropdownFields, setModalDropdownFields] = useState<any>({});
  const inputInWeightRef: any = useRef(null);

  const checkIfValuesAreEmpty = () => {
    const mergedObjs = {
      ...modalFieldValuesState,
      ...modalDropdownFields,
      item: itemName,
    };
  };
  const { validateInWeight } = useOperationDetailCard();
  const handleModalFieldsChange = (e: any) => {
    // console.log('merged e.target.value', e.target.name, e.target.checked);
    console.log('merged e.target.value', e.target.name);
    const { name, value, checked } = e.target;
    if (name === 'hold_order_details') {
      setModalFieldValuesState({
        ...modalFieldValuesState,
        [name]: checked ? 1 : 0,
      });
    } else {
      if (name === 'in_weight') {
        if (validateInWeight?.order_status === 0) {
          toast.error(validateInWeight?.message);
        } else {
          setModalFieldValuesState({
            ...modalFieldValuesState,
            [name]: value,
          });
        }
      } else if (name === 'customer') {
        setModalFieldValuesState({
          ...modalFieldValuesState,
          [name]: selectedCustomer,
        });
      } else {
        setModalFieldValuesState({
          ...modalFieldValuesState,
          [name]: value,
        });
      }
    }
  };

  const handleDropDownValuesChange = (labelValue: string, selectedValue: any) => {
    console.log('select dropdown values', labelValue, selectedValue);
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

  console.log('modal updated data', getValues);
  const { getValidationForDesign, validityForDesign, designInputValue, postSaveDesignInOP }: any = useOperationDetailCard();
  const handleSubmit = async () => {
    const hrefValue = window.location.href;
    const splitValue = hrefValue.split('=');

    const updateSalesTableData: any =
      selectedSalesOrderData?.length > 0 &&
      selectedSalesOrderData.map((orderData: any) => ({
        sales_order: orderData.sales_order,
        design: orderData.item_name,
      }));

    const mergedObjs = {
      ...modalFieldValuesState,
      ...modalDropdownFields,
      item: itemName,
      ...(selectedSalesOrderData?.length > 0 && { order_detail: updateSalesTableData }),
      ...(modalFieldValuesState.hasOwnProperty('customer') && { customer: selectedCustomer }), // Conditionally include 'customer'
    };
    console.log('mergedObjs data from modal to post', mergedObjs);
    const hasEmptyValue = Object?.values(mergedObjs).some((value) => value === '' || value === undefined);

    await postSaveDesignInOP();

    if (!hasEmptyValue) {
      setDisableSubmitBtn((prev) => !prev);

      try {
        const fetchValidationForDesign = await GETValidationForDesign(
          operationCardDetailData?.name,
          operationCardDetailData?.product_process_department,
          operationCardDetailData?.design || '',
          operationCardDetailData?.melting_lot,
          token
        );
        if (
          fetchValidationForDesign?.status === 200 &&
          Object.keys(fetchValidationForDesign?.data).length > 0 &&
          fetchValidationForDesign?.data?.message?.message === 'Please Fill Design in the Melting Plan.'
        ) {
          setvalidationForDesignErr(fetchValidationForDesign?.data?.message);
          // setErrMessage(fetchValidationForDesign?.data?.message?.message);
          // setShow(true);
          // setShowToastErr(true);
          setDisableSubmitBtn(true);
        } else {
          const callSaveAPI: any = await POSTModalData('issue', decodeURI(splitValue[1]), mergedObjs, token);
          console.log('api', callSaveAPI);
          if (callSaveAPI?.status === 200) {
            operationCardDetail();
            handleClose();
          } else {
            handleClose();
            const parsedObject = JSON.parse(callSaveAPI?.response?.data?._server_messages);
            const messageValue = parsedObject[0] ? JSON.parse(parsedObject[0]).message : null;
            setErrMessage(messageValue);
            setShowToastErr(true);
          }
        }
        // await getValidationForDesign();
        // console.log('validity for design', validityForDesign);
        // // Check if the validityForDesign message is the specific message
        // if (validityForDesign === 'Please Fill Design in the Melting Plan.') {
        // setErrMessage(validityForDesign);
        // setShow(true);
        // setShowToastErr(true);
        // setDisableSubmitBtn(false); // Re-enable the submit button after error
        // return; // Exit the function early if the condition is met
        // }

        // if (validityForDesign !== 'Please Fill Design in the Melting Plan.') {
        //   console.log('validity for design else', validityForDesign);
        // const callSaveAPI: any = await POSTModalData('issue', decodeURI(splitValue[1]), mergedObjs, token);
        // console.log('api', callSaveAPI);
        // if (callSaveAPI?.status === 200) {
        //   operationCardDetail();
        //   handleClose();
        // } else {
        //   handleClose();
        //   const parsedObject = JSON.parse(callSaveAPI?.response?.data?._server_messages);
        //   const messageValue = parsedObject[0] ? JSON.parse(parsedObject[0]).message : null;
        //   setErrMessage(messageValue);
        //   setShowToastErr(true);
        // }
        // }
      } catch (error) {
        setErrMessage('Some error occured while saving the entry');
      } finally {
        setDisableSubmitBtn((prev) => !prev);
        setEmptyFieldsErr(false);
      }
    } else {
      setEmptyFieldsErr(true);
    }
  };

  const handleClose = () => {
    setEmptyFieldsErr(false);
    setShow(false);
  };
  const handleShow = (value: any, add_melting_plan_reference_details: any) => {
    setShow(true);
    setItemName(value);

    const operationCardValue = operationCardProductDept?.issue_items?.filter((issueVal: any) => issueVal.item === value);

    setMeltingPlanReference(add_melting_plan_reference_details);

    // Find a specific item object in operationCardDetailData, with specific logic for "hook"
    const getSelectedItemObj: any = operationCardDetailData?.operation_card_issue_details?.find((issueItem: any) => {
      // Check if the value is "hook"
      console.log('value', value);
      if (value === 'Hook') {
        // If value is "hook", check if the item starts with "Hook"
        return issueItem?.item?.startsWith('Hook');
      } else {
        // For all other values, perform the standard equality check
        return issueItem?.item === value;
      }
    });
    console.log('getSelectedItemObj', getSelectedItemObj);
    // const getSelectedItemObj: any = operationCardDetailData?.operation_card_issue_details?.find(
    //   (issueItem: any) => issueItem?.item === value
    // );

    setSelectedIssueBtnData(getSelectedItemObj);
    let initialValuesOfSelectedItem: any = {};
    if (getSelectedItemObj) {
      // replace next_product_process with word key to get initialValues of all dropdowns.
      if (getSelectedItemObj?.hasOwnProperty('next_product_process')) {
        initialValuesOfSelectedItem['next_product_process'] = getSelectedItemObj['next_product_process'];
        setModalDropdownFields((prevFields: any) => ({
          ...prevFields,
          next_product_process: getSelectedItemObj?.next_product_process,
        }));
      }
    }
    setInitialValueForActiveField(initialValuesOfSelectedItem);

    const showKeys = Object.keys(operationCardValue[0]).filter((key) => key.startsWith('show'));
    const setKeys = Object.keys(operationCardValue[0]).filter((key) => key.startsWith('set'));

    const resultArray = groupByKeyWords(showKeys, setKeys);
    console.log('resultArray', resultArray);

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
    console.log('result array', resultArray);

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

    console.log('modal filterArray zero set show', storeNonZeroSetAndShow);

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

    // Below changes are just for Product KA Chain and Dept Hammering 2 as requested by Vijay Sir from AR Gold.
    // (This is some condition according to factory for KA Chain only).

    if (operationCardDetailData?.product === 'KA Chain' && operationCardDetailData?.operation_department === 'Hammering 2') {
      if (headerSave?.tone === '2 Tone') {
        filterArray = filterArray.filter((obj) => obj.label !== 'next_product_process');
      }
    }

    const index = filterArray?.findIndex((obj: any) => obj.label === 'in_weight');

    // If 'in_weight' is found, move it to the start of the array
    if (index !== -1) {
      const inWeightObject = filterArray?.splice(index, 1)[0];
      filterArray?.unshift(inWeightObject);
    }

    setGetValues(filterArray);

    const getOperationCardDetailDataValue = operationCardDetailData?.operation_card_issue_details?.filter(
      (issueVal: any) => issueVal.item === value
    );

    let alteredObjToCreateDataFields: any = {};
    let alteredObjToCreateDropDownFields: any = {};

    filterArray.forEach((item: any) => {
      const label = item?.label;
      console.log('item', item);

      if (!checkArray?.includes(label)) {
        if (value === 'Unrecoverable Loss' && isBalanceWeightSetAsInWeight && label === 'in_weight') {
          alteredObjToCreateDataFields['in_weight'] = balanceWeight;
        } else if (label === 'hold_order_details') {
          alteredObjToCreateDataFields[label] = 0;
        } else {
          alteredObjToCreateDataFields[label] = '';
        }
      }

      if (checkArray?.includes(label)) {
        if (getSelectedItemObj?.hasOwnProperty('next_product_process') && label === 'next_product_process') {
          alteredObjToCreateDropDownFields[label] = getSelectedItemObj['next_product_process'];
        } else {
          alteredObjToCreateDropDownFields[label] = '';
        }
      }
    });

    setModalFieldValuesState(alteredObjToCreateDataFields);

    setModalDropdownFields(alteredObjToCreateDropDownFields);
  };
  let funcData: any;
  let setKey: any;
  const propertiesToCheck: string[] = ['label', 'show_in_weight', 'set_in_weight'];

  useEffect(() => {
    inputInWeightRef.current?.focus();
  }, [show]);

  return (
    <div>
      <div className={`row ${styles.mob_wrapper} `}>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3">
          <span className="bold">Issue :</span>
        </div>
        <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 ">
          <div className=" row btn_wrapper_end">
            <div className={`col-md-12 text-end ${styles.btn_wrapper_mob}`}>
              {operationCardProductDept?.issue_items?.length > 0 &&
                operationCardProductDept?.issue_items.map((val: any, i: any) => (
                  <button
                    type="button"
                    className={`btn btn-blue btn-py  mt-1 px-3 ms-2`}
                    onClick={() => handleShow(val.item, val?.add_melting_plan_reference_details)}
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
          <h6 className="">Item: {itemName}</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between "></div>
          <div className="row" style={{ backgroundColor: '2px solid red' }}>
            {getValues?.length > 0 &&
              getValues?.map((val: any, i: any) => {
                console.log('val label', val);
                let propToPass: any;

                setKey =
                  'label' in val ||
                  'show_in_weight' in val ||
                  ('set_in_weight' in val && `set_${val.label?.toLowerCase()?.replace(' ', '_')}`);

                const handleField = (val: any) => {
                  const propMappings: any = {
                    machine: operationCardMachine,
                    machine_size: operationCardMachineSize,
                    thickness: operationCardThickness,
                    variant: operationCardVariant,
                    tone: operationCardTone,
                    karigar: operationCardKarigar,
                    concept: operationCardConcept,
                    next_karigar: operationCardNextKarigar,
                    next_design: operationCardNextDesign,
                    next_design_code_type: operationCardNextDesignCodeType,
                    design_code_category: operationCardDesignCodeCategory,
                    next_process: operationCardNextProductProcess,
                    next_product_process: operationCardNextProductProcess,
                    next_product_process_department: operationCardNextProductProcessDepartment,
                    product_category: operationCardProductCategory,
                    next_product_category: operationCardNextProductCategory,
                    gpc_product: operationCardProduct,
                    worker: operationCardWorkerList,
                    product: operationCardProduct,
                  };
                  propToPass = propMappings[val];
                  return propToPass;
                };
                funcData = handleField(val?.label);

                return (
                  <div className="col-md-4 " key={i}>
                    {checkArray?.includes(val?.label) ? (
                      <div>
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
                          getOperationCardNextProductProcess={onChangeOfProductFetchNextProductProcess}
                          getOperationCardProductCategory={getOperationCardProductCategory}
                          handleSubmit={handleSubmit}
                          label={val?.label}
                          initialValue={initialValueForActiveField[val?.label]}
                          isReadOnly={false}
                          operationCardDetailData={operationCardDetailData}
                        />
                      </div>
                    ) : checkboxFieldsList?.includes(val?.label) ? (
                      <div className="checkbox-wrapper-mt ">
                        <input
                          type="checkbox"
                          id={val?.label}
                          name={val?.label}
                          value={modalFieldValuesState[val?.label]}
                          onChange={handleModalFieldsChange}
                          disabled={validateInWeight?.order_status === 0}
                        />
                        <label
                          htmlFor="staticEmail"
                          className={`${styles.labelFlex} col-sm-10 col-form-label dark-blue mt-2 font-weight-bold ps-1`}
                        >
                          {val?.label
                            ?.split('_')
                            ?.filter((val: any) => val !== 'set' && val !== 'readonly' && val !== 'show')
                            ?.map((val: any, index: any) => (index === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val))
                            .join(' ')}
                        </label>
                      </div>
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
                        <div className={` text-left ${styles.inputFlex} `}>
                          <input
                            type="text"
                            className="form-control inputFields dark-blue input_in_weight"
                            name={val?.label}
                            id={val?.label}
                            // ref={inputInWeightRef}
                            ref={i === 0 ? inputInWeightRef : null}
                            disabled={val[setKey] === 0}
                            value={val?.label === 'customer' ? selectedCustomer : modalFieldValuesState[val?.label]}
                            onChange={handleModalFieldsChange}
                            onKeyDown={(e: any) => {
                              if (e.key === 'Enter') {
                                handleSubmit();
                              }
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>

          {selectedIssueBtnData?.item && selectedIssueBtnData?.item === 'Customer' && salesOrderList?.length > 0 && (
            <>
              <ModalSalesTable
                salesOrderList={salesOrderList}
                selectedSalesOrderData={selectedSalesOrderData}
                setSelectedSalesOrderData={setSelectedSalesOrderData}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                operationCardDetailData={operationCardDetailData}
              />
            </>
          )}

          {selectedIssueBtnData?.item && selectedIssueBtnData?.item === 'Bunch' && bunchSalesOrderList?.length > 0 && (
            <>
              <ModalSalesTable
                salesOrderList={bunchSalesOrderList}
                selectedSalesOrderData={selectedSalesOrderData}
                setSelectedSalesOrderData={setSelectedSalesOrderData}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                operationCardDetailData={operationCardDetailData}
              />
            </>
          )}

          {selectedIssueBtnData?.item && selectedIssueBtnData?.item_type === 'Gold Accessory' && meltingPlanReference === 1 && (
            <MPReferenceModal mpReferenceList={mpReferenceList} />
          )}

          {getValues?.length > 0 ? (
            <div className="d-flex justify-content-start mt-3">
              <button
                type="button"
                className={`btn btn-blueColor ${styles.submit_btn}`}
                onClick={handleSubmit}
                disabled={disableSubmitBtn}
              >
                Save
              </button>
            </div>
          ) : (
            ''
          )}
          {validationForDesignErr.message !== '' && (
            <p className="mt-3">
              <span className="mt-5 text-danger">
                {validationForDesignErr?.message}After filling it please refresh the Operation Card.
              </span>
              <p></p>
              <Link href={`${validationForDesignErr?.url}`} className="text-decoration-underline" target="_blank">
                Go to Melting Plan
              </Link>
            </p>
          )}
          {emptyFieldsErr && <p className="mt-3 text-danger">Please fill all the fields</p>}
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
