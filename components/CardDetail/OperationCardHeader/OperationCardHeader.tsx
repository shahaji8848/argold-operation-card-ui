import React from 'react';

const OperationCardHeader = () => {
  return (
    <div className="d-flex justify-content-between spacing-mt p-0 ">
      <p className="mb-0 m-0 p-0">
        Operation Card: <span className="bold">OP--Flatting-00014</span>{' '}
      </p>
      <button className="btn btn-secondary fs-13 px-4 px-1 btn-py">Back</button>
    </div>
  );
};

export default OperationCardHeader;
