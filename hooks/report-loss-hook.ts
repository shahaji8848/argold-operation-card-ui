'use client';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import { get_access_token } from '@/store/slice/login-slice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useReportLoss = () => {
  const { token } = useSelector(get_access_token);
  const [reportLossData, setReportLossData] = useState([]);
  const getReportLossData = async () => {
    const fetchReportLossData: any = await GETOperationCardReportLoss(token);

    if (fetchReportLossData?.status === 200) {
      setReportLossData(fetchReportLossData?.data?.message);
    } else {
      setReportLossData([]);
    }
  };
  console.log('reportLossData', reportLossData);

  useEffect(() => {
    getReportLossData();
  }, []);

  return {
    reportLossData,
  };
};

export default useReportLoss;
