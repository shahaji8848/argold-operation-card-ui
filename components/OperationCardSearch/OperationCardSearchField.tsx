import React from 'react';

const OperationCardSearchField = () => {
  return (
    <div className="container mt-5 pt-5 ">
      <div className="row mt-5 pt-5">
        <div className="col-md-3">
          <p className="text-capitalize fs-14 light-grey">
            search melting lot / operation card no
          </p>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control border-grey w-100 " />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary btn-blue px-4 py-2 fs-14">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationCardSearchField;
