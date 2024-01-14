import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({
  search,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardThickness,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
}: any) => {
  console.log('modal machine size', operationCardMachineSize);
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
          search={search}
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
          operationCardKarigar={operationCardKarigar}
          operationCardThickness={operationCardThickness}
          operationCardVariant={operationCardVariant}
          operationCardMachineSize={operationCardMachineSize}
          operationCardDesignCodeCategory={operationCardDesignCodeCategory}
        />
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
