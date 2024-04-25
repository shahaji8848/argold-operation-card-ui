import { useRouter } from 'next/navigation';
import style from '@/styles/report-list.module.css';
import React from 'react';
import OperationCardInputField from '@/components/CardDetail/OperationCardHeader/OperationCardInputField';

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

  const printPage = (e: any) => {
    window.print();
  };
  return (
    <>
      <div className={` ${style.d_flex_report} blue text-uppercase fw-semibold fs-14 my-3  `}>
        <div className={`pe-3 ${style.spacing_report_header_mob}`}> Financial Year</div>
        <div className={`me-3 ${style.spacing_report_header_mob}`}>
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
        <div className={`ms-3 ${style.spacing_report_header_mob}`}>
          <select value={getLossPeriodValueFromURL} onChange={(e: any) => handleLossPeriodValuesChange(e.target.value)}>
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
          </select>
        </div>

        <div className={`ps-3 ${style.spacing_report_header_mob}`}>Factory</div>

        <div className={`ms-3 ${style.spacing_report_header_mob}`}>
          <select value={getFactoryValueFromURL} onChange={(e: any) => handleFactoryValuesChange(e.target.value)}>
            <option value=""></option>
            {factoryList?.map((list: any) => (
              <option key={list?.name} value={list.name}>
                {list?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ms-auto d-flex align-items-center"></div>
        <div className="ms-auto d-flex align-items-center"></div>
        <div className="ms-auto d-flex align-items-center"></div>
        <div className="ms-auto d-flex align-items-center"></div>
        <div className="ms-auto d-flex align-items-center"></div>

        <div className={`ms-auto d-flex align-items-center  ${style.mb_wrapper}`}>
          <OperationCardInputField />
        </div>
        {/* <div className={`w-100 d-flex justify-content-end pe-3 mb-wrapper ${style.mb_wrapper}`}>
          <OperationCardInputField />
        </div> */}
        <div className="ms-auto d-flex align-items-center">
          <i className="fa fa-print me-3  grey print-format cursor" aria-hidden="true" onClick={(e: any) => printPage(e)}></i>

          <button className="btn btn-grey px-4 px-1 btn-py" onClick={redirectToHomepage}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default LossReport;
