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
    difference_of_unrecoverableloss_and_outweight,
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
  
            {difference_of_unrecoverableloss_and_outweight !=0 && <div className="col-md-7">
              <div className='mt-2 border rounded w-75 p-3' style={{borderColor:'#DEE2E6 !important'}}>
                <table>
                  <tr>
                    <td>
                      Total Unrecoverable Loss:  &nbsp;
                    </td>
                    <td>
                      <b> {difference_of_unrecoverableloss_and_outweight} &nbsp;</b>
                    </td>
                    <td className=''>
                     <a href='transfer'> Transfer </a>
                    </td>
                  </tr>
                 
                </table>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
