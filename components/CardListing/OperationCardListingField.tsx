import Link from 'next/link';
import React, { useState } from 'react';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleKeyDownEnter,
}: any) => {
  const inputField = [
    {
      name: 'parent_melting_lot',
      label: 'parent melting lot',
    },
    {
      name: 'melting_lot',
      label: 'melting lot',
    },
    {
      name: 'operation_department',
      label: 'process',
    },
    {
      name: 'balance_gross_weight',
      label: 'gross balance',
    },
    {
      name: 'product_process_department',
      label: 'department',
    },
    {
      name: 'balance_fine_weight',
      label: 'fine balance',
    },
    {
      name: 'product_purity',
      label: 'purity',
    },
    {
      name: 'karigar',
      label: 'karigar',
    },
    {
      name: 'name',
      label: 'operation card',
    },
    {
      name: 'product',
      label: 'product',
    },
    {
      name: 'balance_weight',
      label: 'balance',
    },
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
                    {data?.label}
                  </label>
                  <input
                    type="text"
                    className="form-control grey-bg border-none border-grey filed-height fs-13 rounded-3"
                    value={filtersData[data?.name]}
                    onChange={(e) => handleInputChange(e, data.name)}
                    onKeyDown={handleKeyDownEnter}
                  />
                </div>
              </form>
            </div>
          );
        })}
      </div>

      <div className="filter-wrapper">
        <button
          className="btn btn-primary text-capitalize filter-btn  fs-13 mt-2"
          onClick={handleApplyFilters}
        >
          Apply filter
        </button>
        <Link href="" className="px-3 py-0 my-0 fs-14">
          Clear Filter
        </Link>
      </div>
    </div>
  );
};

export default OperationCardListingField;
