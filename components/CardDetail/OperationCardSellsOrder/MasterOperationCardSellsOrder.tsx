import React from 'react';
import OperationCardCreationDetail from '../OperationCardCreationDetail/OperationCardCreationDetail';
import OperationCardSellsOrder from './OperationCardSellsOrder';

const MasterOperationCardSellsOrder = ({
  operationCardDetailData,
  getOperationCardSellsOrder,
  sellsOrderData,
  setSellsOrderData,
  handleSaveButtonClickSalesOrder,
  operationCardNextProductProcessDepartment,
  operationCardProductDept,
}: any) => {
  return (
    <>
      <OperationCardSellsOrder
        operationCardDetailData={operationCardDetailData}
        getOperationCardSellsOrder={getOperationCardSellsOrder}
        sellsOrderData={sellsOrderData}
        setSellsOrderData={setSellsOrderData}
        handleSaveButtonClickSalesOrder={handleSaveButtonClickSalesOrder}
        operationCardNextProductProcessDepartment={operationCardNextProductProcessDepartment}
        operationCardProductDept={operationCardProductDept}
      />
    </>
  );
};

export default MasterOperationCardSellsOrder;
