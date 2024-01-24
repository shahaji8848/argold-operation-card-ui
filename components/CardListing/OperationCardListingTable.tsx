import Link from 'next/link';
import React from 'react';

const OperationCardListingTable = ({ data }: any) => {
  console.log('data', data);
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="card-listing-head">
          <tr>
            {[
              'parent melting lot',
              'Melting lot',
              'purity',
              'product',
              'process',
              'department',
              'Machine Size',
              'Design',
              'Line Number',
              'karigar',
              'balance',
              'gross balance',
              'fine balance',
              'OC',
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
                  <td className="text-uppercase">
                    {rowData?.parent_melting_lot &&
                    rowData?.parent_melting_lot !== null
                      ? rowData?.parent_melting_lot
                      : '--'}
                  </td>
                  <td className="text-end">
                    {rowData?.melting_lot && rowData?.melting_lot !== null
                      ? rowData?.melting_lot
                      : '--'}
                  </td>
                  <td className="text-end">
                    {rowData?.product_purity && rowData?.product_purity !== 0
                      ? rowData?.product_purity
                      : '--'}
                  </td>
                  <td>
                    {rowData?.product && rowData?.product !== null
                      ? rowData?.product
                      : '--'}
                  </td>
                  <td>
                    {rowData?.product_process_department &&
                    rowData?.product_process_department !== null
                      ? rowData?.product_process_department.split('-')[0]
                      : '--'}
                  </td>
                  <td>
                    {rowData?.operation_department
                      ? rowData?.operation_department
                      : '--'}
                  </td>
                  <td>
                    {rowData?.machine_size && rowData?.machine_size !== null
                      ? rowData?.machine_size
                      : '--'}
                  </td>
                  <td>
                    {rowData?.line_number && rowData?.line_number !== null
                      ? rowData?.line_number
                      : '--'}
                  </td>
                  <td>
                    {rowData?.design && rowData?.design !== null
                      ? rowData?.design
                      : '--'}
                  </td>
                  <td className="">
                    {rowData?.karigar && rowData?.karigar !== null
                      ? rowData?.karigar
                      : '--'}
                  </td>
                  <td className="text-end">
                    {rowData?.balance_weight && rowData?.balance_weight !== 0
                      ? rowData?.balance_weight
                      : '--'}
                  </td>
                  <td className="text-end">
                    {rowData?.balance_gross_weight &&
                    rowData?.balance_gross_weight !== 0
                      ? rowData?.balance_gross_weight
                      : '--'}
                  </td>
                  <td className="text-end">
                    {rowData?.balance_fine_weight &&
                    rowData?.balance_fine_weight !== 0
                      ? rowData?.balance_fine_weight
                      : '--'}
                  </td>
                  <td>
                    <Link
                      href={`/operation-card-detail?name=${rowData?.name}`}
                      target="_blank"
                    >
                      {rowData?.name && rowData?.name !== null
                        ? rowData?.name?.split('-').pop()
                        : '--'}
                    </Link>
                  </td>
                  <td>
                    {rowData?.creation && rowData?.creation !== null
                      ? rowData?.creation
                      : '--'}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardListingTable;
