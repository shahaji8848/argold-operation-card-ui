import { useRouter } from 'next/navigation';
import style from '@/styles/report-list.module.css';
import React from 'react';
import OperationCardInputField from '@/components/CardDetail/OperationCardHeader/OperationCardInputField';
import ExcelJS from 'exceljs';

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
}: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };

  const printPage = (e: any) => {
    window.print();
  };

  const createExcelFile = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    // Add a worksheet
    const worksheet = workbook.addWorksheet('loss_report');
    // Collect data from the DOM (example: all table data)
    const tables = document.querySelectorAll('table');
    tables.forEach((table: any, index: any) => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row: any, rowIndex: any) => {
        const rowData: any = [];
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell: any) => {
          // rowData.push(`'${cell.textContent.trim()}'`);
          rowData.push(cell.textContent);
        });
        // Insert an empty row before the <thead> section
        if (rowIndex === 0 && index > 0) {
          worksheet.addRow([]);
          worksheet.addRow([]);
        }
        worksheet.addRow(rowData);
      });
    });
    worksheet.columns.forEach((column) => {
      column.width = 25; // Set width in characters
    });
    // Apply styles to the worksheet (to mimic CSS styles)
    const style = {
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
      alignment: {
        vertical: 'middle',
        horizontal: 'center',
      },
      font: { bold: false, size: 12 },
    };
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell((cell: any) => {
        cell.border = style.border;
        cell.alignment = style.alignment;
        cell.font = style.font;
      });
    });
    // Generate buffer from workbook
    const buffer = await workbook.xlsx.writeBuffer();
    // Create Blob from buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'loss_report.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <i className="fa fa-file-excel grey print-format cursor me-3" aria-hidden="true" onClick={createExcelFile}></i>

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
