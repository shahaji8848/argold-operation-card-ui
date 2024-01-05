import React, { useEffect, useState } from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardIssueItem from './OperationCardIssueItem';
import SelectKarigar from './SelectKarigar';
import MeltingLotData from './OperationCardDataSummary/MeltingLotData';
import ProductData from './OperationCardDataSummary/ProductData';
import BalanceData from './OperationCardDataSummary/BalanceData';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import OperationCardReciptButton from './OperationCardReciptButton';
import OperationCardIssueButton from './OperationCardIssueButton';

const OperationCardDetailMaster = () => {
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const getOperationCardProcessDepartment = async () => {
    const opeartionCardData =
      await GETOperationCardProductProcessDepartmentData(
        'Stamping-KDM-Office Outside-KDM-Office Outside'
      );

    if (
      opeartionCardData?.status === 200 &&
      Object.keys(opeartionCardData?.data?.data)?.length > 0
    ) {
      setOperationCardProductDept(opeartionCardData?.data?.data);
    } else {
      setOperationCardProductDept({});
    }
  };
  useEffect(() => {
    getOperationCardProcessDepartment();
  }, []);
  console.log(operationCardProductDept, 'operationCardProductDept');
  return (
    <div>
      <div className="container-fluid">
        <OperationCardReciptButton
          operationCardProductDept={operationCardProductDept}
        />
        <OperationCardIssueButton
          operationCardProductDept={operationCardProductDept}
        />
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
