import React from 'react';
import Image from 'next/image';
import { Toast, ToastContainer } from 'react-bootstrap';
import OperationCardDataSummaryMaster from './OperationCardDataSummary/OperationCardDataSummaryMaster';
import OperationCardTableMaster from './OperationCardTable/OperationCardTableMaster';
import OperationCardHeaderMaster from './OperationCardHeader/OperationCardHeaderMaster';
import OperationCardInputFieldMaster from './OperationCardInputField/OperationCardInputFieldMaster';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import OperationCardCreationDetail from './OperationCardCreationDetail/OperationCardCreationDetail';
import Link from 'next/link';
import MasterOperationCardSellsOrder from './OperationCardSellsOrder/MasterOperationCardSellsOrder';
import SalesOrderTable from './OperationCardSellsOrder/SalesOrderTable';
const OperationCardDetailMaster = () => {
  const {
    search,
    headerSave,
    handleHeaderSave,
    goldAccessoryTable,
    issueReference,
    handleOperationCardSave,
    operationCardDetail,
    getOperationCardDetailNextKarigarFunc,
    getOperationCardDetailNextProductProcessAPICallFunc,
    getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
    operationCardDetailData,
    operationCardProductDept,
    operationCardKarigar,
    operationCardNextKarigar,
    operationCardProduct,
    operationCardThickness,
    operationCardVariant,
    operationCardConcept,
    operationCardMachineSize,
    operationCardNextDesign,
    operationCardNextProductCategory,
    operationCardDesignCodeCategory,
    operationCardNextProductProcess,
    operationCardNextProductProcessDepartment,
    getOperationCardDetailDesignCodeCategoryAPICall,
    getOperationCardDetailDesignAPICall,
    getOperationCardDetailDesignCodeTypeAPICall,
    operationCardNextDesignCodeType,
    operationCardKarigarQuantitySettings,
    operationCardProductCategory,
    getOperationCardDetailNextProductCategoryAPICallFunc,
    operationCardWorkerList,
    getOperationCardProductCategory,
    operationCardMachine,
    operationCardTone,
    lossReportList,
    isBalanceWeightSetAsInWeight,
    balanceWeight,
    modalFieldsState,
    salesOrderList,
    setSalesOrderList,
    getSalesOrder,
    handleUpdateSalesOrderListWithReadyQty,
    handleOperationCardApproval,
    handleCustomerChange,
  } = useOperationDetailCard();
  console.log('operationCardNextProductProcessDepartment', operationCardProductDept);
  return (
    <div>
      {Object.keys(operationCardDetailData).length > 0 ? (
        <div className="container-fluid">
          <div className="spacing-pd">
            <OperationCardHeaderMaster
              operationCardDetailData={operationCardDetailData}
              handleOperationCardSave={handleOperationCardSave}
              handleOperationCardApproval={handleOperationCardApproval}
            />

            <OperationCardDataSummaryMaster operationCardDetailData={operationCardDetailData} />

            <OperationCardInputFieldMaster
              operationCardDetailData={operationCardDetailData}
              operationCardProductDept={operationCardProductDept}
              operationCardKarigar={operationCardKarigar}
              operationCardMachine={operationCardMachine}
              operationCardTone={operationCardTone}
              lossReportList={lossReportList}
              operationCardNextProductCategory={operationCardNextProductCategory}
              operationCardKarigarQuantitySettings={operationCardKarigarQuantitySettings}
              headerSave={headerSave}
              handleHeaderSave={handleHeaderSave}
            />
            <OperationCardTableMaster
              search={search}
              operationCardDetail={operationCardDetail}
              getOperationCardDetailNextKarigarFunc={getOperationCardDetailNextKarigarFunc}
              getOperationCardDetailNextProductProcessAPICallFunc={getOperationCardDetailNextProductProcessAPICallFunc}
              getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
                getOperationCardDetailNextProductProcessDepartmentAPICallFunc
              }
              operationCardNextDesign={operationCardNextDesign}
              operationCardProductDept={operationCardProductDept}
              operationCardKarigar={operationCardKarigar}
              operationCardNextKarigar={operationCardNextKarigar}
              operationCardDetailData={operationCardDetailData}
              operationCardThickness={operationCardThickness}
              operationCardTone={operationCardTone}
              operationCardConcept={operationCardConcept}
              operationCardVariant={operationCardVariant}
              operationCardMachine={operationCardMachine}
              operationCardMachineSize={operationCardMachineSize}
              operationCardDesignCodeCategory={operationCardDesignCodeCategory}
              operationCardNextProductProcess={operationCardNextProductProcess}
              operationCardWorkerList={operationCardWorkerList}
              operationCardNextProductProcessDepartment={operationCardNextProductProcessDepartment}
              getOperationCardDetailDesignCodeCategoryAPICall={getOperationCardDetailDesignCodeCategoryAPICall}
              getOperationCardDetailDesignAPICall={getOperationCardDetailDesignAPICall}
              getOperationCardDetailDesignCodeTypeAPICall={getOperationCardDetailDesignCodeTypeAPICall}
              operationCardNextDesignCodeType={operationCardNextDesignCodeType}
              operationCardProductCategory={operationCardProductCategory}
              getOperationCardDetailNextProductCategoryAPICallFunc={getOperationCardDetailNextProductCategoryAPICallFunc}
              getOperationCardProductCategory={getOperationCardProductCategory}
              operationCardNextProductCategory={operationCardNextProductCategory}
              operationCardProduct={operationCardProduct}
              goldAccessoryTable={goldAccessoryTable}
              issueReference={issueReference}
              isBalanceWeightSetAsInWeight={isBalanceWeightSetAsInWeight}
              balanceWeight={balanceWeight}
              modalFieldsState={modalFieldsState}
              headerSave={headerSave}
              operationCardMachine={operationCardMachine}
            />
            <SalesOrderTable
              operationCardDetailData={operationCardDetailData}
              salesOrderList={salesOrderList}
              setSalesOrderList={setSalesOrderList}
              getAllSalesOrderList={getSalesOrder}
              handleUpdateSalesOrderListWithReadyQty={handleUpdateSalesOrderListWithReadyQty}
              operationCardProductDept={operationCardProductDept}
              handleCustomerChange={handleCustomerChange}
            />
            <OperationCardCreationDetail operationCardDetailData={operationCardDetailData} />
          </div>
        </div>
      ) : (
        <div className="OpertaionCardcontainer">
          <div className="vertical-center text-center">
            <Image src="/not-found.png" width={180} height={180} alt="Picture of the author" />
            <h3 className="">Operation Card Not Found...</h3>
            <Link type="button" className="btn btn-link" href="/">
              Go To Home Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardDetailMaster;
