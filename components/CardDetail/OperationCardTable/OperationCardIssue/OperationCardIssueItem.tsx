import Link from 'next/link';
import React from 'react';

const OperationCardIssueItem = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData');
  const hasOPkey = (val: any) => {
    return val.hasOwnProperty('operation_card');
  };
  const CalculateTotal = (column: any) => {
    return operationCardDetailData?.receipt_details
      ?.reduce((total: any, item: any) => {
        if (item.hasOwnProperty('old_operation_card')) {
          return total + item[column];
        } else {
          if (column === 'old_operation_card' || column === 'karigar') {
            return 0;
          } else {
            console.log('item column', item[column]);
            if (item[column] === undefined) {
              return 0;
            } else {
              return total + item[column];
            }
          }
        }
      }, 0)
      .toFixed(3);
  };

  return (
    <div className="table-responsive ">
      <table className="table table-bordered">
        <thead>
          <tr className="table-text">
            {[
              'Item',
              'In Wt',
              'Gross Purity',
              'Gross Wt',
              'Fine Purity',
              'Fine Weight',
              'Touch No',
              'Fire Touch No ',
              'Machine Size',
              'Line Number',
              'Karigar',
              'OP',
            ].map((val, i: any) => (
              <th className="thead-dark text-center" scope="col" key={i}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {operationCardDetailData?.operation_card_issue_details?.length > 0 &&
            operationCardDetailData?.operation_card_issue_details?.map(
              (data: any, i: any) => (
                <tr className="table-text" key={i}>
                  <td>{data.item}</td>
                  <td className="text-end">
                    {data?.in_weight === 0 ? '--' : data?.in_weight?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_gross_purity === 0
                      ? '--'
                      : data?.in_gross_purity?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_gross_weight === 0
                      ? '--'
                      : data?.in_gross_weight?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_fine_purity === 0
                      ? '--'
                      : data?.in_fine_purity?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_fine_weight === 0
                      ? '--'
                      : data?.in_fine_weight?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.tounch_no === 0 ? '--' : data?.tounch_no}
                  </td>
                  <td className="text-end">
                    {' '}
                    {data?.fire_tounch_no === 0 ? '--' : data?.fire_tounch_no}
                  </td>
                  <td className="text-end">
                    {' '}
                    {data?.machine_size === 0 ? '--' : data?.machine_size}
                  </td>
                  <td className="text-end">
                    {' '}
                    {data?.line_number === 0 ? '--' : data?.line_number}
                  </td>
                  <td className="text-end">
                    {hasOPkey(data) ? (
                      <Link
                        href={`/operation-card-detail?name=${data?.operation_card}`}
                        target="_blank"
                      >
                        {data?.operation_card}
                      </Link>
                    ) : (
                      '--'
                    )}
                  </td>
                </tr>
              )
            )}
          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>
            {[
              'in_weight',
              'in_gross_purity',
              'in_gross_weight',
              'in_fine_purity',
              'in_fine_weight',
              'tounch_no',
              'fire_tounch_no',
              'machine_size',
              'line_number',
              'karigar',
              'old_operation_card',
            ].map((data: any, i: any) => (
              <td className="font-weight-bold text-end" key={i}>
                {CalculateTotal(data)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardIssueItem;
