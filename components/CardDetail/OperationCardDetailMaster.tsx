import OperationCardDataSummaryMaster from './OperationCardDataSummary/OperationCardDataSummaryMaster';
import OperationCardTableMaster from './OperationCardTable/OperationCardTableMaster';
import OperationCardInputField from './OperationCardInputField/OperationCardInputFieldMaster';
import React, { useEffect, useState } from 'react';

import MeltingLotData from './OperationCardDataSummary/MeltingLotData';
import ProductData from './OperationCardDataSummary/ProductData';
import BalanceData from './OperationCardDataSummary/BalanceData';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import OperationCardReciptButton from './OperationCardTable/OperationCardReceipt/OperationCardReceiptButton';
import OperationCardHeaderMaster from './OperationCardHeader/OperationCardHeaderMaster';
import OperationCardInputFieldMaster from './OperationCardInputField/OperationCardInputFieldMaster';

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
      <div className="container-fuild">
        <div className="spacing-pd">
          <OperationCardHeaderMaster />

          <OperationCardDataSummaryMaster />

          <OperationCardInputFieldMaster />
          <OperationCardTableMaster
            operationCardProductDept={operationCardProductDept}
          />
        </div>
      </div>
      {/* <div className="container-fluid">
        <OperationCardButton />

        <div className="row">
          <div className="col-lg-4 col-md-3">
            <SelectKarigar />
          </div>
          <div className="col-lg-8 col-md-9">
            <div className="row gap-3">
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
      </div> */}
    </div>
  );
};

export default OperationCardDetailMaster;
