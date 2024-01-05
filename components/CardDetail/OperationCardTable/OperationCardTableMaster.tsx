import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({ operationCardProductDept }: any) => {
  console.log('operationCardProductDept from master', operationCardProductDept);
  return (
    <div className="container">
      <div className="row  mt-3">
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
    </div>
  );
};

export default OperationCardTableMaster;
