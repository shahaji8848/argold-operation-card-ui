import React from 'react';
import OperationCardCreationDetail from '../OperationCardCreationDetail/OperationCardCreationDetail';
import OperationCardSellsOrder from './OperationCardSellsOrder';

const MasterOperationCardSellsOrder = ({
  getOperationCardSellsOrder,
  sellsOrderData,
  setSellsOrderData,
}: any) => {
  return (
    <>
      <OperationCardSellsOrder
        getOperationCardSellsOrder={getOperationCardSellsOrder}
        sellsOrderData={sellsOrderData}
        setSellsOrderData={setSellsOrderData}
      />
    </>
  );
};

export default MasterOperationCardSellsOrder;
