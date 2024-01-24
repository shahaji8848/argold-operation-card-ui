import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

const OperationCardReceiptItem = ({ operationCardDetailData }: any) => {
  const router = useRouter();
  const redirectToPrevOC = (oc_id: string) => {
    router.push(`/operation-card-detail?name=${oc_id}`);
  };
  const CalculateTotal = (column: string, data: any[]) => {
    if (column === 'in_gross_purity') {
      const totalInWeight = data.reduce(
        (total: any, item: any) => total + item['in_weight'],
        0
      );
      const totalInGrossWeight = data.reduce(
        (total: any, item: any) => total + item['in_gross_weight'],
        0
      );
      return ((totalInGrossWeight / totalInWeight) * 100).toFixed(3);
    } else if (column === 'in_fine_purity') {
      const totalGrossWeight = data.reduce(
        (total: any, item: any) => total + item['in_gross_weight'],
        0
      );
      const totalFineWeight = data.reduce(
        (total: any, item: any) => total + item['in_fine_weight'],
        0
      );
      return ((totalFineWeight / totalGrossWeight) * 100).toFixed(3);
    } else if (column !== 'reference') {
      return data
        .reduce((total: any, item: any) => total + item[column], 0)
        .toFixed(3);
    } else {
      return '--';
    }
  };

  const hasOPkey = (val: any) => {
    return val.hasOwnProperty('reference');
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
              'OP',
            ].map((val, i: any) => (
              <th className="thead-dark text-center" scope="col" key={i}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {operationCardDetailData?.receipt_details?.length > 0 &&
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
                        onClick={() => redirectToPrevOC(data?.reference)}
                      >
                        {data?.reference?.split('-').pop()}
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
              'reference',
            ].map((data: any, i: any) => (
              <td className="font-weight-bold text-end" key={i}>
                {/* {CalculateTotal(data)} */}
                {CalculateTotal(
                  data,
                  operationCardDetailData?.receipt_details || []
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardReceiptItem;
