import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import { get_access_token } from '@/store/slice/login-slice';
import { useSearchParams, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useOperationCardList = () => {
  const { token } = useSelector(get_access_token);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [listData, setListData] = useState<any>([]);

  const [filtersClear, setFiltersClear] = useState(0);

  // const urlParams = new URLSearchParams(window.location.search);
  // const searchUrl = urlParams.get('search') || '';
  // const router = useRouter()
  const [filtersData, setFiltersData] = useState<any>({
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

  // const constructUrl = (filtersData: any) => {
  //   console.log('filtersData', filtersData);
  //   const urlParams = new URLSearchParams({
  //     search: `${searchParams.get('search')}`,
  //   });

  //   Object.entries(filtersData).forEach(([key, value]: any) => {
  //     if (value !== '') {
  //       urlParams.append(key, value);
  //     }
  //   });

  //   console.log('urlParams', urlParams.toString());

  //   return `${window.location.pathname}?${urlParams.toString()}`;
  // };

  const constructUrl = (filtersData: any) => {
    const currentUrl = new URL(window.location.href);
    const urlParams = new URLSearchParams(currentUrl.search);

    // Check if the 'search' parameter already exists
    if (!urlParams.has('search')) {
      urlParams.set('search', searchParams.get('search') || ''); // Add 'search' from the original URL if it exists
    }

    // Add or update other parameters from filtersData
    Object.entries(filtersData).forEach(([key, value]: any) => {
      if (value !== '') {
        // Check if the parameter already exists
        if (urlParams.has(key)) {
          urlParams.set(key, value);
        } else {
          urlParams.append(key, value);
        }
      }
    });

    // Return the updated URL
    return `${currentUrl.pathname}?${urlParams.toString()}`;
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

    console.log('searchParams', searchParams);
    // Convert the search parameters to a string
    const searchParamsString = searchParams.toString();
    console.log('searchParamsString', searchParamsString);

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

    // Iterate through key-value pairs and update the state
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key in updatedFiltersData) {
        updatedFiltersData[key] = value;
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
      // getOperationCardListFromAPI();

      const url: any = new URL(window.location.href);

      // Keep only the 'search' parameter
      const searchValue = url.searchParams.get('search');
      url.search = new URLSearchParams({ search: searchValue }).toString();

      const clearedALlParamsFromURL = url.toString();

      router.push(`${clearedALlParamsFromURL}`);
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
