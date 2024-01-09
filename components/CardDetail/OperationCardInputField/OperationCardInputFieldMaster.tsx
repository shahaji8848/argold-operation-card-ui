import React from 'react';
import SelectKarigar from './SelectKarigar';

const OperationCardInputFieldMaster = ({ operationCardKarigar }: any) => {
  return (
    <div className="d-flex  spacing-mt ">
      <div className="col-md-12 border  rounded-3">
        <SelectKarigar operationCardKarigar={operationCardKarigar} />
      </div>
    </div>
  );
};

export default OperationCardInputFieldMaster;
