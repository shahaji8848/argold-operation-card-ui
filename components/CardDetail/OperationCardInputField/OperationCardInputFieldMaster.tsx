import React from 'react';
import SelectKarigar from './SelectKarigar';

const OperationCardInputFieldMaster = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  return (
    <div className="d-flex  spacing-mt ">
      <div className="col-md-12 border  rounded-3">
        <SelectKarigar
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
        />
      </div>
    </div>
  );
};

export default OperationCardInputFieldMaster;
