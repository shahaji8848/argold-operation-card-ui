'use client';
import React from 'react';
import LossReportTable from './LossReportTable';
import LossReport from './LossReport';
import useReportLoss from '@/hooks/report-loss-hook';
import LossReportItem from './LossReportItem';
import PerKgLossWithoutVatav from './PerKgLossWithoutVatav';
import PerKgLossWithVatav from './PerKgLossWithVatav';

const MasterLossReport = () => {
  const {
    reportLossData,
    reportLossItem,
    lossPeriodList,
    selectedLossPeriodValue,
    setSelectedLossPeriodValue,
    handleLossPeriodValuesChange,
    handleFactoryValuesChange,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
    convertFunc,
    handleTransferAPI,
    CalculateTotalOfLossReport,
    CalculateTotalOfReportItem,
    totalBalanceOFLossReportItem,
    difference_of_unrecoverableloss_and_outweight,
    factoryList,
    financialYearList,
    handleFinancialYearValuesChange,
    getFinancialYearValueFromURL,
    perKgLossVatav,
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
            factoryList={factoryList}
            financialYearList={financialYearList}
            handleFinancialYearValuesChange={handleFinancialYearValuesChange}
            getFinancialYearValueFromURL={getFinancialYearValueFromURL}
          />
          <LossReportTable
            reportLossData={reportLossData}
            selectedLossPeriodValue={selectedLossPeriodValue}
            getFinancialYearValueFromURL={getFinancialYearValueFromURL}
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

            {difference_of_unrecoverableloss_and_outweight != 0 && (
              <div className="col-md-7">
                <div className="mt-2 border rounded w-75 p-3">
                  <table>
                    <tr>
                      <td>Total Unrecoverable Loss: &nbsp;</td>
                      <td>
                        <b>{difference_of_unrecoverableloss_and_outweight} &nbsp;</b>
                      </td>
                      {(parseFloat(totalBalanceOFLossReportItem) < 0.2 && parseFloat(totalBalanceOFLossReportItem) > -0.2 )||
                        (totalBalanceOFLossReportItem === '--' && (
                          <td className="">
                            <button
                              className="btn text-capitalize btn-link fs-16"
                              type="button"
                              onClick={() => handleTransferAPI()}
                            >
                              Transfer
                            </button>
                          </td>
                        ))}
                    </tr>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="row mt-2">
            <div className="col-md-5">
              <PerKgLossWithVatav perKgLossVatav={perKgLossVatav} />
            </div>
            {/* <div className="col-md-2"></div> */}
            <div className="col-md-5">
              <PerKgLossWithoutVatav perKgLossVatav={perKgLossVatav} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
