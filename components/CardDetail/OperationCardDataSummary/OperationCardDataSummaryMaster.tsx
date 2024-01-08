import React from 'react';
import ProductData from './ProductData';
import MeltingLotData from './MeltingLotData';
import BalanceData from './BalanceData';

const OperationCardDataSummaryMaster = () => {
  return (
    <div className="row spacing-mt">
      <div className="col-md-12 ">
        <div className=" gap-4 d-flex justify-content-between">
          <div className="col-md-3 border rounded-3 text-center px-2 py-2">
            <ProductData />
          </div>
          <div className="col-md-4 border rounded-3 text-center px-2 py-2">
            <MeltingLotData />
          </div>
          <div className="col-md-3 border rounded-3 text-center px-2 py-2">
            <BalanceData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardDataSummaryMaster;
