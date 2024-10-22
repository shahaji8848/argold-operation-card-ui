import React from 'react';
import ExistingMeltingLotSingleOrder from './ExistingMeltingLotSingleOrder';
import ExistingMeltingLotBunchOrder from './ExistingMeltingLotBunchOrder';

const ExistingMelingLotMaster = ({
  existingSalesOrderData,
  formatDate,
  selectedOrders,
  handleCheckboxChange,
  handleDeleteSalesOrder,
  groupOrdersByDesign,
}: any) => {
  return (
    <>
      <ExistingMeltingLotSingleOrder
        existingSalesOrderData={existingSalesOrderData}
        formatDate={formatDate}
        selectedOrders={selectedOrders}
        handleCheckboxChange={handleCheckboxChange}
        groupOrdersByDesign={groupOrdersByDesign}
      />
      <ExistingMeltingLotBunchOrder
        existingSalesOrderData={existingSalesOrderData}
        formatDate={formatDate}
        selectedOrders={selectedOrders}
        handleCheckboxChange={handleCheckboxChange}
        groupOrdersByDesign={groupOrdersByDesign}
      />
      {(existingSalesOrderData?.single_orders?.length > 0 || existingSalesOrderData?.bunch_orders?.length > 0) && (
        <button
          className="btn btn-danger btn-py fs-13 mt-1 mb-2"
          onClick={handleDeleteSalesOrder}
          // disabled={Object.keys(selectedOrders).length === 0}
        >
          Delete
        </button>
      )}
    </>
  );
};

export default ExistingMelingLotMaster;
