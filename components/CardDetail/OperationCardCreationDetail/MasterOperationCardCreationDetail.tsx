import React from 'react';
import OperationCardCreationDetail from './OperationCardCreationDetail';

const MasterOperationCardCreationDetail = ({
  operationCardDetailData,
}: any) => {
  return (
    <>
      <OperationCardCreationDetail
        operationCardDetailData={operationCardDetailData}
      />
    </>
  );
};

export default MasterOperationCardCreationDetail;
