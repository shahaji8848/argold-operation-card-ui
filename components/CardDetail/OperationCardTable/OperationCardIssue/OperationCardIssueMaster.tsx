import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  search,
  headerSave,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  // onChangeOfProductFetchNextProductProcess,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardDetail,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
  operationCardCustomer,
  operationCardTone,
  operationCardVariant,
  operationCardMachine,
  operationCardMachineSize,
  operationCardNextMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextDesign,
  operationCardNextProductProcess,
  operationCardWorkerList,
  onChangeOfProductFetchNextProductProcess,
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
  salesOrderList,
  bunchSalesOrderList,
  mpReferenceList,
  productCategoryAndMachineSizeCombination,
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
        operationCardCustomer={operationCardCustomer}
        operationCardNextKarigar={operationCardNextKarigar}
        operationCardThickness={operationCardThickness}
        operationCardTone={operationCardTone}
        operationCardVariant={operationCardVariant}
        operationCardWorkerList={operationCardWorkerList}
        operationCardMachineSize={operationCardMachineSize}
        operationCardNextMachineSize={operationCardNextMachineSize}
        operationCardNextDesign={operationCardNextDesign}
        operationCardDesignCodeCategory={operationCardDesignCodeCategory}
        operationCardNextProductProcess={operationCardNextProductProcess}
        onChangeOfProductFetchNextProductProcess={onChangeOfProductFetchNextProductProcess}
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
        salesOrderList={salesOrderList}
        bunchSalesOrderList={bunchSalesOrderList}
        mpReferenceList={mpReferenceList}
        productCategoryAndMachineSizeCombination={productCategoryAndMachineSizeCombination}
      />
      <div className="mt-2">
        <OperationCardIssueItem operationCardDetailData={operationCardDetailData} />
      </div>
    </>
  );
};

export default OperationCardIssueMaster;
