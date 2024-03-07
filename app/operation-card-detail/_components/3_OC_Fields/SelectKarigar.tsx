import React, { useEffect, useState } from 'react';
import useInputAutoComplete from '@/hooks/input_auto_complete_hook';
import useKarigarList from '@/hooks/karigar-list-hook';

const OCFieldsData = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardKarigarQuantitySettings,
  handleHeaderSave,
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

  const operationCardDetailDataKarigar = operationCardDetailData?.karigar ?? '';
  const {
    setOptionValue,
    setCheck,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showFilteredValuesHandler,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
  } = useKarigarList(operationCardKarigar, operationCardDetailDataKarigar);

  console.log(
    'operationCardKarigarQuantitySettings',
    operationCardKarigarQuantitySettings
  );

  return (
    <div className={`row text-center  py-2 mx-2 gap-3`}>
      <div className="col-md-2 p-0 m-0">
        <div className="fs-14 bold text-start">Karigar</div>
        <div className="fs-14 ">
          <div className="position-relative ">
            <input
              type="text"
              value={inputValueAutoComplete}
              className={`form-control w-100`}
              autoComplete="off"
              onChange={(e) => {
                setInputValueAutoComplete(e.target.value);
                showFilteredValuesHandler();
                handleHeaderSave('karigar', e.target.value);
              }}
              onFocus={() => {
                showFilteredValuesHandler();
              }}
              ref={inputRef}
            />

            {operationCardKarigarQuantitySettings?.set_karigar === 1 ? (
              <div>
                {showSuggestionsAutoComplete &&
                  filteredSuggestionsAutoComplete.length > 0 && (
                    <div
                      className="position-absolute w-100 scrollbar "
                      style={{
                        border: '1px solid #ccc',
                        height: '150px',
                        overflowY: 'auto',
                        background: 'white',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                        zIndex: '4',
                      }}
                    >
                      {filteredSuggestionsAutoComplete?.map(
                        (suggestion: any, index: number) => (
                          <div
                            key={index}
                            onClick={() => {
                              handleSuggestionClickAutoComplete(suggestion);
                              handleHeaderSave('karigar', suggestion?.value);
                            }}
                            style={{
                              cursor: 'pointer',
                              padding: '7px',
                              fontWeight: 'bold',
                            }}
                            className="fileredValue-hover force-overflow"
                            id="style-2"
                          >
                            {suggestion?.value}
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {operationCardFieldValue.length > 0 &&
        operationCardFieldValue.map(([key, values]: any, index: number) => {
          return (
            <div className="col-md-2 p-0 m-0" key={index}>
              <div className="fs-14 bold text-start">Quantity</div>
              <div className="fs-14 ">
                <input
                  type="text"
                  className="form-control dark-blue operationCardinputFields"
                  id="inputText"
                  value={operationCardDetailData?.quantity}
                  readOnly={
                    operationCardKarigarQuantitySettings?.set_quantity !== 1
                      ? true
                      : false
                  }
                  onChange={(e: any) =>
                    handleHeaderSave('quantity', e.target.value)
                  }
                />
              </div>
              {key !== 'karigar' && key !== 'quantity' ? (
                <div>
                  {' '}
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
                      value={values}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default OCFieldsData;
