import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  search,
  headerSave,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardDetail,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
  operationCardTone,
  operationCardVariant,
  operationCardMachine,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextDesign,
  operationCardNextProductProcess,
  operationCardWorkerList,
  operationCardNextProductProcessDepartment,
  getOperationCardDetailDesignCodeCategoryAPICall,
  getOperationCardDetailDesignAPICall,
  getOperationCardDetailDesignCodeTypeAPICall,
  operationCardNextDesignCodeType,
  operationCardProductCategory,
  getOperationCardProductCategory,
  operationCardNextProductCategory,
  getOperationCardDetailNextProductCategoryAPICallFunc,
  operationCardProduct,
  isBalanceWeightSetAsInWeight,
  balanceWeight,
  modalFieldsState,
  operationCardMachine,
}: any) => {
  return (
    <>
      <OperationCardIssueButton
        search={search}
        headerSave={headerSave}
        operationCardDetail={operationCardDetail}
        getOperationCardDetailNextKarigarFunc={getOperationCardDetailNextKarigarFunc}
        getOperationCardDetailNextProductProcessAPICallFunc={getOperationCardDetailNextProductProcessAPICallFunc}
        getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
          getOperationCardDetailNextProductProcessDepartmentAPICallFunc
        }
        getOperationCardProductCategory={getOperationCardProductCategory}
        operationCardProductDept={operationCardProductDept}
        operationCardDetailData={operationCardDetailData}
        operationCardKarigar={operationCardKarigar}
        operationCardConcept={operationCardConcept}
        operationCardNextKarigar={operationCardNextKarigar}
        operationCardThickness={operationCardThickness}
        operationCardTone={operationCardTone}
        operationCardVariant={operationCardVariant}
        operationCardWorkerList={operationCardWorkerList}
        operationCardMachine={operationCardMachine}
        operationCardMachineSize={operationCardMachineSize}
        operationCardNextDesign={operationCardNextDesign}
        operationCardDesignCodeCategory={operationCardDesignCodeCategory}
        operationCardNextProductProcess={operationCardNextProductProcess}
        operationCardProduct={operationCardProduct}
        operationCardNextProductProcessDepartment={operationCardNextProductProcessDepartment}
        getOperationCardDetailDesignCodeCategoryAPICall={getOperationCardDetailDesignCodeCategoryAPICall}
        getOperationCardDetailDesignAPICall={getOperationCardDetailDesignAPICall}
        getOperationCardDetailDesignCodeTypeAPICall={getOperationCardDetailDesignCodeTypeAPICall}
        operationCardNextDesignCodeType={operationCardNextDesignCodeType}
        operationCardProductCategory={operationCardProductCategory}
        getOperationCardDetailNextProductCategoryAPICallFunc={getOperationCardDetailNextProductCategoryAPICallFunc}
        operationCardNextProductCategory={operationCardNextProductCategory}
        isBalanceWeightSetAsInWeight={isBalanceWeightSetAsInWeight}
        balanceWeight={balanceWeight}
        modalFieldsState={modalFieldsState}
        operationCardMachine={operationCardMachine}
      />
      <div className="mt-2">
        <OperationCardIssueItem operationCardDetailData={operationCardDetailData} />
      </div>
    </>
  );
};

export default OperationCardIssueMaster;
