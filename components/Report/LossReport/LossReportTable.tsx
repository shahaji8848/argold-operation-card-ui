import Link from 'next/link';
import React from 'react';

const LossReportTable = ({ reportLossData }: any) => {
  const CalculateTotal = (column: string, data: any[]) => {
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
      const totalPerKgLoss = (totalfineLoss / totalOutWeight) * 1000;
      console.log('totalPerKgLoss', totalPerKgLoss);
      if (totalPerKgLoss !== 0) {
        return totalPerKgLoss.toFixed(3);
      } else {
        return '--';
      }
    }

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
      const totalkglossrecored = (diff / totalOutWeight) * 1000;
      if (totalkglossrecored !== 0) {
        return totalkglossrecored.toFixed(3);
      } else {
        ('--');
      }
    }
    // if (column === 'per_kg_loss' || column === 'per_kg_loss_after_recovery') {
    //   return '';
    // }
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
    <div className="table-responsive">
      <table className="table table-bordered mt-2">
        <thead className="card-listing-head ">
          <tr>
            {[
              'type of loss',
              'fine loss',
              'total out weight',
              'per kg loss',
              'metal receive after recovery',
              'recovered loss',
              'per kg loss after recovery',
              'unrecoverable loss',
              'balance loss',
              '% recovered',
            ].map((val: any, index: any) => (
              <th className=" text-center" scope="col" key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="card-listing-body">
          {reportLossData?.length > 0 &&
            reportLossData?.map((lossData: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td>
                    <Link
                      href={`/report/loss-report?department_group=${lossData?.type_of_loss}`}
                    >
                      {lossData?.type_of_loss}
                    </Link>
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
                </tr>
              );
            })}

          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>

            {[
              'fine_loss',
              'total_out_weight',
              'per_kg_loss',
              'metal_recieved_after_recovery',
              'recovered_loss',
              'per_kg_loss_after_recovery',
              'uncrecoverable_loss',
              'balance_loss',
              'percentage_recovered',
            ].map((column: string, i: number) => (
              <td className="font-weight-bold text-end" key={i}>
                {CalculateTotal(column, reportLossData || [])}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LossReportTable;
