'use client';
import GETOperationCardReportLossDetail from '@/services/api/operation-card-report-loss/operation-card-report-detail';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import { get_access_token } from '@/store/slice/login-slice';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useReportLossDetail = () => {
  const { token } = useSelector(get_access_token);
  const [reportLossDetailData, setreportLossDetailData] = useState([]);
  const searchParams = useSearchParams();
  const search: any = searchParams.get('name');
  console.log('search', search);
  const getReportLossDetailData = async () => {
    console.log('search +', encodeURI(search));
    console.log('search +', window.location.href);
    const hrefValue = window.location.href;
    const splitVal = hrefValue.split('=');
    console.log('search + split', splitVal[1]);
    const fetchReportLossDetailData: any =
      await GETOperationCardReportLossDetail(token, splitVal[1]);
    console.log('fetchReportLossDetailData', fetchReportLossDetailData);
    if (fetchReportLossDetailData?.status === 200) {
      setreportLossDetailData(fetchReportLossDetailData?.data?.message?.data);
    } else {
      setreportLossDetailData([]);
    }
  };
  console.log('reportLossDetailData', reportLossDetailData);

  useEffect(() => {
    getReportLossDetailData();
  }, []);

  return {
    reportLossDetailData,
  };
};

export default useReportLossDetail;
