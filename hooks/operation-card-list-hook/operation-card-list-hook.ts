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
    name: '',
    parent_melting_lot: '',
    melting_lot: '',
    product_purity: '',
    product: '',
    operation_department: '',
    product_process_department: '',
    machine_size: '',
    design: '',
    line_number: '',
    karigar: '',
    balance_weight: '',
    balance_gross_weight: '',
    balance_fine_weight: '',
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
    console.log('url debugging filtersData', filtersData);
    console.log('url debugging searchparams', searchParams);
    const urlParams = new URLSearchParams({
      search: `${searchParams.get('search')}`,
    });

    Object.entries(filtersData).forEach(([key, value]: any) => {
      if (value !== '') {
        urlParams.append(key, value);
      }
    });

    return `${window.location.pathname}?${urlParams.toString()}`;
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

    getOperationCardListFromAPI(searchParamsString);
    // const urlParams = new URLSearchParams(window.location.search);
    // const searchUrl = urlParams.get('search');
    // const searchedValue = searchParamsString.split('=').pop();

    // setFiltersData({
    //   search: searchUrl,
    // });
  }, [searchParams]);

  const handleClearFilters = async () => {
    await setFiltersData({
      name: '',
      parent_melting_lot: '',
      melting_lot: '',
      product_purity: '',
      product: '',
      operation_department: '',
      product_process_department: '',
      machine_size: '',
      design: '',
      line_number: '',
      karigar: '',
      balance_weight: '',
      balance_gross_weight: '',
      balance_fine_weight: '',
      // search: '',
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
