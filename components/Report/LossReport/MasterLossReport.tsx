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
    CalculateTotalOfLossReport,
    CalculateTotalOfReportItem,
    ObjToStoreLossReportTable,
    ObjToStoreLossReportItem,
  } = useReportLoss();

  // const totalUnrecoverableLoss = CalculateTotalOfReportItem(
  //   'uncrecoverable_loss',
  //   reportLossData || []
  // );
  // console.log(totalUnrecoverableLoss, 'totalOutWeights');

  // const totalOutWeight = CalculateTotalOfReportItem(
  //   'out_weight',
  //   reportLossItem || []
  // );
  // console.log(totalOutWeight, 'totalOutWeights');

  // let DifferenceUnrecoverableLoss;
  // if (totalUnrecoverableLoss !== '--' && totalOutWeight !== '--') {
  //   DifferenceUnrecoverableLoss = totalUnrecoverableLoss - totalOutWeight;
  // } else {
  //   DifferenceUnrecoverableLoss = '--';
  // }

  // console.log(DifferenceUnrecoverableLoss, 'totalOutWeights');

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
            CalculateTotalOfLossReport={CalculateTotalOfLossReport}
          />
          <div className="row">
            <div className="col-md-5">
              <LossReportItem
                reportLossItem={reportLossItem}
                getLossPeriodValueFromURL={getLossPeriodValueFromURL}
                getFactoryValueFromURL={getFactoryValueFromURL}
                convertFunc={convertFunc}
                CalculateTotalOfReportItem={CalculateTotalOfReportItem}
              />
            </div>
            {/* <div className="col-md-4">
              <p className="mb-0 pb-0">
                Unrecoverable loss for {getLossPeriodValueFromURL}
              </p>

              <span>
                {ObjToStoreLossReportTable?.uncrecoverable_loss -
                  ObjToStoreLossReportItem?.out_weight}
              </span>
              <button
                className="btn  text-capitalize btn-link fs-13"
                type="button"
              >
                Transfer
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
