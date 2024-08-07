import { useEffect, useState } from 'react';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import { get_access_token } from '@/store/slice/login-slice';
import { useSelector } from 'react-redux';
import GETMeltingButton from '@/services/api/melting-lot-dashboard-page/melting-button';

const useMeltingLot = () => {
  const [meltingFiltersList, setMeltingFiltersList] = <any>useState([]);
  const [buttonLabel, setButtonLabel] = useState([]);
  const [meltingLotList, setMeltingLotList] = useState<any>([]);
  const { token } = useSelector(get_access_token);
  const [filterOptions, setFilterOptions] = useState({
    productOption: '',
    categoryOption: '',
    machineSizeOption: '',
    designCodeOption: '',
    cuttingProcessOption: '',
    statusOption: '',
    purityOption: '',
    designOption: '',
  });

  const getMeltingFiltersFromAPI = async () => {
    const getMeltingFiltersData = await GETMeltingFilters(token);
    if (getMeltingFiltersData?.status === 200) {
      setMeltingFiltersList(getMeltingFiltersData?.data?.message);
    } else {
      setMeltingFiltersList([]);
    }
  };

  const getButtonMeltingLabelFromAPI = async () => {
    const getButtonMeltingLabelData = await GETMeltingButton(token);
    if (getButtonMeltingLabelData?.status === 200) {
      setButtonLabel(getButtonMeltingLabelData?.data?.message?.data);
    } else {
      setButtonLabel([]);
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
    getButtonMeltingLabelFromAPI();
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
    buttonLabel,
  };
};

export default useMeltingLot;
