import { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';

const useMeltingLot = () => {
  const [meltingFiltersList, setMeltingFiltersList] = <any>useState([]);
  const [meltingLotList, setMeltingLotList] = useState<any>([]);
  const { token } = useSelector(get_access_token);
  const [filterOptions, setFilterOptions] = useState({
    productOption: '',
    categoryOption: '',
    machineSizeOption: '',
    designOption: '',
    cuttingProcessOption: '',
    statusOption: '',
    purityOption: '',
  });

  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingFilters(token);
    setMeltingFiltersList;
    if (getMeltingFiltersData?.status === 200) {
      setMeltingFiltersList(getMeltingFiltersData?.data?.message);
    } else {
      setMeltingFiltersList([]);
    }
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  useEffect(() => {
    getMeltingFiltersFromAPI();
    getMeltingLotListFromAPI();
  }, []);
  useEffect(() => {
    getMeltingLotListFromAPI();
  }, [filterOptions]);

  return {
    meltingLotList,
    meltingFiltersList,
    filterOptions,
    handleFilterChange,
  };
};

export default useMeltingLot;
