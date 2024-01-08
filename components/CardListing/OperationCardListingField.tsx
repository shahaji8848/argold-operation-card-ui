import Link from 'next/link';
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
      <div className="d-flex justify-content-start align-items-center ">
        <button className="btn btn-primary text-capitalize filter-btn btn-py fs-13 mt-2">
          Apply Filter
        </button>

        <Link href="" className="px-3 " style={{ fontSize: '14px' }}>
          Clear Filter
        </Link>
      </div>
    </div>
  );
};

export default OperationCardListingField;
