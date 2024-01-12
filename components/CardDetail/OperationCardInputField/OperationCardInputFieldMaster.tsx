import React from 'react';
import SelectKarigar from './SelectKarigar';

const OperationCardInputFieldMaster = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardThickness,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
}: any) => {
  return (
    <div className="d-flex  spacing-mt ">
      <div className="col-md-12 border  rounded-3">
        <SelectKarigar
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
          operationCardKarigar={operationCardKarigar}
        />
      </div>
    </div>
  );
};

export default OperationCardInputFieldMaster;
