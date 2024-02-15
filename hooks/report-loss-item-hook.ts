'use client';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import GETReportLossItem from '@/services/api/operation-card-report-loss/report-loss-item-api';
import { get_access_token } from '@/store/slice/login-slice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useReportLoss = () => {
  const { token } = useSelector(get_access_token);
  const [reportLossItem, setReportLossItem] = useState([]);
  const getReportLossItem = async () => {
    const fetchReportLossItem: any = await GETReportLossItem(token);

    if (fetchReportLossItem?.status === 200) {
      setReportLossItem(fetchReportLossItem?.data?.message);
    } else {
      setReportLossItem([]);
    }
  };
  console.log('reportLossData', reportLossItem);

  useEffect(() => {
    getReportLossItem();
  }, []);

  return {
    reportLossItem,
  };
};

export default useReportLoss;
