import React, { use, useEffect, useState } from 'react';
import styles from '../../../styles/operationDetail.module.css';
import { dataVal } from '../../../app/dataSet/operationCardProcessDept';
import useInputAutoComplete from '@/hooks/input_auto_complete_hook';

const SelectKarigar = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
}: any) => {
  const [operationCardFieldVal, setOperationCardFieldVal] = useState([
    operationCardDetailData,
  ]);
  const operationCardFields: any = Object?.entries(operationCardProductDept)
    .filter(([key, value]) => key.includes('show') && value === 1)
    .map(([key, value]) => key.replace('show_', ''));

  const operationCardFieldValue = Object.entries(
    operationCardDetailData
  ).filter(([key, value]) => operationCardFields.includes(key));

  // function extractMatchingValues(obj: any, keys: any) {
  //   console.log(keys, 'keys');
  //   return Object.entries(obj).filter(([key]) => keys.includes(key));
  // }

  // const matchingValues = extractMatchingValues(
  //   operationCardDetailData,
  //   operationCardFields
  // )

  const {
    setOptionValue,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showSuggestionsAutoCompleteHandlerAutoComplete,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
  } = useInputAutoComplete();

  console.log(operationCardFieldValue, 'operationCardFieldValue');

  const [field, setField] = useState('');

  console.log('operationCardKarigar', operationCardKarigar);

  const fieldData: any = operationCardKarigar.map(
    (karigar_item: any, index: any) => {
      return karigar_item?.name;
    }
  );
  console.log('fieldData', fieldData);
  useEffect(() => {
    const fieldData = operationCardKarigar.map(
      (karigar_item: any) => karigar_item?.name
    );
    setOptionValue(fieldData);
    setField(fieldData);
  }, [operationCardKarigar]);

  return (
    <div className={`row   text-center  py-2 mx-2 gap-3`}>
      <div className="col-md-2 p-0 m-0">
        <div className="fs-14 bold text-start">Karigar</div>
        <div className="fs-14 ">
          <div className="position-relative">
            <input
              type="text"
              id={field}
              // value={field}
              value={inputValueAutoComplete}
              // className={`form-control w-100`}
              className={`form-control w-100 ${
                // missingFields &&
                // missingFields.length > 0 &&
                // missingFields.includes(field.fieldname) &&
                // mandatory &&
                !field ? 'is-invalid' : ''
              }`}
              autoComplete="off"
              onChange={(e) => {
                setInputValueAutoComplete(e.target.value);
                // setinputValueAutoCompleteData(e.target.value);
                showSuggestionsAutoCompleteHandlerAutoComplete();
                // setField(e.target.value);
                // handleInputChange(field.fieldname, e.target.value);
              }}
              onFocus={showSuggestionsAutoCompleteHandlerAutoComplete}
              ref={inputRef}
              // required={mandatory === 1 ? true : false}
            />
            {/* {
              // missingFields &&
              // missingFields.length > 0 &&
              // missingFields.includes(field.fieldname) &&
              // mandatory &&
              !field ? (
                <div className="invalid-feedback">
                  {'This field is required.'}
                </div>
              ) : null
            } */}

            {showSuggestionsAutoComplete &&
              filteredSuggestionsAutoComplete.length > 0 && (
                <div
                  className="position-absolute w-100"
                  style={{
                    border: '1px solid #ccc',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    background: 'white',
                  }}
                >
                  {filteredSuggestionsAutoComplete.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSuggestionClickAutoComplete(suggestion);
                        // handleInputChange(field.fieldname, suggestion);
                      }}
                      style={{ cursor: 'pointer', padding: '5px' }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
      {operationCardFieldValue.length > 0 &&
        operationCardFieldValue.map(([key, values]: any, index: number) => (
          <div className="col-md-2 p-0 m-0" key={index}>
            <div className="fs-14 bold text-start">
              {key
                .split('_')
                .map((val: any, index: any) => {
                  return index === 0
                    ? val.charAt(0).toUpperCase() + val.slice(1)
                    : val;
                })
                .join(' ')}
            </div>
            <div className="fs-14 ">
              <input
                type="text"
                className="form-control dark-blue operationCardinputFields"
                id="inputText"
                placeholder={key
                  .split('_')
                  .map((val: any, index: any) => {
                    return index === 0
                      ? val.charAt(0).toUpperCase() + val.slice(1)
                      : val;
                  })
                  .join(' ')}
                value={values}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SelectKarigar;
