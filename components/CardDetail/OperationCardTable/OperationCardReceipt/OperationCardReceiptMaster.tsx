import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardReceiptButton from './OperationCardReceiptButton';

const OperationCardReceiptMaster = ({ operationCardProductDept }: any) => {
  return (
    <>
      <OperationCardReceiptButton
        operationCardProductDept={operationCardProductDept}
      />
      <OperationCardReceiptItem />
    </>
  );
};

export default OperationCardReceiptMaster;
