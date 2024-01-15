import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({
  search,
  operationCardDetail,
  getOperationCardDetailNextKarigarFunc,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
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
          getOperationCardDetailNextKarigarFunc={
            getOperationCardDetailNextKarigarFunc
          }
          operationCardDetail={operationCardDetail}
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
          operationCardKarigar={operationCardKarigar}
          operationCardNextKarigar={operationCardNextKarigar}
          operationCardConcept={operationCardConcept}
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
