'use client';
import React from 'react';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';
import MeltingLotBunchOrdersTable from './MeltingLotBunchOrdersTable';
import MeltingLotSingleOrdersTable from './MeltingLotSingleOrdersTable';
import ExistingMelingLotMaster from './ExistingMelingLotMaster';

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
    existingSalesOrderData,
    handleDeleteSalesOrder,
    groupOrdersByDesign,
    addOrderBtndisabled
  }: any = useMeltingLotSalesOrder();

  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3 mt-3">
        <div className="row">
          <div className="col-md-3 mb-2">
            <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Melting Plan</label>
            <input type="text" className="form-control inputFields fs-13 rounded-2" value={meltingPlan} readOnly />
          </div>
          {meltingPlanFilters?.product && meltingPlanFilters?.product !== null && (
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Product</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.product}
                readOnly
              />
            </div>
          )}
          {meltingPlanFilters?.product_category && meltingPlanFilters?.product_category !== null && (
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Product Category</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.product_category}
                readOnly
              />
            </div>
          )}

          {meltingPlanFilters?.machine_size && meltingPlanFilters?.machine_size !== null && (
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Machine Size</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.machine_size}
                readOnly
              />
            </div>
          )}

          {meltingPlanFilters?.design && meltingPlanFilters?.design !== null && (
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Design</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.design || ' '}
                readOnly
              />
            </div>
          )}

          {meltingPlanFilters?.purity && meltingPlanFilters?.purity !== null && (
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Purity</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.purity}
                readOnly
              />
            </div>
          )}
        </div>
        <div>
          <ExistingMelingLotMaster
            existingSalesOrderData={existingSalesOrderData}
            formatDate={formatDate}
            handleDeleteSalesOrder={handleDeleteSalesOrder}
            selectedOrders={selectedOrders}
            handleCheckboxChange={handleCheckboxChange}
            groupOrdersByDesign={groupOrdersByDesign}
          />
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
          groupOrdersByDesign={groupOrdersByDesign}
        />
        <MeltingLotBunchOrdersTable
          salesOrderData={salesOrderData}
          selectedOrders={selectedOrders}
          handleCheckboxChange={handleCheckboxChange}
          formatDate={formatDate}
          handleSaveSalesOrder={handleSaveSalesOrder}
          selectedDesign={selectedDesign}
          groupOrdersByDesign={groupOrdersByDesign}
        />

        {(salesOrderData?.single_orders?.length > 0 || salesOrderData?.bunch_orders?.length > 0) && (
          <button className="text-end btn btn-blue btn-py mt-1" disabled={addOrderBtndisabled} onClick={handleSaveSalesOrder}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default MeltingLotAddSalesOrder;
