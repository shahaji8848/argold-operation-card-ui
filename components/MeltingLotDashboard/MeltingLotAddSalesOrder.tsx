'use client';
import React from 'react';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';
import MeltingLotBunchOrdersTable from './MeltingLotBunchOrdersTable';
import MeltingLotSingleOrdersTable from './MeltingLotSingleOrdersTable';

const MeltingLotAddSalesOrder = () => {
  const {
    meltingPlan,
    meltingPlanFilters,
    handleGetSalesOrders,
    salesOrderData,
    selectedOrders,
    handleCheckboxChange,
    formatDate,
    handleSaveSalesOrder,
    selectedDesign,
  }: any = useMeltingLotSalesOrder();

  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3 mt-3">
        <div className="row">
          <div className="col-md-3 mb-2">
            <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Melting Plan</label>
            <input type="text" className="form-control inputFields fs-13 rounded-2" value={meltingPlan} readOnly />
          </div>
          <div className="col-md-3 mb-2">
            <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Product Category</label>
            <input
              type="text"
              className="form-control inputFields fs-13 rounded-2"
              value={meltingPlanFilters?.product_category}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Machine Size</label>
            <input
              type="text"
              className="form-control inputFields fs-13 rounded-2"
              value={meltingPlanFilters?.machine_size}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Design</label>
            <input
              type="text"
              className="form-control inputFields fs-13 rounded-2"
              value={meltingPlanFilters?.design || ' '}
              readOnly
            />
          </div>
        </div>
        <div>
          <button className="text-end btn btn-blue btn-py mt-1" onClick={handleGetSalesOrders}>
            Get Orders
          </button>
        </div>
        <MeltingLotSingleOrdersTable
          salesOrderData={salesOrderData}
          selectedOrders={selectedOrders}
          handleCheckboxChange={handleCheckboxChange}
          formatDate={formatDate}
          handleSaveSalesOrder={handleSaveSalesOrder}
          selectedDesign={selectedDesign}
        />
        <MeltingLotBunchOrdersTable
          salesOrderData={salesOrderData}
          selectedOrders={selectedOrders}
          handleCheckboxChange={handleCheckboxChange}
          formatDate={formatDate}
          handleSaveSalesOrder={handleSaveSalesOrder}
          selectedDesign={selectedDesign}
        />

        {(salesOrderData?.single_orders?.length > 0 || salesOrderData?.bunch_orders?.length > 0) && (
          <button className="text-end btn btn-blue btn-py mt-1" onClick={handleSaveSalesOrder}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default MeltingLotAddSalesOrder;
