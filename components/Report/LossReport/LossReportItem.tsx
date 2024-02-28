import { CONSTANTS } from '@/services/config/api-config';
import Link from 'next/link';
import React from 'react';

const LossReportItem = ({ reportLossItem }: any) => {
  console.log('reportLossItem', reportLossItem);
  return (
    <div className="table-responsive">
      <table className="table table-bordered mt-2">
        <thead className="card-listing-head ">
          <tr>
            {['item', 'in weight', 'out weight', 'balance'].map(
              (val: any, index: any) => (
                <th className=" text-center" scope="col" key={index}>
                  {val}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="card-listing-body">
          {reportLossItem?.length > 0 &&
            reportLossItem?.map((lossData: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td>{lossData?.item !== '' ? lossData?.item : '--'}</td>
                  <td className="text-end">
                    {lossData?.in_weight && lossData?.in_weight !== 0
                      ? lossData?.in_weight?.toFixed(3)
                      : '--'}
                  </td>
                  <td className="text-end">
                    {lossData?.out_weight && lossData?.out_weight !== 0
                      ? lossData?.out_weight?.toFixed(3)
                      : '--'}
                  </td>
                  <td className="text-end">
                    <Link
                      href={`${CONSTANTS.API_BASE_URL}app/query-report/Vatav%20Report?item_name=${lossData?.item}`}
                      target="_blank"
                    >
                      {lossData?.balance && lossData?.balance !== 0
                        ? lossData?.balance?.toFixed(3)
                        : '--'}
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default LossReportItem;
