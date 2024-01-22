import React from 'react';
import SelectKarigar from './SelectKarigar';

const OperationCardInputFieldMaster = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardKarigarQuantitySettings,
  handleHeaderSave,
}: any) => {
  return (
    <div className="d-flex  spacing-mt ">
      <div className="col-md-12 border  rounded-3">
        <SelectKarigar
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
          operationCardKarigar={operationCardKarigar}
          operationCardKarigarQuantitySettings={
            operationCardKarigarQuantitySettings
          }
          handleHeaderSave={handleHeaderSave}
        />
      </div>
    </div>
  );
};

export default OperationCardInputFieldMaster;
