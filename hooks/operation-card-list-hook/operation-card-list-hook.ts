import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const useOperationCardList = () => {
  const searchParams = useSearchParams();
  const [listData, setListData] = useState<any>([]);

  const [filtersClear, setFiltersClear] = useState(0);

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

  const handleKeyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyFilters();
    }
  };

  const handleApplyFilters = () => {
    getOperationCardListFromAPI();
  };

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
    });

    setFiltersClear(1);
  };
  const getOperationCardListFromAPI = async () => {
    const getList: any = await GETOperationCardListData(
      searchParams.get('search'),
      filtersData
    );
    if (getList?.status === 200 && getList?.data?.message?.length > 0) {
      setListData([...getList?.data?.message]);
    } else {
      setListData([]);
    }
  };

  useEffect(() => {
    getOperationCardListFromAPI();
  }, []);

  useEffect(() => {
    if (filtersClear === 1) {
      getOperationCardListFromAPI();
    }
  }, [filtersClear]);
  return {
    listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
  };
};

export default useOperationCardList;
