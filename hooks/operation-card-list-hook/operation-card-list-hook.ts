import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import { get_access_token } from '@/store/slice/login-slice';
import { FieldTypes } from '@/types/oc-list-input-field-types';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useOperationCardList = () => {
  const { token } = useSelector(get_access_token);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [listData, setListData] = useState<any>([]);

  const [filtersClear, setFiltersClear] = useState(0);
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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
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
    });

    setFiltersClear(1);
  };
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token);
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

  return {
    listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    URLForFiltersHandler,
    constructUrl,
  };
};

export default useOperationCardList;
