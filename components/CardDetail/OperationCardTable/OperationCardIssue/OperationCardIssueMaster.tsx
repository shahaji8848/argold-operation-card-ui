import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({ operationCardProductDept }: any) => {
  console.log(
    'operationCardProductDept from OperationCardIssueMaster',
    operationCardProductDept
  );
  return (
    <>
      <OperationCardIssueButton
        operationCardProductDept={operationCardProductDept}
      />
      <OperationCardIssueItem />
    </>
  );
};

export default OperationCardIssueMaster;
