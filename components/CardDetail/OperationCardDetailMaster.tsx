import OperationCardDataSummaryMaster from './OperationCardDataSummary/OperationCardDataSummaryMaster';
import OperationCardTableMaster from './OperationCardTable/OperationCardTableMaster';
import React from 'react';
import OperationCardHeaderMaster from './OperationCardHeader/OperationCardHeaderMaster';
import OperationCardInputFieldMaster from './OperationCardInputField/OperationCardInputFieldMaster';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import Image from 'next/image';
const OperationCardDetailMaster = () => {
  const { operationCardDetailData, operationCardProductDept } =
    useOperationDetailCard();
  return (
    <div>
      {Object.keys(operationCardDetailData).length > 0 ? (
        <div className="container-fluid">
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
      ) : (
        <div className="OpertaionCardcontainer">
          <div className="vertical-center text-center">
            <Image
              src="/not-found.png"
              width={180}
              height={180}
              alt="Picture of the author"
            />
            <h3 className="">Operation Card Not Found...</h3>
            <a type="button" className="btn btn-link" href="/">
              Go To Home Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardDetailMaster;
