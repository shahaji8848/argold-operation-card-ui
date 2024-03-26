import React from 'react';
import OperationCardCreationDetail from '../OperationCardCreationDetail/OperationCardCreationDetail';
import OperationCardSellsOrder from './OperationCardSellsOrder';

const MasterOperationCardSellsOrder = ({
  operationCardDetailData,
  getOperationCardSellsOrder,
  sellsOrderData,
  setSellsOrderData,
  handleSaveButtonClickSalesOrder,
}: any) => {
  return (
    <>
      <OperationCardSellsOrder
        operationCardDetailData={operationCardDetailData}
        getOperationCardSellsOrder={getOperationCardSellsOrder}
        sellsOrderData={sellsOrderData}
        setSellsOrderData={setSellsOrderData}
        handleSaveButtonClickSalesOrder={handleSaveButtonClickSalesOrder}
      />
    </>
  );
};

export default MasterOperationCardSellsOrder;
