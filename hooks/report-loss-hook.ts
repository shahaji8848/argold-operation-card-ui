'use client';
import GETLossPeriodList from '@/services/api/loss-period/loss-period-api';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import GETReportLossItem from '@/services/api/operation-card-report-loss/report-loss-item-api';
import { get_access_token } from '@/store/slice/login-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useReportLoss = () => {
  const { token } = useSelector(get_access_token);
  const [lossPeriodList, setLossPeriodList] = useState<any>([]);
  const [reportLossData, setReportLossData] = useState([]);
  const [reportLossItem, setReportLossItem] = useState([]);
  const [selectedLossPeriodValue, setSelectedLossPeriodValue] =
    useState<string>('');

  const getLossPeriodList = async () => {
    const getLossReportListDataFromAPI = await GETLossPeriodList(token);
    if (getLossReportListDataFromAPI?.status === 200) {
      setLossPeriodList(getLossReportListDataFromAPI?.data?.data);
    } else {
      setLossPeriodList([]);
    }
  };
  const getReportLossData = async () => {
    const fetchReportLossData: any = await GETOperationCardReportLoss(
      selectedLossPeriodValue,
      token
    );

    if (fetchReportLossData?.status === 200) {
      setReportLossData(fetchReportLossData?.data?.message);
    } else {
      setReportLossData([]);
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

  useEffect(() => {
    getReportLossData();
  }, [selectedLossPeriodValue]);
  useEffect(() => {
    getReportLossItem();
    getReportLossData();
    getLossPeriodList();
  }, []);

  return {
    reportLossData,
    reportLossItem,
    lossPeriodList,
    selectedLossPeriodValue,
    setSelectedLossPeriodValue,
  };
};

export default useReportLoss;
