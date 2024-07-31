import React from 'react';
import OperationCardHeader from './OperationCardHeader';

const OperationCardHeaderMaster = ({ operationCardDetailData, handleOperationCardSave, handleOperationCardApproval }: any) => {
  return (
    <>
      <OperationCardHeader
        operationCardDetailData={operationCardDetailData}
        handleOperationCardSave={handleOperationCardSave}
        handleOperationCardApproval={handleOperationCardApproval}
      />
    </>
  );
};

export default OperationCardHeaderMaster;
