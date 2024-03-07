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
    selectedFactoryValue,
    setSelectedLossPeriodValue,
    handleLossPeriodValuesChange,
    handleFactoryValuesChange,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
    convertFunc,
  } = useReportLoss();

  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12">
          <LossReport
            lossPeriodList={lossPeriodList}
            setSelectedLossPeriodValue={setSelectedLossPeriodValue}
            handleLossPeriodValuesChange={handleLossPeriodValuesChange}
            handleFactoryValuesChange={handleFactoryValuesChange}
            getLossPeriodValueFromURL={getLossPeriodValueFromURL}
            getFactoryValueFromURL={getFactoryValueFromURL}
          />
          <LossReportTable
            reportLossData={reportLossData}
            selectedLossPeriodValue={selectedLossPeriodValue}
            selectedFactoryValue={selectedFactoryValue}
            getLossPeriodValueFromURL={getLossPeriodValueFromURL}
            getFactoryValueFromURL={getFactoryValueFromURL}
          />
          <div className="row">
            <div className="col-md-5">
              <LossReportItem
                reportLossItem={reportLossItem}
                getLossPeriodValueFromURL={getLossPeriodValueFromURL}
                getFactoryValueFromURL={getFactoryValueFromURL}
                convertFunc={convertFunc}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
