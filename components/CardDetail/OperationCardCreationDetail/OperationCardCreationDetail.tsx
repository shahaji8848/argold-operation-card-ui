import React from 'react';

const OperationCardCreationDetail = ({ operationCardDetailData }: any) => {
  console.log('operationCardDetail from creation', operationCardDetailData);
  return (
    <div className="container-fuild bottom spacing-pd spacing-mt ">
      <div className="row">
        <div className="col-xxl-6 col-xl-7 col-lg-9 col-md-12 p-0">
          <div className="row">
            <div className="col-md-6 p-0 ">
              <span style={{ fontSize: '14px' }}>Created on: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData.creation}
              </span>
            </div>
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Modified on: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData.modified}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Created by: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData.owner}
              </span>
            </div>
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Modified by: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData.modified_by}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardCreationDetail;
