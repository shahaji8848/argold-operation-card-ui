import Link from 'next/link';
import React, { useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
}: any) => {
  console.log('filtersData', filtersData);
  return (
    <div className="spacing-mt">
      <div className="row">
        {inputField.map((data: any, index: any) => {
          return (
            <div className="col-md-3 mb-2" key={index}>
              <form>
                <div className="">
                  <label className=" w-100 dark-blue fw-bold text-capitalize fs-13">
                    {data?.label}
                  </label>
                  <input
                    type="text"
                    className="form-control inputFields fs-13 rounded-2"
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
        <Link
          href=""
          className="px-3 py-0 my-0 fs-14"
          onClick={handleClearFilters}
        >
          Clear Filter
        </Link>
      </div>
    </div>
  );
};

export default OperationCardListingField;
