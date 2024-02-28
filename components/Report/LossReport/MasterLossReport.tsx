'use client';
import React from 'react';
import LossReportTable from './LossReportTable';
import LossReport from './LossReport';
import useReportLoss from '@/hooks/report-loss-hook';
import LossReportItem from './LossReportItem';

const MasterLossReport = () => {
  const {
    reportLossData,
    reportLossItem,
    lossPeriodList,
    selectedLossPeriodValue,
    setSelectedLossPeriodValue,
  } = useReportLoss();

  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12">
          <LossReport
            lossPeriodList={lossPeriodList}
            setSelectedLossPeriodValue={setSelectedLossPeriodValue}
          />
          <LossReportTable
            reportLossData={reportLossData}
            selectedLossPeriodValue={selectedLossPeriodValue}
          />
          <div className="row">
            <div className="col-md-5">
              <LossReportItem reportLossItem={reportLossItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
