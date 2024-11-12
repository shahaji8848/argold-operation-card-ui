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

  const {
    // listData,
    filtersData,
    handleInputChange,
    // handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    URLForFiltersHandler,
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
    processInput,
    handleProcessChange,
    onProcessFocusVisible,
    handleProcessKeyDownEnter,
    isProcessDropOpen,
    handleProcessOptionClick,
    processValue,
    processRef,
  } = useOperationCardList();

  const { token, username } = useSelector(get_access_token);
  const [data, setData] = useState(filtersData);
  const [showZeroBalance, setShowZeroBalance] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState<any>(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [listData, setListData] = useState<any>([]);
  const searchParams = useSearchParams();
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token, username);
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
  };
  const handleSelectAllCheckbox: any = () => {
    setSelectAllCheckbox((prevSelectAll: any) => {
      const newSelectAll = !prevSelectAll;
      if (newSelectAll) {
        // Select all rows
        setSelectedRows(listData?.length > 0 && listData?.map((row: any) => row?.name));
      } else {
        // Deselect all rows
        setSelectedRows([]);
      }
      return newSelectAll;
    });
  };

  const handleCheckboxInput = (rowName: string) => {
    setSelectedRows((prevSelectedRows: any) => {
      if (prevSelectedRows?.includes(rowName)) {
        // If the row is already selected, remove it from the array
        const updatedRows = prevSelectedRows?.length > 0 && prevSelectedRows.filter((name: any) => name !== rowName);
        // Deselect "Select All" if any individual checkbox is unchecked
        setSelectAllCheckbox(updatedRows?.length === listData?.length);
        return updatedRows;
      } else {
        // Otherwise, add the row to the array
        const updatedRows = [...prevSelectedRows, rowName];
        // Check "Select All" if all rows are selected
        setSelectAllCheckbox(updatedRows?.length === listData?.length);
        return updatedRows;
      }
    });
  };

  const handleApplyFilters = () => {
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
      bom_code: '',
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
    getOperationCardListFromAPI(updatedURL);

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

  //   setData((prevFiltersData: any) => ({
  //     ...prevFiltersData,
  //     ...updatedFiltersData,
  //   }));

  //   getOperationCardListFromAPI(searchParamsString);
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
          processInput={processInput}
          handleProcessChange={handleProcessChange}
          onProcessFocusVisible={onProcessFocusVisible}
          handleProcessKeyDownEnter={handleProcessKeyDownEnter}
          isProcessDropOpen={isProcessDropOpen}
          handleProcessOptionClick={handleProcessOptionClick}
          processValue={processValue}
          processRef={processRef}
        />
        <div className="spacing-mt">
          <OperationCardListingTable
            data={listData}
            handleApprove={handleApprove}
            handleCheckboxInput={handleCheckboxInput}
            selectedRows={selectedRows}
          />
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingMaster;