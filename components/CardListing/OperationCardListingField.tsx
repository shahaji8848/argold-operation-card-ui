import React from 'react';

const OperationCardListingField = () => {
  const inputField = [
    'parent melting lot',
    'process',
    'gross balance',
    'melting lot',
    'department',
    'fine balance',
    'purity',
    'karigar',
    'operation card',
    'product',
    'balance',
  ];

  return (
    <div className="spacing-mt">
      <div className="row">
        {inputField.map((data: any, index: any) => {
          return (
            <div className="col-md-3" key={index}>
              <form>
                <div className="">
                  <label className="form-label text-center w-100 dark-blue fw-bold text-capitalize fs-13">
                    {data}
                  </label>
                  <input
                    type="text"
                    className="form-control grey-bg border-none border-grey filed-height fs-13"
                  />
                </div>
              </form>
            </div>
          );
        })}
      </div>
      {/* <div className="d-flex justify-content-end"> */}
      <button className="btn btn-primary text-capitalize filter-btn btn-py fs-13 mt-2">
        Apply filter
      </button>
      {/* </div> */}
    </div>
  );
};

export default OperationCardListingField;
