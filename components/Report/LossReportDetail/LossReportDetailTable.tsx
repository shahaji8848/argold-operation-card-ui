import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

const LossReportDetailTable = ({ reportLossDetailData }: any) => {
  console.log('component reportLossDetailData', reportLossDetailData);
  const hrefValue = window.location.href;

  const splitVal = hrefValue.split('=');
  const decodedUrl = decodeURI(splitVal[1]);
  console.log('search ', decodedUrl);

  const router = useRouter();
  const redirectToReportList = () => {
    router.push('/report/loss-report-list');
  };

  // const CalculateTotal = (column: string, data: any[]) => {
  //   if (column === column) {
  //     const totalfineLoss = data.reduce(
  //       (total: any, item: any) => total + item['fine_loss'],
  //       0
  //     );
  //     return totalfineLoss.toFixed(3);
  //   } else {
  //     return '--';
  //   }
  // };
  const CalculateTotal = (column: string, data: any[]) => {
    if (column === 'per_kg_loss' || column === 'per_kg_loss_after_recovery') {
      return '';
    }
    const total = data.reduce((acc: number, item: any) => {
      return acc + item[column];
    }, 0);

    return total.toFixed(3);
  };

  return (
    <>
      <div className="   mb-4 bold header-heading-mob d-flex">
        <span className=" ">
          <span className="blue"> Loss Report :</span> {decodedUrl} Report
        </span>
        <button
          className="btn btn-grey px-4 px-1 btn-py "
          onClick={redirectToReportList}
        >
          Back
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead className="card-listing-head ">
            <tr>
              {[
                'date',
                'loss period',
                'in loss gross',
                'purity',
                'in loss fine',
                'out weight',
                'per kg loss',
                'metal receive after recovery',
                'recovered loss',
                'per kg loss after recovery',
                'unrecoverable',
                'balance loss',
                '% recovered',
                'OC',
                // 'Action',

                // 'fine loss',
                // 'total out weight',
                // 'per kg loss',
                // 'metal receive after recovery',
                // 'recovered loss',
                // 'per kg loss after recovery',
                // 'unrecoverable loss',
                // 'balance loss',
                // '% recovered',
                // 'OC',
              ].map((val: any, index: any) => (
                <th className=" text-center" scope="col" key={index}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="card-listing-body">
            {reportLossDetailData.map((lossData: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>{lossData?.type_of_loss}</td> */}
                  <td></td>
                  <td className="text-end">
                    {lossData?.fine_loss?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.total_out_weight?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.per_kg_loss?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.metal_recieved_after_recovery?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.recovered_loss?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.per_kg_loss_after_recovery?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {/* {lossData?.uncrecoverable_loss &&
                    lossData?.uncrecoverable_loss !== null
                      ? lossData?.uncrecoverable_loss?.toFixed(3)
                      : '--'} */}
                    {lossData?.uncrecoverable_loss?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {/* {lossData?.balance_loss && lossData?.balance_loss !== null
                      ? lossData?.balance_loss?.toFixed(3)
                      : '--'} */}
                    {lossData?.balance_loss?.toFixed(3)}
                  </td>
                  <td className="text-end">
                    {lossData?.percentage_recovered?.toFixed(3)}
                  </td>
                  <td>
                    <Link
                      href={`/operation-card-detail?name=${lossData?.operation_card}`}
                    >
                      {lossData?.operation_card.split('-').pop()}
                    </Link>
                  </td>
                  {/* <td></td> */}
                </tr>
              );
            })}

            <tr className="table-text">
              <td className="font-weight-bold ">Total</td>
              <td></td>
              <td></td>
              <td></td>
              {[
                // 'date',
                // 'loss period',
                // 'in loss gross',
                // 'purity',
                'fine_loss',
                'total_out_weight',
                'per_kg_loss',
                'metal_recieved_after_recovery',
                'recovered_loss',
                'per_kg_loss_after_recovery',
                'uncrecoverable_loss',
                'balance_loss',
                'percentage_recovered',
                // 'OC',
                // 'Action',
              ].map((column: string, i: number) => (
                <td className="font-weight-bold text-end" key={i}>
                  {CalculateTotal(column, reportLossDetailData || [])}
                </td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LossReportDetailTable;
