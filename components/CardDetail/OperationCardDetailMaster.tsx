import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardIssueItem from './OperationCardIssueItem';
import SelectKarigar from './SelectKarigar';
import OperationCardButton from './OperationCardButton';
import MeltingLotData from './OperationCardDataSummary/MeltingLotData';
import ProductData from './OperationCardDataSummary/ProductData';
import BalanceData from './OperationCardDataSummary/BalanceData';

const OperationCardDetailMaster = () => {
  return (
    <div>
      <div className="container-fluid">
        <OperationCardButton />

        <div className="row">
          <div className="col-md-4">
            <SelectKarigar />
          </div>
          <div className="col-md-8">
            <div className="row gap-5">
              <MeltingLotData />
              <ProductData />
              <BalanceData />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <OperationCardReceiptItem />
          </div>
          <div className="col-md-6">
            <OperationCardIssueItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardDetailMaster;
