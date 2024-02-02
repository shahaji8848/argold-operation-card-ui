import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';
import OperationCardSearchField from '../OperationCardSearch/OperationCardSearchField';
import { useRouter } from 'next/navigation';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slice/login-slice';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
  handleCheckbox,
  showZeroBalance,
}: any) => {
  console.log('filtersData', filtersData);
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
                  <label className="w-100 dark-blue fw-bold text-capitalize fs-13">
                    {data?.label}
                  </label>
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
        <div>
          <label>
            <input
              type="checkbox"
              name="show_zero_balance"
              checked={filtersData['show_zero_balance']}
              onChange={(e: any) => handleInputChange(e, 'show_zero_balance')}
            />
            <span className="ps-2">Show zero balance record</span>
          </label>
          {/* Other components or JSX as needed */}
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingField;
