import React, { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';

const useMeltingLot = () => {
  const [categoryOneOption, setCategoryOneOption] = useState('');
  const [machineSizeOption, setMachineSizeOption] = useState('');
  const [chainMakingOption, setChainMakingOption] = useState('');
  const [filterPurityOption, setFilterPurityOption] = useState('');
  const [meltingFiltersList, setMeltingFiltersList] = <any>useState([]);
  const [meltingLotList, setMeltingLotList] = useState<any>([]);
  const { token } = useSelector(get_access_token);

  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingFilters(token);
    setMeltingFiltersList;
    if (getMeltingFiltersData?.status === 200) {
      setMeltingFiltersList(getMeltingFiltersData?.data?.message);
    } else {
      setMeltingFiltersList([]);
    }
  };

  const handleCategoryOneChange = (e: any) => {
    setCategoryOneOption(e.target.value);
  };

  const handleMachineSizeChange = (e: any) => {
    setMachineSizeOption(e.target.value);
  };

  const handleChainMakingChange = (e: any) => {
    setChainMakingOption(e.target.value);
  };

  const handleFilterPurityChange = (e: any) => {
    setFilterPurityOption(e.target.value);
  };

  const getMeltingLotListFromAPI = async () => {
    const getMeltingLotList = await GETMeltingLotList(token);
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

  return {
    meltingLotList,
    meltingFiltersList,
    categoryOneOption,
    machineSizeOption,
    chainMakingOption,
    filterPurityOption,
    handleCategoryOneChange,
    handleMachineSizeChange,
    handleChainMakingChange,
    handleFilterPurityChange,
  };
};

export default useMeltingLot;
