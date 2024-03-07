import React from 'react';
import OperationCardHeader from './OperationCardHeader';

const OperationCardHeaderMaster = ({
  operationCardDetailData,
  handleOperationCardSave,
}: any) => {
  return (
    <>
      <OperationCardHeader
        operationCardDetailData={operationCardDetailData}
        handleOperationCardSave={handleOperationCardSave}
      />
    </>
  );
};

export default OperationCardHeaderMaster;
