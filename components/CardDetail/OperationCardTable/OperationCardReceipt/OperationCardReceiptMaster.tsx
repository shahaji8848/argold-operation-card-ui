import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardReceiptButton from './OperationCardReceiptButton';

const OperationCardReceiptMaster = ({ operationCardProductDept }: any) => {
  return (
    <>
      <OperationCardReceiptButton
        operationCardProductDept={operationCardProductDept}
      />
      <div className='mt-2'>
      <OperationCardReceiptItem />
      </div>
 
    </>
  );
};

export default OperationCardReceiptMaster;
