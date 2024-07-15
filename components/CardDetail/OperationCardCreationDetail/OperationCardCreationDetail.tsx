import React from 'react';

const OperationCardCreationDetail = ({ operationCardDetailData }: any) => {
  return (
    <div className="container-fuild bottom spacing-pd spacing-mt ">
      <div className="row">
        <div className="col-xxl-6 col-xl-7 col-lg-9 col-md-12 p-0">
          <div className="row">
            <div className="col-md-6 p-0 ">
              <span style={{ fontSize: '14px' }}>Created on: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData?.creation && operationCardDetailData?.creation !== null
                  ? (() => {
                      const date = new Date(operationCardDetailData?.creation.replace(/\.[0-9]+$/, ''));
                      const day = String(date.getDate())?.padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      const hours = String(date.getHours()).padStart(2, '0');
                      const minutes = String(date.getMinutes()).padStart(2, '0');
                      const seconds = String(date.getSeconds()).padStart(2, '0');
                      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                    })()
                  : '--'}
              </span>
            </div>
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Modified on: </span>
              <span style={{ fontSize: '14px' }}>
                {operationCardDetailData?.modified && operationCardDetailData?.modified !== null
                  ? (() => {
                      const date = new Date(operationCardDetailData?.modified.replace(/\.[0-9]+$/, ''));
                      const day = String(date.getDate())?.padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      const hours = String(date.getHours()).padStart(2, '0');
                      const minutes = String(date.getMinutes()).padStart(2, '0');
                      const seconds = String(date.getSeconds()).padStart(2, '0');
                      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                    })()
                  : '--'}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Created by: </span>
              <span style={{ fontSize: '14px' }}>{operationCardDetailData.owner}</span>
            </div>
            <div className="col-md-6 p-0">
              <span style={{ fontSize: '14px' }}>Modified by: </span>
              <span style={{ fontSize: '14px' }}>{operationCardDetailData.modified_by}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardCreationDetail;
