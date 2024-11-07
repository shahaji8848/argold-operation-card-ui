import { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';
import GETProductList from '@/services/api/melting-lot-dashboard-page/get-product-list';
import { useRouter, useSearchParams } from 'next/navigation';

const useMeltingLot = () => {
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const [meltingFiltersList, setMeltingFiltersList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [meltingLotList, setMeltingLotList] = useState<any>([]);
  const { token } = useSelector(get_access_token);
  let dataLimit = 25;

  const initialFilterOptions = {
    product: searchParams.get('product') || '',
    product_category: searchParams.get('product_category') || '',
    machine_size: searchParams.get('machine_size') || '',
    design_code: searchParams.get('design_code') || '',
    cutting_process: searchParams.get('cutting_process') || '',
    status: searchParams.get('status') || 'Pending(Process)',
    purity: searchParams.get('purity') || '',
    design: searchParams.get('design') || '',
    page: searchParams.get('page') || '',
  };
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);

  const constructUrl = (filterOptions: any) => {
    const currentUrl = new URL(window.location.href);
    const queryString = Object.entries(filterOptions)
      .filter(([key, value]: any) => value !== '')
      .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return `${currentUrl.pathname}?${queryString}`;
  };

  const updateUrlWithFilters = () => {
    const constructedUrl = constructUrl(filterOptions);
    router.push(constructedUrl);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductBtnClicked = (products: any) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      product: products,
    }));
  };
  // Dropdown
  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingFilters({ token, filterOptions: filterOptions });
    if (getMeltingFiltersData?.status === 200) {
      setMeltingFiltersList(getMeltingFiltersData?.data?.message);
    } else {
      setMeltingFiltersList([]);
    }
  };

  // Header button
  const getProductListFromAPI = async () => {
    const getProductListData = await GETProductList(token);
    if (getProductListData?.status === 200) {
      setProductList(getProductListData?.data?.message);
    } else {
      setProductList([]);
    }
  };

  // Table Data
  const getMeltingLotListFromAPI = async (limit_start?: any) => {
    const params = new URLSearchParams(window.location.search);
    const pageFromURL = parseInt(params.get('page') || '1', 10);

    // Calculate limit_start if it's not provided as a parameter
    const calculatedLimitStart = limit_start !== undefined ? limit_start : pageFromURL * dataLimit;

    const getMeltingLotList = await GETMeltingLotList({
      token,
      filterOptions: filterOptions,
      limit_start: calculatedLimitStart,
    });
    if (getMeltingLotList?.status === 200) {
      setMeltingLotList(getMeltingLotList?.data?.message?.data);
    } else {
      setMeltingLotList([]);
    }
  };

  useEffect(() => {
    getProductListFromAPI();
  }, []);

  const handlePageChange = (selectedItem: any) => {
    const selectedPage = selectedItem.selected + 1;
    const params = new URLSearchParams(window.location.search);

    const pathname = window.location.pathname;

    params.set('page', selectedPage.toString());

    // Navigate to the new URL with the updated page query
    window.history.pushState({}, '', `${pathname}?${params}`);

    let start = selectedPage !== 1 ? selectedPage * dataLimit : dataLimit;
    let end = start - dataLimit + 1;
    console.log('pagess', end, start);
    setFilterOptions((prevState) => ({
      ...prevState,
      page: selectedPage,
    }));
    getMeltingLotListFromAPI(start);
  };

  useEffect(() => {
    updateUrlWithFilters();
    getMeltingFiltersFromAPI();
    getMeltingLotListFromAPI();
  }, [filterOptions]);

  return {
    meltingLotList,
    meltingFiltersList,
    filterOptions,
    handleFilterChange,
    productList,
    handleProductBtnClicked,
    handlePageChange,
  };
};

export default useMeltingLot;
