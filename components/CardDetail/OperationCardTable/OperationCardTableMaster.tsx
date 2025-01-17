import React from 'react';
import OperationCardReceiptMaster from './OperationCardReceipt/OperationCardReceiptMaster';
import OperationCardIssueMaster from './OperationCardIssue/OperationCardIssueMaster';

const OperationCardTableMaster = ({
  search,
  headerSave,
  operationCardDetail,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  // onChangeOfProductFetchNextProductProcess,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
  operationCardCustomer,
  operationCardVariant,
  operationCardTone,
  operationCardWorkerList,
  operationCardMachine,
  operationCardMachineSize,
  operationCardNextMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextDesign,
  operationCardNextProductProcess,
  onChangeOfProductFetchNextProductProcess,
  operationCardNextProductCategory,
  operationCardNextProductProcessDepartment,
  getOperationCardDetailDesignCodeCategoryAPICall,
  getOperationCardDetailDesignAPICall,
  getOperationCardDetailDesignCodeTypeAPICall,
  getOperationCardProductCategory,
  operationCardNextDesignCodeType,
  operationCardProductCategory,
  getOperationCardDetailNextProductCategoryAPICallFunc,
  operationCardProduct,
  goldAccessoryTable,
  issueReference,
  isBalanceWeightSetAsInWeight,
  balanceWeight,
  modalFieldsState,
  salesOrderList,
  bunchSalesOrderList,
  mpReferenceList,
  productCategoryAndMachineSizeCombination,
}: any) => {
  return (
    <div className="row spacing-mt">
      <div className="col-xxl-5 col-xl-4 col-md-5">
        <OperationCardReceiptMaster
          search={search}
          getOperationCardDetailNextKarigarFunc={getOperationCardDetailNextKarigarFunc}
          getOperationCardDetailNextProductProcessAPICallFunc={getOperationCardDetailNextProductProcessAPICallFunc}
          getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
            getOperationCardDetailNextProductProcessDepartmentAPICallFunc
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
          operationCardNextProductProcess={operationCardNextProductProcess}
          operationCardNextProductProcessDepartment={operationCardNextProductProcessDepartment}
          goldAccessoryTable={goldAccessoryTable}
          issueReference={issueReference}
        />
      </div>
      <div className="col-xxl-7 col-xl-8 col-md-7">
        <OperationCardIssueMaster
          search={search}
          headerSave={headerSave}
          getOperationCardDetailNextKarigarFunc={getOperationCardDetailNextKarigarFunc}
          getOperationCardDetailNextProductProcessAPICallFunc={getOperationCardDetailNextProductProcessAPICallFunc}
          getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
            getOperationCardDetailNextProductProcessDepartmentAPICallFunc
          }
          operationCardNextDesign={operationCardNextDesign}
          operationCardDetail={operationCardDetail}
          operationCardProductDept={operationCardProductDept}
          operationCardDetailData={operationCardDetailData}
          operationCardKarigar={operationCardKarigar}
          operationCardNextKarigar={operationCardNextKarigar}
          operationCardConcept={operationCardConcept}
          operationCardCustomer={operationCardCustomer}
          operationCardThickness={operationCardThickness}
          operationCardTone={operationCardTone}
          operationCardVariant={operationCardVariant}
          operationCardMachineSize={operationCardMachineSize}
          operationCardNextMachineSize={operationCardNextMachineSize}
          operationCardDesignCodeCategory={operationCardDesignCodeCategory}
          // onChangeOfProductFetchNextProductProcess={onChangeOfProductFetchNextProductProcess}
          operationCardNextProductProcess={operationCardNextProductProcess}
          onChangeOfProductFetchNextProductProcess={onChangeOfProductFetchNextProductProcess}
          operationCardNextProductProcessDepartment={operationCardNextProductProcessDepartment}
          operationCardWorkerList={operationCardWorkerList}
          getOperationCardDetailDesignCodeCategoryAPICall={getOperationCardDetailDesignCodeCategoryAPICall}
          getOperationCardDetailDesignAPICall={getOperationCardDetailDesignAPICall}
          getOperationCardDetailDesignCodeTypeAPICall={getOperationCardDetailDesignCodeTypeAPICall}
          getOperationCardProductCategory={getOperationCardProductCategory}
          operationCardNextDesignCodeType={operationCardNextDesignCodeType}
          operationCardProductCategory={operationCardProductCategory}
          getOperationCardDetailNextProductCategoryAPICallFunc={getOperationCardDetailNextProductCategoryAPICallFunc}
          operationCardNextProductCategory={operationCardNextProductCategory}
          operationCardProduct={operationCardProduct}
          isBalanceWeightSetAsInWeight={isBalanceWeightSetAsInWeight}
          balanceWeight={balanceWeight}
          modalFieldsState={modalFieldsState}
          operationCardMachine={operationCardMachine}
          salesOrderList={salesOrderList}
          bunchSalesOrderList={bunchSalesOrderList}
          mpReferenceList={mpReferenceList}
          productCategoryAndMachineSizeCombination={productCategoryAndMachineSizeCombination}
        />
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
