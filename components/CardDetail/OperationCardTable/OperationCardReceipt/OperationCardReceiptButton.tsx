import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import Modal from 'react-bootstrap/Modal';
import POSTModalData from '@/services/api/operation-card-detail-page/modal-save';
import AutoCompleteField from '../OperationCardIssue/AutoCompleteField';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';
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

  const handleDropDownValuesChange = (
    labelValue: string,
    selectedValue: any
  ) => {
    // console.log('k', labelValue, selectedValue);
    setModalDropdownFields({
      ...modalDropdownFields,
      [labelValue]: selectedValue?.name,
    });
  };

  const handleSubmit = async () => {
    const hrefValue = window.location.href;
    const splitValue = hrefValue.split('=');
    const mergedObjs = {
      ...modalFieldValuesState,
      ...modalDropdownFields,
      item: itemName,
    };
    const callSaveAPI: any = await POSTModalData(
      'receipt',
      decodeURI(splitValue[1]),
      mergedObjs,
      token
    );
    if (callSaveAPI?.status === 200) {
      operationCardDetail();
      handleClose();
    } else {
      handleClose();
      const parsedObject = JSON.parse(
        callSaveAPI?.response?.data?._server_messages
      );

      // Access the "message" property
      const messageValue = parsedObject[0]
        ? JSON.parse(parsedObject[0]).message
        : null;
      setErrMessage(messageValue);
      setShowToastErr(true);
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

    const modalObj: IModalFields = {
      show_in_weight: 1,
      set_in_weight: 1,
      label: 'in_weight',
    };

    setGetValues([modalObj]);
    console.log('getvalues', getValues);
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
          <div className="row">
            {getValues?.length > 0 &&
              getValues?.map((val: any, i: any) => {
                let propToPass: any;
                let funcData: any;
                const setKey: any = `set_${val.label
                  .toLowerCase()
                  .replace(' ', '_')}`;

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
                    next_product_process_department:
                      operationCardNextProductProcessDepartment,
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
                        <AutoCompleteField
                          listOfDropdownObjs={funcData}
                          modalDropdownFieldsProp={modalDropdownFields}
                          handleDropDownValuesChange={
                            handleDropDownValuesChange
                          }
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
                        <div
                          className={`col-sm-10 text-left ${styles.inputFlex} `}
                        >
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
