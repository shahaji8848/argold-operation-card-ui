import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardReceiptButton from './OperationCardReceiptButton';

const OperationCardReceiptMaster = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  return (
    <>
      <OperationCardReceiptButton
        operationCardProductDept={operationCardProductDept}
      />
      <div className="mt-2">
        <OperationCardReceiptItem
          operationCardDetailData={operationCardDetailData}
        />
      </div>
    </>
  );
};

export default OperationCardReceiptMaster;
