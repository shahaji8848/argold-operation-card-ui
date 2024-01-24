import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';
import OperationCardSearchField from '../OperationCardSearch/OperationCardSearchField';
import { useRouter } from 'next/navigation';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
  constructUrl,
}: any) => {
  console.log('filtersData', filtersData);
  const focusRef = useRef<any>(null);
  const [searchField, setSearchField] = useState<string>('');
  const router = useRouter();
  // const url = window.location.href;
  // const searchUrl = url.split('=').pop();
  console.log('constructUrl', constructUrl);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      redirectToListPage();
    }
  };
  const redirectToListPage = () => {
    if (searchField === '') {
      router.push('');
    } else if (searchField.includes('OP') || searchField.includes('op')) {
      router.push(`/operation-card-detail?name=${searchField}`);
    } else {
      router.push(`/operation-card-list?search=${searchField}`);
    }
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);
  return (
    <div className="spacing-mt">
      <div className="row">
        <div className="col-md-3">
          <label className=" w-100 dark-blue fw-bold text-capitalize fs-13">
            search
          </label>
          <input
            type="text"
            ref={focusRef}
            style={{ boxShadow: 'none !important' }}
            className="form-control inputFields fs-13 rounded-2"
            value={searchField}
            onChange={(e: any) => setSearchField(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {inputField.map((data: any, index: any) => {
          return (
            <div className="col-md-3 mb-2" key={index}>
              <form>
                <div className="">
                  <>
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
                  </>
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
