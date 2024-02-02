import React, { useState } from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';
import useOperationCardList from '@/hooks/operation-card-list-hook/operation-card-list-hook';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slice/login-slice';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';

const OperationCardListingMaster = () => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  const {
    // listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    URLForFiltersHandler,
    constructUrl,
  } = useOperationCardList();

  const { token } = useSelector(get_access_token);
  const [data, setData] = useState(filtersData);
  const [showZeroBalance, setShowZeroBalance] = useState(false);
  const [listData, setListData] = useState<any>([]);
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token);
    if (getList?.status === 200 && getList?.data?.message?.length > 0) {
      setListData([...getList?.data?.message]);
    } else {
      setListData([]);
    }
    // setFiltersClear(0);
  };

  const handleCheckbox = () => {
    // Toggle the value
    setShowZeroBalance((prevShowZeroBalance) => !prevShowZeroBalance);
    const url = new URL(window.location.href);

    // et the search parameters
    const searchParams = url.searchParams;
    // Convert the search parameters to a string
    const searchParamsString = searchParams.toString();

    const keyValuePairs = searchParamsString?.split('&');

    // Create an object to store the updated state
    const updatedFiltersData: any = {
      search: '',
      name: '',
      parent_melting_lot: '',
      melting_lot: '',
      product_purity: '',
      product: '',
      operation_department: '',
      product_process_department: '',
      karigar: '',
      show_zero_balance: showZeroBalance ? 1 : 0,
    };

    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key in updatedFiltersData) {
        // Replace '+' with space before updating the state
        updatedFiltersData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
      }
    });

    // Update the state with the new values
    setData((prevFiltersData: any) => ({
      ...prevFiltersData,
      ...updatedFiltersData,
    }));

    // if (showZeroBalance) {
    //   // Toggle the value when the user checks the input box
    const updatedShowZeroBalance = showZeroBalance ? '1' : '0';
    searchParams.set('show_zero_balance', updatedShowZeroBalance);

    // Trigger API call with the updated state
    const updatedURL: any = url.search.split('?').pop();
    console.log(updatedURL, 'updatedURL');
    getOperationCardListFromAPI(updatedURL);
    console.log('searchParamsStringsdsd', updatedURL);
    // URLForFiltersHandler();
    // } else {
    //   getOperationCardListFromAPI(searchParamsString);
    //   console.log('searchParamsString', searchParamsString);
    // }
  };

  return (
    <div className="container-fuild">
      <div className="row spacing-pd mt-3">
        <div className="col-md-10"></div>
        {/* <div className="col-md-2 text-end">
          <button
            className="btn btn-secondary fs-13 px-4 px-1 btn-py "
            onClick={redirectToHomepage}
          >
            Back
          </button>
        </div> */}
      </div>
      <div className="spacing-pd">
        <OperationCardListingField
          filtersData={filtersData}
          handleInputChange={handleInputChange}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          handleKeyDownEnter={handleKeyDownEnter}
          URLForFiltersHandler={URLForFiltersHandler}
          constructUrl={constructUrl}
          handleCheckbox={handleCheckbox}
          showZeroBalance={showZeroBalance}
        />
        <div className="spacing-mt">
          <OperationCardListingTable data={listData} />
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingMaster;
