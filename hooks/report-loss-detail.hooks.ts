'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import GETOperationCardReportLossDetail from '@/services/api/operation-card-report-loss/operation-card-report-detail';
import { get_access_token } from '@/store/slice/login-slice';

const useReportLossDetail = () => {
  const { token } = useSelector(get_access_token);
  const [reportLossDetailData, setreportLossDetailData] = useState([]);
  const searchParams = useSearchParams();
  const getFinancialYearValueFromURL: string | null = searchParams.get('financial_year');
  const getLossPeriodValueFromURL: string | null = searchParams.get('loss_period');
  const getFactoryValueFromURL: string | null = searchParams.get('factory');

  const getReportLossDetailData = async () => {
    const url = new URL(window.location.href);
    const department_group: any = url.searchParams.get('department_group');
    const financial_year: any = url.searchParams.get('financial_year');
    const loss_period: any = url.searchParams.get('loss_period');
    const factory: any = url.searchParams.get('factory');
    const hrefValue = window.location.href;
    const splitVal = hrefValue.split('=');

    const fetchReportLossDetailData: any = await GETOperationCardReportLossDetail(
      token,
      department_group,
      financial_year,
      loss_period,
      factory
    );

    if (fetchReportLossDetailData?.status === 200) {
      setreportLossDetailData(fetchReportLossDetailData?.data?.message);
    } else {
      setreportLossDetailData([]);
    }
  };

  useEffect(() => {
    getReportLossDetailData();
  }, [searchParams]);

  return {
    reportLossDetailData,
    getFinancialYearValueFromURL,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
  };
};

export default useReportLossDetail;
