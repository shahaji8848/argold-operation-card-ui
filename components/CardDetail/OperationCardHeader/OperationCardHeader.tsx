import React from 'react';

const OperationCardHeader = ({ operationCardDetailData }: any) => {
  return (
    <div className="row spacing-mt p-0 ">
      <div className="col-md-10">
        <p className="mb-0 m-0 p-0 ">
          Operation Card:{' '}
          <span className="bold">{operationCardDetailData.name}</span>
        </p>
      </div>
      <div className="col-md-2 text-end">
        <button className="btn btn-secondary fs-13 px-4 px-1 btn-py ">
          Back
        </button>
      </div>
    </div>
  );
};

export default OperationCardHeader;
