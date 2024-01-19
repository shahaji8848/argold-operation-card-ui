import OperationCardDataSummaryMaster from './OperationCardDataSummary/OperationCardDataSummaryMaster';
import OperationCardTableMaster from './OperationCardTable/OperationCardTableMaster';
import React from 'react';
import OperationCardHeaderMaster from './OperationCardHeader/OperationCardHeaderMaster';
import OperationCardInputFieldMaster from './OperationCardInputField/OperationCardInputFieldMaster';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import Image from 'next/image';
import OperationCardCreationDetail from './OperationCardCreationDetail/OperationCardCreationDetail';
const OperationCardDetailMaster = () => {
  const {
    search,
    operationCardDetail,
    getOperationCardDetailNextKarigarFunc,
    getOperationCardDetailNextProductProcessAPICallFunc,
    getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
    operationCardDetailData,
    operationCardProductDept,
    operationCardKarigar,
    operationCardNextKarigar,
    operationCardThickness,
    operationCardVariant,
    operationCardConcept,
    operationCardMachineSize,
    operationCardNextDesign,
    operationCardDesignCodeCategory,
    operationCardNextProductProcess,
    operationCardNextProductProcessDepartment,
    getOperationCardDetailDesignCodeCategoryAPICall,
    getOperationCardDetailDesignAPICall,
    getOperationCardDetailDesignCodeTypeAPICall,
    operationCardNextDesignCodeType,
  } = useOperationDetailCard();
  return (
    <div>
      {Object.keys(operationCardDetailData).length > 0 ? (
        <div className="container-fluid">
          <div className="spacing-pd">
            <OperationCardHeaderMaster
              operationCardDetailData={operationCardDetailData}
            />

            <OperationCardDataSummaryMaster
              operationCardDetailData={operationCardDetailData}
            />

            <OperationCardInputFieldMaster
              operationCardDetailData={operationCardDetailData}
              operationCardProductDept={operationCardProductDept}
              operationCardKarigar={operationCardKarigar}
            />
            <OperationCardTableMaster
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
              operationCardNextDesign={operationCardNextDesign}
              operationCardProductDept={operationCardProductDept}
              operationCardKarigar={operationCardKarigar}
              operationCardNextKarigar={operationCardNextKarigar}
              operationCardDetailData={operationCardDetailData}
              operationCardThickness={operationCardThickness}
              operationCardConcept={operationCardConcept}
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
            />
            <OperationCardCreationDetail
              operationCardDetailData={operationCardDetailData}
            />
          </div>
        </div>
      ) : (
        <div className="OpertaionCardcontainer">
          <div className="vertical-center text-center">
            <Image
              src="/not-found.png"
              width={180}
              height={180}
              alt="Picture of the author"
            />
            <h3 className="">Operation Card Not Found...</h3>
            <a type="button" className="btn btn-link" href="/">
              Go To Home Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardDetailMaster;
