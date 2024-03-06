'use client';
import React from 'react';
import LossReportDetailTable from './LossReportDetailTable';
import useReportLossDetail from '@/hooks/report-loss-detail.hooks';

const MasterLossReportDetail = () => {
  const {
    reportLossDetailData,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
  } = useReportLossDetail();
  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12 ">
          <LossReportDetailTable
            reportLossDetailData={reportLossDetailData}
            getLossPeriodValueFromURL={getLossPeriodValueFromURL}
            getFactoryValueFromURL={getFactoryValueFromURL}
          />
        </div>
      </div>
    </div>
  );
};

export default MasterLossReportDetail;
