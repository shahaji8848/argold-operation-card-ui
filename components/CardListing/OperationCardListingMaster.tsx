import React, { useEffect, useState } from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';
import useOperationCardList from '@/hooks/operation-card-list-hook/operation-card-list-hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slice/login-slice';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import { CONSTANTS } from '@/services/config/api-config';

const OperationCardListingMaster = () => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  const {
    listData,
    filtersData,
    handleInputChange,
    // handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    constructUrl,
    handleButtonFilter,
    premittedProducts,
    handleApprove,
    handleDepartmentDropdown,
    departmentValue,
    handleDepartmentChange,
    handleOptionClick,
    isDropdownOpen,
    setIsDropdownOpen,
    onDepartmentFocusValue,
    filteredDepartments,
    departmentInput,
    dropdownRef,
    isProcessDropOpen,
    setIsProcessDropOpen,
    handleProcessKeyDownEnter,
    processInput,
    processValue,
    filterProcess,
    handleProcessOptionClick,
    handleProcessChange,
    onProcessFocusVisible,
    isLoading,
    processRef,
  } = useOperationCardList();

  const { token, username } = useSelector(get_access_token);
  const [data, setData] = useState(filtersData);
  const [showZeroBalance, setShowZeroBalance] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState<any>(false);

  const searchParams = useSearchParams();
  // const getOperationCardListFromAPI = async (url: string) => {
  //   const getList: any = await GETOperationCardListData(url, token, username);
  //   if (getList?.status === 200 && getList?.data?.message?.length > 0) {
  //     setListData([...getList?.data?.message]);
  //   } else {
  //     setListData([]);
  //   }
  //   setFiltersClear(0);
  // };
  const handleCheckbox = () => {
    // Toggle the value
    setShowZeroBalance((prevShowZeroBalance) => !prevShowZeroBalance);
  };

  const handleSelectAllCheckbox = () => {
    // Toggle the value
    setSelectAllCheckbox((prevSelectAll: any) => !prevSelectAll);
  }
  const URLForFiltersHandler = () => {
    console.log(filtersData, 'FIlTR DATA');
    const getconstructedUrl: any = constructUrl(filtersData);
    router.push(`${getconstructedUrl}`);

  };
  const handleApplyFilters = () => {
    console.log(filtersData, 'FIlTER DATA');
    URLForFiltersHandler();
    const url = new URL(window.location.href);

    // Get the search parameters
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
      product_process: '',
      operation_department: '',
      karigar: '',
      show_zero_balance: showZeroBalance ? '1' : '0', // Corrected value here
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
    // Set the value of show_zero_balance in the URL
    searchParams.set('show_zero_balance', showZeroBalance ? '1' : '0');

    // Trigger API call with the updated state
    const updatedURL: any = url.search.split('?').pop();
    // getOperationCardListFromAPI(updatedURL);

    // URLForFiltersHandler();
  };

  const redirectToHome = () => {
    router.push(`${CONSTANTS.API_BASE_URL}app`);
  };

  // useEffect(() => {
  //   const url = new URL(window.location.href);

  //   // Get the search parameters
  //   const searchParams = url.searchParams;
  //   // Convert the search parameters to a string
  //   const searchParamsString = searchParams.toString();

  //   const keyValuePairs = searchParamsString.split('&');

  //   // Create an object to store the updated state
  //   const updatedFiltersData: any = {
  //     search: '',
  //     name: '',
  //     parent_melting_lot: '',
  //     melting_lot: '',
  //     product_purity: '',
  //     product: '',
  //     product_process: '',
  //     operation_department: '',
  //     // product_process_department: '',
  //     karigar: '',
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
  //   // getOperationCardListFromAPI(searchParamsString);
  //   // URLForFiltersHandler();
  // }, [searchParams]);

  return (
    <div className="container-fuild">
      {/* <div className="row spacing-pd mt-3">
        <div className="col-md-10"></div>
        <div className="col-md-2 text-end">
          <button
            className="btn btn-blue fs-13 px-4 px-1 btn-py "
            onClick={redirectToHome}
          >
            Home
          </button>
        </div>
      </div> */}
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
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          showZeroBalance={showZeroBalance}
          selectAllCheckbox={selectAllCheckbox}
          handleButtonFilter={handleButtonFilter}
          premittedProducts={premittedProducts}
          handleDepartmentDropdown={handleDepartmentDropdown}
          departmentValue={departmentValue}
          handleDepartmentChange={handleDepartmentChange}
          handleOptionClick={handleOptionClick}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          onDepartmentFocusValue={onDepartmentFocusValue}
          filteredDepartments={filteredDepartments}
          departmentInput={departmentInput}
          dropdownRef={dropdownRef}
          isProcessDropOpen={isProcessDropOpen}
          setIsProcessDropOpen={setIsProcessDropOpen}
          handleProcessKeyDownEnter={handleProcessKeyDownEnter}
          processInput={processInput}
          processValue={processValue}
          filterProcess={filterProcess}
          handleProcessOptionClick={handleProcessOptionClick}
          handleProcessChange={handleProcessChange}
          onProcessFocusVisible={onProcessFocusVisible}
          processRef={processRef}
          isLoading={isLoading}
        />
        <div className="spacing-mt">
          <OperationCardListingTable data={listData} handleApprove={handleApprove} selectAllCheckbox={selectAllCheckbox} />
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingMaster;
