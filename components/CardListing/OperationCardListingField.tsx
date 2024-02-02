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

  // const { token } = useSelector(get_access_token);
  // const [data, setData] = useState(filtersData);
  // const [showZeroBalance, setShowZeroBalance] = useState(false);
  // const [listData, setListData] = useState<any>([]);
  // const getOperationCardListFromAPI = async (url: string) => {
  //   const getList: any = await GETOperationCardListData(url, token);
  //   if (getList?.status === 200 && getList?.data?.message?.length > 0) {
  //     setListData([...getList?.data?.message]);
  //   } else {
  //     setListData([]);
  //   }
  //   // setFiltersClear(0);
  // };

  // const handleCheckbox = () => {
  //   // Toggle the value
  //   setShowZeroBalance((prevShowZeroBalance) => !prevShowZeroBalance);
  //   const url = new URL(window.location.href);

  //   // et the search parameters
  //   const searchParams = url.searchParams;
  //   // Convert the search parameters to a string
  //   const searchParamsString = searchParams.toString();

  //   const keyValuePairs = searchParamsString?.split('&');

  //   // Create an object to store the updated state
  //   const updatedFiltersData: any = {
  //     search: '',
  //     name: '',
  //     parent_melting_lot: '',
  //     melting_lot: '',
  //     product_purity: '',
  //     product: '',
  //     operation_department: '',
  //     product_process_department: '',
  //     karigar: '',
  //     show_zero_balance: showZeroBalance ? 1 : 0,
  //   };

  //   keyValuePairs.forEach((keyValuePair) => {
  //     const [key, value] = keyValuePair.split('=');
  //     if (key in updatedFiltersData) {
  //       // Replace '+' with space before updating the state
  //       updatedFiltersData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
  //     }
  //   });

  //   // Update the state with the new values
  //   setData((prevFiltersData: any) => ({
  //     ...prevFiltersData,
  //     ...updatedFiltersData,
  //   }));

  //   // if (showZeroBalance) {
  //   //   // Toggle the value when the user checks the input box
  //   const updatedShowZeroBalance = showZeroBalance ? '1' : '0';
  //   searchParams.set('show_zero_balance', updatedShowZeroBalance);

  //   // Trigger API call with the updated state
  //   const updatedURL: any = url.search.split('?').pop();
  //   console.log(updatedURL, 'updatedURL');
  //   getOperationCardListFromAPI(updatedURL);
  //   console.log('searchParamsStringsdsd', updatedURL);
  //   // URLForFiltersHandler();
  //   // }else{
  //   //   getOperationCardListFromAPI(searchParamsString);
  //   // }
  // };
  // const handleCheckbox = (event:any) =>{
  //   event.target.checked = 0
  // }

  // const constructSearchParamsWithShowZeroBalance = (filtersData:any, showZeroBalance:any) => {
  //   // const searchParams = { ...filtersData, show_zero_balance: showZeroBalance };
  //   const searchParams = { show_zero_balance: showZeroBalance };
  //   const queryString = new URLSearchParams(searchParams).toString();
  //   return queryString;
  // };

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
              checked={showZeroBalance}
              onChange={handleCheckbox}
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
