import { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';
import GETProductList from '@/services/api/melting-lot-dashboard-page/get-product-list';
import { useRouter, useSearchParams } from 'next/navigation';

const useMeltingLot = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [meltingFiltersList, setMeltingFiltersList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [meltingLotList, setMeltingLotList] = useState<any>([]);
  const { token } = useSelector(get_access_token);
  const initialFilterOptions = {
    product: searchParams.get('product') || '',
    product_category: searchParams.get('product_category') || '',
    machine_size: searchParams.get('machine_size') || '',
    design_code: searchParams.get('design_code') || '',
    cutting_process: searchParams.get('cutting_process') || '',
    status: searchParams.get('status') || '',
    purity: searchParams.get('purity') || '',
    design: searchParams.get('design') || '',
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

  // Dropdown
  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingFilters(token);
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

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Table Data
  const getMeltingLotListFromAPI = async () => {
    const getMeltingLotList = await GETMeltingLotList({
      token,
      filterOptions: filterOptions,
    });
    if (getMeltingLotList?.status === 200) {
      setMeltingLotList(getMeltingLotList?.data?.message?.data);
    } else {
      setMeltingLotList([]);
    }
  };

  const handleProductBtnClicked = (products: any) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      product: products,
    }));
  };

  useEffect(() => {
    getProductListFromAPI();
    getMeltingFiltersFromAPI();
    getMeltingLotListFromAPI();
  }, []);

  useEffect(() => {
    updateUrlWithFilters();
    getMeltingLotListFromAPI();
  }, [filterOptions]);

  return {
    meltingLotList,
    meltingFiltersList,
    filterOptions,
    handleFilterChange,
    productList,
    handleProductBtnClicked,
  };
};

export default useMeltingLot;
