import Link from 'next/link';
import React from 'react';

const OCGoldAccessoryTableItem = () => {
  return (
    <div>
      {' '}
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
                'OP',
              ].map((val, i: any) => (
                <th className="thead-dark text-center" scope="col" key={i}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {operationCardDetailData?.receipt_details?.length > 0 &&
          operationCardDetailData?.receipt_details?.map(
            (data: any, i: any) => (
              <tr className="table-text" key={i}>
                <td>{data.item}</td>
                <td className="text-end">
                  {data?.in_weight === 0 ? '--' : data?.in_weight.toFixed(3)}
                </td>
                <td className="text-end">
                  {data?.in_gross_purity === 0
                    ? '--'
                    : data?.in_gross_purity.toFixed(3)}
                </td>
                <td className="text-end">
                  {data?.in_gross_weight === 0
                    ? '--'
                    : data?.in_gross_weight.toFixed(3)}
                </td>
                <td className="text-end">
                  {data?.in_fine_purity === 0
                    ? '--'
                    : data?.in_fine_purity.toFixed(3)}
                </td>
                <td className="text-end">
                  {data?.in_fine_weight === 0
                    ? '--'
                    : data?.in_fine_weight.toFixed(3)}
                </td>
                <td className="text-end">
                  {hasOPkey(data) ? (
                    <Link
                      href={`/operation-card-detail?name=${data?.reference}`}
                      target="_blank"
                    >
                      {data?.reference?.split('-').pop()}
                    </Link>
                  ) : (
                    '--'
                  )}
                </td>
              </tr>
            )
          )} */}
            {/* <tr className="table-text">
          <td className="font-weight-bold ">Total</td>
          {[
            'in_weight',
            'in_gross_purity',
            'in_gross_weight',
            'in_fine_purity',
            'in_fine_weight',
            'reference',
          ].map((data: any, i: any) => (
            <td className="font-weight-bold text-end" key={i}>
              {CalculateTotal(data)}
            </td>
          ))}
        </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OCGoldAccessoryTableItem;
