'use client';
import React from 'react';
import LossReportDetail from './LossReportDetailTable';
import LossReportDetailTable from './LossReportDetailTable';
import useReportLossDetail from '@/hooks/report-loss-detail.hooks';

const MasterLossReportDetail = () => {
  const { reportLossDetailData } = useReportLossDetail();
  console.log('Master reportLossDetailData', reportLossDetailData);
  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12 ">
          <LossReportDetailTable reportLossDetailData={reportLossDetailData} />
        </div>
      </div>
    </div>
  );
};

export default MasterLossReportDetail;
