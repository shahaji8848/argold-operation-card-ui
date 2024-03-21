import React from 'react';
import OperationCardCreationDetail from '../OperationCardCreationDetail/OperationCardCreationDetail';
import OperationCardSellsOrder from './OperationCardSellsOrder';

const MasterOperationCardSellsOrder = ({
  getOperationCardSellsOrder,
  sellsOrderData,
}: any) => {
  return (
    <>
      <OperationCardSellsOrder
        getOperationCardSellsOrder={getOperationCardSellsOrder}
        sellsOrderData={sellsOrderData}
      />
    </>
  );
};

export default MasterOperationCardSellsOrder;
