import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import React from 'react';

const UnEditableOperationCardFields = ({ operationCardFieldValue, editableFieldsList }: any) => {
  // const { designInputValue } = useOperationDetailCard();

  return (
    <>
      {operationCardFieldValue.length > 0 &&
        operationCardFieldValue.map(([key, values]: any, index: number) => {
          return (
            <>
              {!editableFieldsList?.includes(key) ? (
                <>
                  <div className="col-md-2 p-0 m-0" key={index}>
                    <div>
                      <div className="fs-14 bold text-start">
                        {key
                          .split('_')
                          .map((val: any, index: any) => {
                            return index === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val;
                          })
                          .join(' ')}
                      </div>
                      <div className="fs-14 ">
                        <input
                          type="text"
                          className="form-control dark-blue operationCardinputFields"
                          id="inputText"
                          value={values}
                          // value={key === 'design' ? designInputValue?.design : values}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
    </>
  );
};

export default UnEditableOperationCardFields;
