'use client';
import { CONSTANTS } from '@/services/config/api-config';
import { clearToken, get_access_token } from '@/store/slice/login-slice';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OperationCardInputField from '../CardDetail/OperationCardHeader/OperationCardInputField';
import useOperationCardList from '@/hooks/operation-card-list-hook/operation-card-list-hook';
import ExcelJS, { Alignment } from 'exceljs';
import { BorderStyle } from 'exceljs';
import { Dropdown } from 'react-bootstrap';

const CustomNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { listData } = useOperationCardList();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const pathName = usePathname();

  const token: any = useSelector(get_access_token);
  console.log(token?.username, 'tOEKN');

  const redirectToHome = () => {
    router.push(`${CONSTANTS.API_BASE_URL}app`);
  };

  useEffect(() => {
    if (pathName === '/login') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [params]);

  const handleLogout = () => {
    setShowNavbar(false);
    router.push(`/login`);
    dispatch(clearToken());
  };

  const createExcelFile = async (listData: any) => {
    if (listData.length > 0 && listData !== null) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('operation_card_list');

      // Add headers
      const headers = Object.keys(listData[0]).map((header) => header.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()));
      worksheet.addRow(headers).font = { bold: true };

      // Add data rows
      listData.length > 0 &&
        listData !== null &&
        listData?.map((rowData: any) => {
          const rowValues = Object.values(rowData).map((value) => (value !== null && value !== '' ? value : '--'));
          worksheet.addRow(rowValues);
        });

      // Set column widths
      worksheet.columns?.forEach((column) => {
        column.width = 25; // Set width in characters
      });
      const alignment: Partial<Alignment> = {
        vertical: 'middle',
        horizontal: 'center',
      };
      // Apply styles to the worksheet (to mimic CSS styles)
      const style = {
        border: {
          top: { style: 'thin' as BorderStyle },
          left: { style: 'thin' as BorderStyle },
          bottom: { style: 'thin' as BorderStyle },
          right: { style: 'thin' as BorderStyle },
        },
        alignment: alignment,
        font: { bold: false, size: 12 },
      };

      // Determine the range of rows
      const rowCount = worksheet.rowCount;

      // Apply style to each cell in the range
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        const row = worksheet.getRow(rowIndex);
        row.eachCell((cell) => {
          cell.border = style.border;
          cell.alignment = style.alignment;
          cell.font = style.font;
        });
      }

      // Generate buffer from workbook
      const buffer = await workbook.xlsx.writeBuffer();
      // Create Blob from buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'operation_card_list.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
    <i
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <i className="fa-solid fa-user light-grey" aria-hidden="true" style={{ fontSize: '20px' }}></i> {children}
    </i>
  ));

  return (
    <>
      {showNavbar ? (
        <div className="container-fluid  head-dark p-0">
          <div className="d-flex align-items-center justify-content-start  navbar-height spacing-pd">
            <div className="container-fluid">
              <div className="">
                <Link href="/">
                  <Image src="/arc-logo.png" alt="ERPNext Logo" width={40} height={42} />
                </Link>
              </div>
            </div>
            {pathName === '/operation-card-list' && (
              <div className="d-flex justify-content-center ">
                <div className={`ms-auto d-flex justify-content-end align-items-center px-2`} style={{ width: '300px' }}>
                  <OperationCardInputField />
                </div>
                <i
                  className="fa fa-file-excel grey print-format cursor me-3 ps-2 "
                  aria-hidden="true"
                  style={{ fontSize: '25px' }}
                  onClick={() => createExcelFile(listData)}
                ></i>
              </div>
            )}
            <div className="d-flex align-items-center mb-1 pe-2">
              <button
                className=" btn-none"
                onClick={redirectToHome}
                style={{
                  background: 'none',
                  border: 'none',

                  color: '#030f27',
                }}
              >
                <Image
                  src="/erpnext-logo.png"
                  // src="https://erp.ar-gold.in/assets/erpnext/images/erpnext-logo.svg"
                  alt="ERPNext Logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="d-flex align-items-center  ps-3 pe-3">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                  <div aria-hidden="true"></div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>{token?.username}</Dropdown.Item>
                  <Dropdown.Item>
                    <div className=" pt-1 w-100 d-flex justify-content-between align-items-center" onClick={handleLogout}>
                      <span className="me-1">Logout</span>
                      <i className="fa fa-sign-out light-grey" aria-hidden="true" style={{ fontSize: '14px' }}></i>{' '}
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CustomNavbar;
