import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({ operationCardProductDept }: any) => {
  console.log('operationCardProductDept from master', operationCardProductDept);
  return (
    <div className="row spacing-mt">
      <div className="col-md-5">
        <OperationCardReceiptMaster
          operationCardProductDept={operationCardProductDept}
        />
      </div>
      <div className="col-md-7">
        <OperationCardIssueMaster
          operationCardProductDept={operationCardProductDept}
        />
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
