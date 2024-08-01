import POSTApproveAPI from '@/services/api/operation-card-list-page/approve-post-api';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import GETPremittedUserAPI from '@/services/api/operation-card-list-page/premitted-user-api';
import { get_access_token, storeToken } from '@/store/slice/login-slice';
import { FieldTypes } from '@/types/oc-list-input-field-types';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useOperationCardList = () => {
  const { token, username } = useSelector(get_access_token);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [listData, setListData] = useState<any>([]);

  const [filtersClear, setFiltersClear] = useState(0);
  const [checked, setChecked] = useState(false);
  const [premittedProducts, setPremittedProducts] = useState([]);
  const [filtersData, setFiltersData] = useState<FieldTypes>({
    search: '',
    name: '',
    parent_melting_lot: '',
    melting_lot: '',
    product_purity: '',
    product: '',
    operation_department: '',
    product_process_department: '',
    karigar: '',
    // show_zero_balance: 0 || 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    // console.log('val', e.target.checked, fieldName);
    // if (fieldName === 'show_zero_balance') {
    //   setFiltersData((prevFiltersData: any) => ({
    //     ...prevFiltersData,
    //     [fieldName]: e.target.checked ? 1 : 0,
    //   }));
    // } else {
    // }

    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      [fieldName]: e.target.value,
    }));
  };

  const constructUrl = (filtersData: any) => {
    const currentUrl = new URL(window.location.href);
    const queryString = Object.entries(filtersData)
      .filter(([key, value]: any) => value !== '')
      .map(([key, value]: any) => `${key}=${value}`)
      .join('&');
    // Return the updated URL
    return `${currentUrl.pathname}?${queryString}`;
  };

  const URLForFiltersHandler = () => {
    const getconstructedUrl: any = constructUrl(filtersData);

    router.push(`${getconstructedUrl}`);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      URLForFiltersHandler();
    }
  };
  const handleApplyFilters = () => {
    URLForFiltersHandler();
  };

  const handleButtonFilter = (searchValue: any) => {
    const currentURLValue = window.location.href;
    // Construct the new URL
    const newURL = new URL(currentURLValue);
    // Handle spaces in searchValue
    const encodedSearchValue = encodeURIComponent(searchValue);
    // newURL.searchParams.set('product', encodedSearchValue);
    const newURLWithParam = `${newURL.pathname}?product=${encodedSearchValue}`;
    router.push(newURLWithParam);
  };

  const handelCheckbox = () => {
    URLForFiltersHandler();
  };
  useEffect(() => {
    const url = new URL(window.location.href);

    // Get the search parameters
    const searchParams = url.searchParams;
    // Convert the search parameters to a string
    const searchParamsString = searchParams.toString();

    const keyValuePairs = searchParamsString.split('&');

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
      // show_zero_balance: false,
    };

    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key in updatedFiltersData) {
        // Replace '+' with space before updating the state
        updatedFiltersData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
      }
    });

    // Update the state with the new values
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      ...updatedFiltersData,
    }));

    getOperationCardListFromAPI(searchParamsString);

    // URLForFiltersHandler();
  }, [searchParams]);

  const handleClearFilters = async () => {
    await setFiltersData({
      search: '',
      name: '',
      parent_melting_lot: '',
      melting_lot: '',
      product_purity: '',
      product: '',
      operation_department: '',
      product_process_department: '',
      karigar: '',
      // show_zero_balance: false,
    });

    setFiltersClear(1);
  };
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token, username);
    if (getList?.status === 200 && getList?.data?.message?.length > 0) {
      setListData([...getList?.data?.message]);
    } else {
      setListData([]);
    }
    setFiltersClear(0);
  };

  useEffect(() => {
    if (filtersClear === 1) {
      const currentUrl = new URL(window.location.href);
      router.push(`${currentUrl.pathname}`);
    }
  }, [filtersClear]);

  const PremittedProductAPI = async () => {
    const getPremittedList = await GETPremittedUserAPI(token, username);
    if (getPremittedList?.status === 200 && getPremittedList?.data?.message?.data?.permitted_products?.length > 0) {
      setPremittedProducts(getPremittedList?.data?.message?.data?.permitted_products);
    } else {
      setPremittedProducts([]);
    }
  };

  useEffect(() => {
    PremittedProductAPI();
  }, []);

  const handleApprove = async (rowData: any) => {
    console.log('clicked', rowData);
    const saveApprove = await POSTApproveAPI(rowData, token);
    console.log('saveApprove', saveApprove);
    if (saveApprove.status === 200) {
      window.location.reload();
    } else {
      // toast.error(saveApprove?.response?.data?.exc_type);
      toast.error(saveApprove?.message);
    }
  };

  return {
    listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    URLForFiltersHandler,
    constructUrl,
    handelCheckbox,
    handleButtonFilter,
    premittedProducts,
    handleApprove,
  };
};

export default useOperationCardList;
