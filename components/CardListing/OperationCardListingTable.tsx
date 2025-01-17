import Link from 'next/link';
import React from 'react';
import style from '../../styles/operation-card-list.module.css';

const OperationCardListingTable = ({ data, handleApprove, selectedRows, handleCheckboxInput }: any) => {
  console.log(data, 'DATATA');
  const renderData = () => {
    if (data?.length !== 0) {
      return (
        <table className="table table-bordered">
          <thead className="card-listing-head">
            <tr>
              {[
                'Sr No',
                'parent melting lot',
                'Refining Process Number',
                'Melting lot',
                'purity',
                'BOM Code',
                'product',
                'process',
                'department',
                'Product Category',
                'Machine Size',
                'Line Number',
                'Design',
                'quantity',
                'karigar',
                'worker',
                'customer',
                'machine',
                'laser powder type',
                'tracking number',
                'ord',
                'description',
                'balance',
                'check',
                'gross balance',
                'fine balance',
                'OC',
                'Approve',
                'Created On',
              ].map((val: any, index: any) => (
                <th className="thead-dark text-center" scope="col" key={index}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="card-listing-body">
            {data?.length > 0 &&
              data?.map((rowData: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="text-end">{index + 1}</td>
                    <td className="text-uppercase">
                      {rowData?.parent_melting_lot && rowData?.parent_melting_lot !== null ? rowData?.parent_melting_lot : '--'}
                    </td>
                    <td className="text-uppercase">
                      {rowData?.refining_process && rowData?.refining_process !== null ? rowData?.refining_process : '--'}
                    </td>
                    <td className="text-end">
                      {rowData?.melting_lot && rowData?.melting_lot !== null ? rowData?.melting_lot : '--'}
                    </td>
                    <td className="text-end">
                      {rowData?.product_purity && rowData?.product_purity !== 0 ? rowData?.product_purity : '--'}
                    </td>
                    <td className="text-end">{rowData?.bom_code && rowData?.bom_code !== 0 ? rowData?.bom_code : '--'}</td>
                    <td>{rowData?.product && rowData?.product !== null ? rowData?.product : '--'}</td>
                    <td>
                      {rowData?.product_process && rowData?.product_process !== null
                        ? rowData?.product_process.split('-')[0]
                        : '--'}
                    </td>
                    <td>{rowData?.operation_department ? rowData?.operation_department : '--'}</td>
                    <td>{rowData?.product_category ? rowData?.product_category : '--'}</td>
                    <td>{rowData?.machine_size && rowData?.machine_size !== null ? rowData?.machine_size : '--'}</td>
                    <td>{rowData?.line_number && rowData?.line_number !== 0 ? rowData?.line_number : '--'}</td>
                    <td>{rowData?.design && rowData?.design !== null ? rowData?.design : '--'}</td>
                    <td>{rowData?.quantity && rowData?.quantity !== Number(0).toFixed(3) ? rowData?.quantity : '--'}</td>
                    <td className="">{rowData?.karigar && rowData?.karigar !== null ? rowData?.karigar : '--'}</td>
                    <td className="">{rowData?.worker && rowData?.worker !== null ? rowData?.worker : '--'}</td>
                    <td className="">
                      {rowData?.customer_name && rowData?.customer_name !== null ? rowData?.customer_name : '--'}
                    </td>
                    <td className="">{rowData?.machine && rowData?.machine !== null ? rowData?.machine : '--'}</td>
                    <td className="">
                      {rowData?.laser_powder_type && rowData?.laser_powder_type !== null ? rowData?.laser_powder_type : '--'}
                    </td>
                    <td className="">
                      {rowData?.tracking_number && rowData?.tracking_number !== '' ? rowData?.tracking_number : '--'}
                    </td>
                    <td>{rowData?.ord ?? '--'}</td>
                    <td>{rowData?.description && rowData?.description !== '' ? rowData?.description : '--'}</td>
                    <td className="text-end">
                      {rowData?.balance_weight && rowData?.balance_weight !== 0
                        ? rowData?.balance_weight.toFixed(3)
                        : rowData?.balance_weight.toFixed(3)}
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows && selectedRows?.includes(rowData?.name)}
                        onChange={() => handleCheckboxInput(rowData?.name)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td className="text-end">
                      {rowData?.balance_gross_weight && rowData?.balance_gross_weight !== 0
                        ? rowData?.balance_gross_weight.toFixed(3)
                        : rowData?.balance_gross_weight.toFixed(3)}
                    </td>
                    <td className="text-end">
                      {rowData?.balance_fine_weight && rowData?.balance_fine_weight !== 0
                        ? rowData?.balance_fine_weight.toFixed(3)
                        : rowData?.balance_fine_weight.toFixed(3)}
                    </td>
                    <td>
                      <Link href={`/operation-card-detail?name=${rowData?.name}`} target="_blank">
                        {rowData?.name && rowData?.name !== null ? rowData?.name?.split('-').pop() : '--'}
                      </Link>
                    </td>
                    <td className="text-end">
                      {rowData?.approve_operation_card_status === 1 ? (
                        <button
                          id={rowData?.name} // Adding an id to match the document.getElementById
                          className={`btn btn-blue btn-py px-2 ${style.button}`}
                          onClick={() => handleApprove(rowData?.name)}
                        >
                          Approve
                        </button>
                      ) : (
                        // <button className="btn btn-blue btn-py px-2 disabled">Approve</button>
                        ''
                      )}
                    </td>
                    <td>
                      {rowData?.creation && rowData?.creation !== null
                        ? (() => {
                            const date = new Date(rowData?.creation.replace(/\.[0-9]+$/, ''));
                            const day = String(date.getDate())?.padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');
                            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                          })()
                        : '--'}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="bold text-center">Total</td>
              <td className="bold text-end">{CalculateTotal(data, 'balance_weight')}</td>
              <td></td>
              <td className="bold text-end">{CalculateTotal(data, 'balance_gross_weight')}</td>
              <td className="bold text-end">{CalculateTotal(data, 'balance_fine_weight')}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return <>{data?.length === 0 && <></>}</>;
    }
  };
  const CalculateTotal = (data: any[], column: string) => {
    if (!data || data.length === 0) {
      return '--';
    }

    const total = data
      .map((rowData: any) => rowData?.[column])
      .reduce((acc: any, value: any) => {
        const numericValue = parseFloat(value) || 0;
        return acc + numericValue;
      }, 0);

    return total.toFixed(3);
  };

  return <div className="table-responsive">{renderData()}</div>;
};

export default OperationCardListingTable;
