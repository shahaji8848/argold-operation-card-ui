import GETMeltingPlan from '@/services/api/melting-lot-dashboard-page/get-view-sales-order';
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

  // const initialFilterOptions = {
  //   product: searchParams.get('product') || '',
  //   product_category: searchParams.get('product_category') || '',
  //   machine_size: searchParams.get('machine_size') || '',
  //   design_code: searchParams.get('design_code') || '',
  //   purity: searchParams.get('purity') || '',
  //   design: searchParams.get('design') || '',
  // };
  const initialFilterOptions = {
    product: '',
    product_category: '',
    machine_size: '',
    design_code: '',
    purity: '',
    design: '',
  };

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
  const [meltingFiltersList, setMeltingFiltersList] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>({});

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

  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingPlan({ token, filterOptions: filterOptions });
    if (getMeltingFiltersData?.status === 200) {
      const res = getMeltingFiltersData?.data?.message;
      setMeltingFiltersList(res);
      setFilteredData({
        product: res?.product || [],
        product_category: res?.product_category || [],
        machine_size: res?.machine_size,
        cust_name: res?.cust_name,
        design: res?.design,
        purity: res?.purity,
      });
    } else {
      setMeltingFiltersList([]);
    }
  };

  //   updateUrlWithFilters();
  //   getMeltingFiltersFromAPI();
  // }, []);

  useEffect(() => {
    getMeltingFiltersFromAPI();
  }, []);
  return {
    filterOptions,
    setFilterOptions,
    handleFilterChange,
    meltingFiltersList,
    filteredData,
    setFilteredData,
  };
};

export default useMeltingViewHook;
