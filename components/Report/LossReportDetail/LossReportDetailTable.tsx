import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

const LossReportDetailTable = ({ reportLossDetailData }: any) => {
  console.log('component reportLossDetailData', reportLossDetailData);
  const hrefValue = new URL(window.location.href);
  const splitVal: any = hrefValue.searchParams.get('department_group');
  const decodedUrl = decodeURI(splitVal);
  console.log('search ', decodedUrl);

  const router = useRouter();
  const redirectToReportList = () => {
    router.push('/report/loss-report-list');
  };

  const CalculateTotal = (column: string, data: any[]) => {
    // per kg loss
    if (column === 'per_kg_loss') {
      const totalfineLoss = data.reduce(
        (total: any, item: any) => total + item['fine_loss'],
        0
      );
      console.log('totalfineLoss', totalfineLoss);
      const totalOutWeight = data.reduce(
        (total: any, item: any) => total + item['total_out_weight'],
        0
      );
      console.log('totalOutWeight', totalOutWeight);
      if (totalfineLoss !== 0 && totalOutWeight !== 0) {
        const totalPerKgLoss = (totalfineLoss / totalOutWeight) * 1000;
        console.log('totalPerKgLoss', totalPerKgLoss);
        return totalPerKgLoss.toFixed(3);
      } else {
        return '--';
      }
    }

    // per kg loss after recovery
    if (column === 'per_kg_loss_after_recovery') {
      const totalfineLoss = data.reduce(
        (total: any, item: any) => total + item['fine_loss'],
        0
      );
      console.log('totalfineLoss', totalfineLoss);
      const totalOutWeight = data.reduce(
        (total: any, item: any) => total + item['total_out_weight'],
        0
      );
      console.log('totalOutWeight', totalOutWeight);
      const totalRecoveredLoss = data.reduce(
        (total: any, item: any) => total + item['recovered_loss'],
        0
      );
      console.log('totalRecoveredLoss', totalRecoveredLoss);
      const diff = totalfineLoss - totalRecoveredLoss;
      if (diff !== 0 && totalOutWeight !== 0) {
        const totalkglossrecored = (diff / totalOutWeight) * 1000;
        return totalkglossrecored.toFixed(3);
      } else {
        ('--');
      }
    }

    // All other total values other than per kg
    const total = data.reduce((acc: number, item: any) => {
      return acc + item[column];
    }, 0);

    if (total !== 0) {
      return total.toFixed(3);
    } else {
      return '--';
    }
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
            {reportLossDetailData?.map((lossData: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td>
                    {lossData?.date && lossData?.date !== 0
                      ? lossData?.date
                      : '--'}
                    {/* {lossData?.date} */}
                  </td>
                  <td>
                    {/* {lossData?.loss_period && lossData?.loss_period !== 0
                      ? lossData?.loss_period
                      : '--'} */}
                    {lossData?.loss_period}
                  </td>
                  <td className="text-end">
                    {/* {lossData?.in_loss_gross && lossData?.in_loss_gross !== 0
                      ? lossData?.in_loss_gross
                      : '--'} */}
                    {lossData?.in_loss_gross}
                  </td>

                  <td className="text-end">
                    {lossData?.purity && lossData?.purity !== 0
                      ? lossData?.purity?.toFixed(3)
                      : '--'}
                    {/* {lossData?.purity?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.fine_loss && lossData?.fine_loss !== 0
                      ? lossData?.fine_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.fine_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.total_out_weight &&
                    lossData?.total_out_weight !== 0
                      ? lossData?.total_out_weight?.toFixed(3)
                      : '--'}
                    {/* {lossData?.total_out_weight?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.per_kg_loss && lossData?.per_kg_loss !== 0
                      ? lossData?.per_kg_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.per_kg_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.metal_recieved_after_recovery &&
                    lossData?.metal_recieved_after_recovery !== 0
                      ? lossData?.metal_recieved_after_recovery?.toFixed(3)
                      : '--'}
                    {/* {lossData?.metal_recieved_after_recovery?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.recovered_loss && lossData?.recovered_loss !== 0
                      ? lossData?.recovered_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.recovered_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.per_kg_loss_after_recovery &&
                    lossData?.per_kg_loss_after_recovery !== 0
                      ? lossData?.per_kg_loss_after_recovery?.toFixed(3)
                      : '--'}
                    {/* {lossData?.per_kg_loss_after_recovery?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.uncrecoverable_loss &&
                    lossData?.uncrecoverable_loss !== 0
                      ? lossData?.uncrecoverable_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.uncrecoverable_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.balance_loss && lossData?.balance_loss !== 0
                      ? lossData?.balance_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.balance_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.percentage_recovered &&
                    lossData?.percentage_recovered !== 0
                      ? lossData?.percentage_recovered?.toFixed(3)
                      : '--'}
                    {/* {lossData?.percentage_recovered?.toFixed(3)} */}
                  </td>
                  <td>
                    <Link
                      href={`/operation-card-detail?name=${lossData?.operation_card}`}
                    >
                      {lossData?.operation_card?.split('-')?.pop()}
                    </Link>
                  </td>
                  {/* <td></td> */}
                </tr>
              );
            })}

            <tr className="table-text">
              <td className="font-weight-bold ">Total</td>
              <td></td>

              {[
                // 'date',
                // 'loss period',
                'in_loss_gross',
                'purity',
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
