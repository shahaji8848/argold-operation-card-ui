import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = () => {
  return (
    <div className="container-fuild">
      <div className="row px-4">
        <div className="col-md-5">
          <OperationCardReceiptMaster />
        </div>
        <div className="col-md-7">
          <OperationCardIssueMaster />
        </div>
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
