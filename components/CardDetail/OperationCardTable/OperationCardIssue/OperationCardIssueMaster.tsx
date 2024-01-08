import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  console.log(
    'operationCardProductDept from OperationCardIssueMaster',
    operationCardProductDept
  );
  return (
    <>
      <OperationCardIssueButton
        operationCardProductDept={operationCardProductDept}
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
