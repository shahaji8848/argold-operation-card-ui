import { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';

const useMeltingLot = () => {
  const [productOption, setProductOption] = useState('');
  const [categoryOption, setCategoryOption] = useState('');
  const [machineSizeOption, setMachineSizeOption] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [cuttingProcessOption, setCuttingProcessOption] = useState('');
  const [statusOption, setStatusOption] = useState('');
  const [purityOption, setPurityOption] = useState('');
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

  const handleProductChange = (e: any) => {
    setProductOption(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setCategoryOption(e.target.value);
  };

  const handleMachineSizeChange = (e: any) => {
    setMachineSizeOption(e.target.value);
  };
  const handleDesignChange = (e: any) => {
    setDesignOption(e.target.value);
  };
  const handleCuttingProcessChange = (e: any) => {
    setCuttingProcessOption(e.target.value);
  };
  const handleStatusChange = (e: any) => {
    setStatusOption(e.target.value);
  };

  const handlePurityChange = (e: any) => {
    setPurityOption(e.target.value);
  };

  const getMeltingLotListFromAPI = async () => {
    const getMeltingLotList = await GETMeltingLotList({
      token,
      productOption,
      categoryOption,
      machineSizeOption,
      designOption,
      cuttingProcessOption,
      purityOption,
      statusOption,
    });
    if (getMeltingLotList?.status === 200) {
      setMeltingLotList(getMeltingLotList?.data?.message?.data);
    } else {
      setMeltingLotList([]);
    }
  };
  useEffect(() => {
    getMeltingFiltersFromAPI();
  }, []);
  useEffect(() => {
    getMeltingLotListFromAPI();
  }, [productOption, categoryOption, machineSizeOption, designOption, cuttingProcessOption, statusOption, purityOption]);

  return {
    meltingLotList,
    meltingFiltersList,
    productOption,
    categoryOption,
    machineSizeOption,
    designOption,
    cuttingProcessOption,
    statusOption,
    purityOption,
    handleProductChange,
    handleCategoryChange,
    handleMachineSizeChange,
    handleDesignChange,
    handleCuttingProcessChange,
    handleStatusChange,
    handlePurityChange,
  };
};

export default useMeltingLot;
