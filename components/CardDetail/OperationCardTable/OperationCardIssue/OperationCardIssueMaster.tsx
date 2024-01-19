import React from 'react';
import OperationCardIssueButton from './OperationCardIssueButton';
import OperationCardIssueItem from './OperationCardIssueItem';

const OperationCardIssueMaster = ({
  search,
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
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextDesign,
  operationCardNextProductProcess,
  operationCardNextProductProcessDepartment,
  getOperationCardDetailDesignCodeCategoryAPICall,
  getOperationCardDetailDesignAPICall,
  getOperationCardDetailDesignCodeTypeAPICall,
  operationCardNextDesignCodeType,
}: any) => {
  return (
    <>
      <OperationCardIssueButton
        search={search}
        operationCardDetail={operationCardDetail}
        getOperationCardDetailNextKarigarFunc={
          getOperationCardDetailNextKarigarFunc
        }
        getOperationCardDetailNextProductProcessAPICallFunc={
          getOperationCardDetailNextProductProcessAPICallFunc
        }
        getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
          getOperationCardDetailNextProductProcessDepartmentAPICallFunc
        }
        operationCardProductDept={operationCardProductDept}
        operationCardDetailData={operationCardDetailData}
        operationCardKarigar={operationCardKarigar}
        operationCardConcept={operationCardConcept}
        operationCardNextKarigar={operationCardNextKarigar}
        operationCardThickness={operationCardThickness}
        operationCardVariant={operationCardVariant}
        operationCardMachineSize={operationCardMachineSize}
        operationCardNextDesign={operationCardNextDesign}
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
