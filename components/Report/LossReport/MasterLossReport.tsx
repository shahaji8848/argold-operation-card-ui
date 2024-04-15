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
    handleTransferAPI,
    CalculateTotalOfLossReport,
    CalculateTotalOfReportItem,
    totalBalanceOFLossReportItem,
    ObjToStoreLossReportTable,
    ObjToStoreLossReportItem,
    difference_of_unrecoverableloss_and_outweight,
    factoryList,
    financialYearList,
    handleFinancialYearValuesChange,
    getFinancialYearValueFromURL,
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

            {difference_of_unrecoverableloss_and_outweight != 0 && (
              <div className="col-md-7">
                <div className="mt-2 border rounded w-75 p-3" style={{ borderColor: '#DEE2E6 !important' }}>
                  <table>
                    <tr>
                      <td>Total Unrecoverable Loss: &nbsp;</td>
                      <td>
                        <b>{difference_of_unrecoverableloss_and_outweight} &nbsp;</b>
                      </td>
                      {parseInt(totalBalanceOFLossReportItem) === 0 ||
                        (totalBalanceOFLossReportItem === '--' && (
                          <td className="">
                            <button
                              className="btn text-capitalize btn-link"
                              style={{ fontSize: '16px' }}
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
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
