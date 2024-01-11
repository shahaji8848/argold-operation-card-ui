import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  return (
    <>
      <OperationCardIssueButton
        operationCardProductDept={operationCardProductDept}
        operationCardDetailData={operationCardDetailData}
      />
      <div className="mt-2">
        <OperationCardIssueItem
          operationCardDetailData={operationCardDetailData}
        />
      </div>
    </>
  );
};

export default OperationCardIssueMaster;
