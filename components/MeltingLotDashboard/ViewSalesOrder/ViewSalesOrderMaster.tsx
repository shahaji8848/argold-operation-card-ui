'use client';
import React from 'react';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';
import SingleViewSalesOrder from './SingleViewSalesOrder';
import BunchViewSalesOrder from './BunchViewSalesOrder';

const ViewSalesOrderMaster = () => {
  const { meltingPlanFilters, formatDate, groupOrdersByDesign, handleGetViewSalesOrders, viewSalesOrderData }: any =
    useMeltingLotSalesOrder();

  return (
    <>
      <div className="container-fluid">
        <div className="spacing-pd mb-3 mt-3">
          <div className="row">
            <div className="col-md-3 mb-2">
              <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Product</label>
              <input
                type="text"
                className="form-control inputFields fs-13 rounded-2"
                value={meltingPlanFilters?.product}
                readOnly
              />
            </div>
            {meltingPlanFilters?.purity !== null && (
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
            <button className="text-end btn btn-blue btn-py mt-1" onClick={handleGetViewSalesOrders}>
              Get Orders
            </button>
          </div>

          <div>
            <SingleViewSalesOrder
              salesOrderData={viewSalesOrderData}
              formatDate={formatDate}
              groupOrdersByDesign={groupOrdersByDesign}
            />
            <BunchViewSalesOrder
              salesOrderData={viewSalesOrderData}
              formatDate={formatDate}
              groupOrdersByDesign={groupOrdersByDesign}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSalesOrderMaster;
