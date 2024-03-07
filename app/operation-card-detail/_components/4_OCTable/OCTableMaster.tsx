import React from 'react';
import OperationCardReceiptMaster from './OC_Receipt/OC_Receipt_Master';
import OperationCardIssueMaster from './OC_Issue/OC_Issue_Master';

const OperationCardTableMaster = ({
  search,
  operationCardDetail,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextDesign,
  operationCardNextProductProcess,
  operationCardNextProductCategory,
  operationCardNextProductProcessDepartment,
  getOperationCardDetailDesignCodeCategoryAPICall,
  getOperationCardDetailDesignAPICall,
  getOperationCardDetailDesignCodeTypeAPICall,
  operationCardNextDesignCodeType,
  operationCardProductCategory,
  getOperationCardDetailNextProductCategoryAPICallFunc,
}: any) => {
  return (
    <div className="row spacing-mt">
      <div className="col-xxl-5 col-xl-4 col-md-5">
        <OperationCardReceiptMaster
          search={search}
          getOperationCardDetailNextKarigarFunc={
            getOperationCardDetailNextKarigarFunc
          }
          getOperationCardDetailNextProductProcessAPICallFunc={
            getOperationCardDetailNextProductProcessAPICallFunc
          }
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
          operationCardNextProductProcessDepartment={
            operationCardNextProductProcessDepartment
          }
        />
      </div>
      <div className="col-xxl-7 col-xl-8 col-md-7">
        <OperationCardIssueMaster
          search={search}
          getOperationCardDetailNextKarigarFunc={
            getOperationCardDetailNextKarigarFunc
          }
          getOperationCardDetailNextProductProcessAPICallFunc={
            getOperationCardDetailNextProductProcessAPICallFunc
          }
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
          operationCardThickness={operationCardThickness}
          operationCardVariant={operationCardVariant}
          operationCardMachineSize={operationCardMachineSize}
          operationCardDesignCodeCategory={operationCardDesignCodeCategory}
          operationCardNextProductProcess={operationCardNextProductProcess}
          operationCardNextProductProcessDepartment={
            operationCardNextProductProcessDepartment
          }
          getOperationCardDetailDesignCodeCategoryAPICall={
            getOperationCardDetailDesignCodeCategoryAPICall
          }
          getOperationCardDetailDesignAPICall={
            getOperationCardDetailDesignAPICall
          }
          getOperationCardDetailDesignCodeTypeAPICall={
            getOperationCardDetailDesignCodeTypeAPICall
          }
          operationCardNextDesignCodeType={operationCardNextDesignCodeType}
          operationCardProductCategory={operationCardProductCategory}
          getOperationCardDetailNextProductCategoryAPICallFunc={
            getOperationCardDetailNextProductCategoryAPICallFunc
          }
          operationCardNextProductCategory={operationCardNextProductCategory}
        />
      </div>
    </div>
  );
};

export default OperationCardTableMaster;
