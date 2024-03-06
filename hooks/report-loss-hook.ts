'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import GETLossPeriodList from '@/services/api/loss-period/loss-period-api';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import GETReportLossItem from '@/services/api/operation-card-report-loss/report-loss-item-api';
import { get_access_token } from '@/store/slice/login-slice';

const useReportLoss = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getLossPeriodValueFromURL: string | null =
    searchParams.get('loss_period');
  const getFactoryValueFromURL: string | null = searchParams.get('factory');
  const { token } = useSelector(get_access_token);
  const [lossPeriodList, setLossPeriodList] = useState<any>([]);
  const [reportLossData, setReportLossData] = useState([]);
  const [reportLossItem, setReportLossItem] = useState([]);
  const [selectedLossPeriodValue, setSelectedLossPeriodValue] =
    useState<string>('');
  const [selectedFactoryValue, setSelectedFactoryValue] = useState<string>('');

  const getLossPeriodList = async () => {
    const getLossReportListDataFromAPI = await GETLossPeriodList(token);
    if (getLossReportListDataFromAPI?.status === 200) {
      setLossPeriodList(getLossReportListDataFromAPI?.data?.data);
    } else {
      setLossPeriodList([]);
    }
  };

  const getReportLossItem = async () => {
    const fetchReportLossItem: any = await GETReportLossItem(token);

    if (fetchReportLossItem?.status === 200) {
      setReportLossItem(fetchReportLossItem?.data?.message);
    } else {
      setReportLossItem([]);
    }
  };

  const getReportLossData = async () => {
    const fetchReportLossData: any = await GETOperationCardReportLoss(
      getLossPeriodValueFromURL,
      getFactoryValueFromURL,
      token
    );

    if (fetchReportLossData?.status === 200) {
      setReportLossData(fetchReportLossData?.data?.message);
    } else {
      setReportLossData([]);
    }
  };

  const handleLossPeriodValuesChange = (lossPeriodValue: any) => {
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Check if 'loss_period' parameter exists
    if (queryParams.has('loss_period')) {
      // Override the existing value
      queryParams.set('loss_period', lossPeriodValue);
    }
    queryParams.forEach((value, key) => {
      queryParams.set(key, value.replace(/\+/g, '%20'));
    });

    // Update the URL with the modified query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    router.push(`${decodeURI(newUrl)}`);
  };

  const handleFactoryValuesChange = (factoryValue: any) => {
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Check if 'loss_period' parameter exists
    if (queryParams.has('factory')) {
      // Override the existing value
      queryParams.set('factory', factoryValue);
    }
    queryParams.forEach((value, key) => {
      queryParams.set(key, value.replace(/\+/g, '%20'));
    });

    // Update the URL with the modified query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    router.push(`${decodeURI(newUrl)}`);
  };

  useEffect(() => {
    getReportLossData();
    getReportLossItem();
  }, [searchParams]);

  useEffect(() => {
    getLossPeriodList();
  }, []);

  return {
    reportLossData,
    reportLossItem,
    lossPeriodList,
    selectedLossPeriodValue,
    selectedFactoryValue,
    setSelectedLossPeriodValue,
    handleLossPeriodValuesChange,
    handleFactoryValuesChange,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
  };
};

export default useReportLoss;
