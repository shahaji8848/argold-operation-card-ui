import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({
  operationCardProductDept,
  operationCardDetailData,
}: any) => {
  return (
    <div className="row spacing-mt">
      <div className="col-md-5">
        <OperationCardReceiptMaster
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
        />
      </div>
      <div className="col-md-7">
        <OperationCardIssueMaster
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
        />
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
