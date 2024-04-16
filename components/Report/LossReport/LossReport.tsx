import { useRouter } from 'next/navigation';
import style from '@/styles/report-list.module.css';
import React from 'react';

const LossReport = ({
  lossPeriodList,
  setSelectedLossPeriodValue,
  handleLossPeriodValuesChange,
  handleFactoryValuesChange,
  getLossPeriodValueFromURL,
  getFactoryValueFromURL,
  factoryList,
  financialYearList,
  handleFinancialYearValuesChange,
  getFinancialYearValueFromURL,
  isFinancialYearSelected,
}: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  return (
    <>
      <div className={` ${style.d_flex_report} blue text-uppercase fw-semibold fs-14 my-3  `}>
        <div className="pe-3"> Financial Year</div>
        <div className="me-3">
          <select value={getFinancialYearValueFromURL} onChange={(e: any) => handleFinancialYearValuesChange(e.target.value)}>
            <option value=""></option>
            {financialYearList?.length > 0 &&
              financialYearList?.map((financial_year_data: any, index: number) => {
                return (
                  <>
                    <option value={financial_year_data?.name}>{financial_year_data?.name}</option>
                  </>
                );
              })}
          </select>
        </div>

        <div>Loss Report</div>
        <div className="ms-3">
          <select value={getLossPeriodValueFromURL} onChange={(e: any) => handleLossPeriodValuesChange(e.target.value)}>
            {/* {isFinancialYearSelected && ( */}
            <>
              <option value=""></option>
              {lossPeriodList?.length > 0 &&
                lossPeriodList?.map((loss_period_data: any, index: number) => {
                  return (
                    <>
                      <option value={loss_period_data?.name}>{loss_period_data?.name}</option>
                    </>
                  );
                })}
            </>
            {/* )} */}
          </select>
        </div>

        <div className="ps-3">Factory</div>

        <div className="ms-3">
          <select value={getFactoryValueFromURL} onChange={(e: any) => handleFactoryValuesChange(e.target.value)}>
            <option value=""></option>
            {/* <option value="ARG ERP Software">ARG ERP Software</option> */}
            {factoryList?.map((list: any) => (
              <option key={list?.name} value={list.name}>
                {list?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ms-auto">
          <button className="btn btn-grey px-4 px-1 btn-py" onClick={redirectToHomepage}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default LossReport;
