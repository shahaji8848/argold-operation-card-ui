import {GETMeltingPlan , GETSalesOrder} from '@/services/api/melting-lot-dashboard-page/get-view-sales-order';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import { get_access_token } from '@/store/slice/login-slice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface FilterOptions {
  product_category?: string;
  machine_size?: string;
  purity?: string;
  design?: string;
  cust_name?: string;
  product: string;
}

const useMeltingViewHook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useSelector(get_access_token);


  const initialFilterOptions = {
    product: searchParams.get('product') || '',
    product_category: searchParams.get('product_category') || '',
    machine_size: searchParams.get('machine_size') || '',
    design_code: searchParams.get('design_code') || '',
    purity: searchParams.get('purity') || '',
    design: searchParams.get('design') || '',
    cust_name:searchParams.get("cust_name") || ""
  };

//for storing current selected filters
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
// to store all the options
  const [meltingFiltersList, setMeltingFiltersList] = useState<any>([]);
  //for shwing data in Tabel 
  const [dataForSalesOrder, setDataForSalesOrder] = useState<any>()
  

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
    console.log(name,value,"in hooks")
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingPlan({ token, filterOptions: filterOptions });
    if (getMeltingFiltersData?.status === 200) {
      const res = getMeltingFiltersData?.data?.message;
      setMeltingFiltersList(res);
    } else {
      setMeltingFiltersList([]);
    }
  };

  const handleGetSalesOrders = async()=>{
     const getSalesOrder = await GETSalesOrder({ token, filterOptions: filterOptions})
     if (getSalesOrder?.status === 200) {
      const res = getSalesOrder?.data?.message
      console.log(res,"resssssssssssssssssssss")
      setDataForSalesOrder(res)
     }else{
      setDataForSalesOrder([])
     }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      updateUrlWithFilters();
      getMeltingFiltersFromAPI();
    }, 300); 

    return () => {
      clearTimeout(handler); 
    };
  }, [filterOptions]);

  useEffect(() => {
    getMeltingFiltersFromAPI();
  }, []);
  return {
    filterOptions,
    setFilterOptions,
    handleFilterChange,
    meltingFiltersList,
    handleGetSalesOrders,
    dataForSalesOrder,
  };
};

export default useMeltingViewHook;
