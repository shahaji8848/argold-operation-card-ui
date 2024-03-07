import React from 'react';
import ProductData from './OCProductData';
import MeltingLotData from './OCMeltingData';
import BalanceData from './OCBalanceData';

const OperationCardDataSummaryMaster = ({ operationCardDetailData }: any) => {
  return (
    <div className="row  p-0 m-0">
      <div className="col-md-12 spacing-mt ">
        <div className="row d-flex justify-content-between ">
          <div className="col-md-4 text-center p-0 col-mr ">
            <ProductData operationCardDetailData={operationCardDetailData} />
          </div>
          <div className="col-md-4  text-center mob-mt p-0 col-mr">
            <MeltingLotData operationCardDetailData={operationCardDetailData} />
          </div>
          <div className="col-md-4  text-center p-0 mob-mt">
            <BalanceData operationCardDetailData={operationCardDetailData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardDataSummaryMaster;
