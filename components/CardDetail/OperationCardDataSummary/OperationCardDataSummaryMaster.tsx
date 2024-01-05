import React from 'react';
import ProductData from './ProductData';
import MeltingLotData from './MeltingLotData';
import BalanceData from './BalanceData';

const OperationCardDataSummaryMaster = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-12 my-4">
          <div className=" gap-4 d-flex justify-content-between">
            <div className="col-md-3 border rounded-3 ">
              <ProductData />
            </div>
            <div className="col-md-4 border rounded-3">
              <MeltingLotData />
            </div>
            <div className="col-md-3 border rounded-3">
              <BalanceData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardDataSummaryMaster;
