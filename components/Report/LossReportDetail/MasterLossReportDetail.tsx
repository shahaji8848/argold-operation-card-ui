'use client';
import React, { useState } from 'react';
import LossReportDetailTable from './LossReportDetailTable';
import useReportLossDetail from '@/hooks/report-loss-detail.hooks';
import useReportLoss from '@/hooks/report-loss-hook';

const MasterLossReportDetail = () => {
  const { reportLossDetailData,
    getFinancialYearValueFromURL,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
  } = useReportLossDetail();

  const {
    financialYearList,
    handleFinancialYearDetailValues,
    lossPeriodList,
    handleLossPeriodValuesChange,
    financialValue
  } = useReportLoss();
  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        <div className="col-md-12 ">
          <LossReportDetailTable
            reportLossDetailData={reportLossDetailData}
            getFinancialYearValueFromURL={getFinancialYearValueFromURL}
            getLossPeriodValueFromURL={getLossPeriodValueFromURL}
            getFactoryValueFromURL={getFactoryValueFromURL}
            financialYearList={financialYearList}
            handleFinancialYearDetailValues={handleFinancialYearDetailValues}
            lossPeriodList={lossPeriodList}
            handleLossPeriodValuesChange={handleLossPeriodValuesChange}
            financialValue={financialValue}
          />
        </div>
      </div>
    </div>
  );
};

export default MasterLossReportDetail;
