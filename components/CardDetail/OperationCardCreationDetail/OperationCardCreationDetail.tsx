import React from 'react';

const OperationCardCreationDetail = ({ operationCardDetailData }: any) => {
  console.log('operationCardDetail from creation', operationCardDetailData);
  return (
    <div className="container-fuild bottom spacing-pd spacing-mt ">
      <div className="row">
        <div className="col-xxl-6 col-xl-7 col-lg-9 col-md-12 p-0">
          <div className="row">
            <div className="col-md-6 p-0 ">
              <span>Created on: </span>
              <span>{operationCardDetailData.creation}</span>
            </div>
            <div className="col-md-6 p-0">
              <span>Modified on: </span>
              <span>{operationCardDetailData.modified}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-0">
              <span>Created by: </span>
              <span>{operationCardDetailData.owner}</span>
            </div>
            <div className="col-md-6 p-0">
              <span>Modified by: </span>
              <span>{operationCardDetailData.modified_by}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardCreationDetail;
