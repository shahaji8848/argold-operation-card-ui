import OperationCardDataSummaryMaster from './OperationCardDataSummary/OperationCardDataSummaryMaster';
import OperationCardTableMaster from './OperationCardTable/OperationCardTableMaster';
import React, { useEffect, useState } from 'react';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import OperationCardHeaderMaster from './OperationCardHeader/OperationCardHeaderMaster';
import OperationCardInputFieldMaster from './OperationCardInputField/OperationCardInputFieldMaster';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';

const OperationCardDetailMaster = () => {
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const [operationCardDetailData, setOperationCardDetailData] = useState({});
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

  const operationCardDetail = async () => {
    const operationCardDetailVal =
      await GETOperationCardDetail('OP--Stamping-00002');
    console.log(operationCardDetailData, 'data');
    if (
      operationCardDetailVal?.status === 200 &&
      Object.keys(operationCardDetailVal?.data?.data)?.length > 0
    ) {
      setOperationCardDetailData(operationCardDetailVal?.data?.data);
    } else {
      setOperationCardDetailData({});
    }
  };
  useEffect(() => {
    operationCardDetail();
    getOperationCardProcessDepartment();
  }, []);
  console.log(operationCardDetailData, 'operationCardDetailData');
  return (
    <div>
      <div className="container-fuild">
        <div className="spacing-pd">
          <OperationCardHeaderMaster
            operationCardDetailData={operationCardDetailData}
          />

          <OperationCardDataSummaryMaster
            operationCardDetailData={operationCardDetailData}
          />

          <OperationCardInputFieldMaster />
          <OperationCardTableMaster
            operationCardProductDept={operationCardProductDept}
            operationCardDetailData={operationCardDetailData}
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
