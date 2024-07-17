import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';
import { useRouter } from 'next/navigation';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
  handleCheckbox,
  showZeroBalance,
  handleButtonFilter,
}: any) => {
  const permittedProducts = JSON.parse(localStorage.getItem('permittedProducts') || '[]');

  const focusRef = useRef<any>(null);
  const [searchField, setSearchField] = useState<string>('');
  const router = useRouter();

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
  console.log(filtersData, 'abc');
  return (
    <div className="spacing-mt">
      <div className="row">
        {inputField.map((data: any, index: any) => (
          <div className="col-md-3 mb-2" key={index}>
            <form>
              <div className="">
                <>
                  <label className="w-100 dark-blue fw-bold text-capitalize fs-13">{data?.label}</label>
                  <input
                    type="text"
                    className="form-control inputFields fs-13 rounded-2"
                    value={filtersData[data?.name]}
                    onChange={(e) => handleInputChange(e, data.name)}
                    onKeyDown={handleKeyDownEnter}
                    ref={data?.name === 'search' ? focusRef : null}
                  />
                </>
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="filter-wrapper">
        <button className="btn btn-primary text-capitalize filter-btn  fs-13 mt-2 me-2" onClick={handleApplyFilters}>
          Apply filter
        </button>
        {permittedProducts &&
          permittedProducts?.length > 0 &&
          permittedProducts?.map((ele: any, idx: any) => {
            return (
              <button
                className="btn btn-primary text-capitalize filter-btn  fs-13 mt-2 me-2"
                onClick={() => handleButtonFilter(ele)}
              >
                {ele}
              </button>
            );
          })}

        <Link href="" className="px-3 py-0 my-0 fs-14" onClick={handleClearFilters}>
          Clear Filter
        </Link>
        <div>
          <label>
            <input type="checkbox" checked={showZeroBalance} onChange={handleCheckbox} />
            <span className="ps-2">Show zero balance record</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingField;
