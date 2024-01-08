import React from 'react';
import ProductData from './ProductData';
import MeltingLotData from './MeltingLotData';
import BalanceData from './BalanceData';

const OperationCardDataSummaryMaster = ({ operationCardDetailData }: any) => {
  return (
    <div className="row spacing-mt">
      <div className="col-md-12 gap-4 d-flex justify-content-between">
        <div className="col-md-3 border rounded-3 text-center px-2 py-2">
          <ProductData operationCardDetailData={operationCardDetailData} />
        </div>
        <div className="col-md-4 border rounded-3 text-center px-2 py-2">
          <MeltingLotData operationCardDetailData={operationCardDetailData} />
        </div>
        <div className="col-md-3 border rounded-3 text-center px-2 py-2">
          <BalanceData operationCardDetailData={operationCardDetailData} />
        </div>
      </div>
    </div>
  );
};

export default OperationCardDataSummaryMaster;
