import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  search,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardThickness,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
}: any) => {
  return (
    <>
      <OperationCardIssueButton
        search={search}
        operationCardProductDept={operationCardProductDept}
        operationCardDetailData={operationCardDetailData}
        operationCardKarigar={operationCardKarigar}
        operationCardThickness={operationCardThickness}
        operationCardVariant={operationCardVariant}
        operationCardMachineSize={operationCardMachineSize}
        operationCardDesignCodeCategory={operationCardDesignCodeCategory}
      />
      <div className="mt-2">
        <OperationCardIssueItem
          operationCardDetailData={operationCardDetailData}
        />
      </div>
    </>
  );
};

export default OperationCardIssueMaster;
