'use client';
import React from 'react';
import LossReportTable from './LossReportTable';
import LossReport from './LossReport';
import useReportLoss from '@/hooks/report-loss-hook';
import LossReportItem from './LossReportItem';

const MasterLossReport = () => {
  const { reportLossData, reportLossItem } = useReportLoss();

  console.log(reportLossData, 'abcd');

  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12">
          <LossReport />
          <LossReportTable reportLossData={reportLossData} />
          <LossReportItem reportLossItem={reportLossItem} />
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
