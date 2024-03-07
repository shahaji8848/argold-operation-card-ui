import { CONSTANTS, callFormDataPOSTAPI } from '@/services/config/api-config';
import { get_access_token } from '@/store/slice/login-slice';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const LossReportItem = ({
  reportLossItem,
  getLossPeriodValueFromURL,
  getFactoryValueFromURL,
  convertFunc,
  CalculateTotalOfReportItem,
}: any) => {
  const { token } = useSelector(get_access_token);

  return (
    <div className="table-responsive">
      <table className="table table-bordered mt-2">
        <thead className="card-listing-head ">
          <tr>
            {[
              'item',
              'Operation Card Weight',
              'Material Issue Weight',
              'balance',
              'Convert to Unrecoverable Loss',
            ].map((val: any, index: any) => (
              <th className=" text-center" scope="col" key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="card-listing-body">
          {reportLossItem?.length > 0 &&
            reportLossItem?.map((lossData: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td>{lossData?.item !== '' ? lossData?.item : '--'}</td>
                  <td className="text-end">
                    {lossData?.item === 'Parent Lot Loss' ? (
                      <Link
                        href={`${CONSTANTS.API_BASE_URL}app/query-report/Productwise%20Parent%20Lot%20Loss?loss_period=${getLossPeriodValueFromURL}&factory=${getFactoryValueFromURL}`}
                        target="_blank"
                      >
                        {lossData?.in_weight &&
                        lossData?.in_weight !== 0 &&
                        lossData?.in_weight !== 0.001
                          ? lossData?.in_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    ) : (
                      <Link
                        href={`${CONSTANTS.API_BASE_URL}app/query-report/Vatav%20Report?item_name=${lossData?.item}&loss_period=${getLossPeriodValueFromURL}&factory=${getFactoryValueFromURL}`}
                        target="_blank"
                      >
                        {lossData?.in_weight &&
                        lossData?.in_weight !== 0 &&
                        lossData?.in_weight !== 0.001
                          ? lossData?.in_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    )}
                  </td>
                  <td className="text-end">
                    {lossData?.item === 'Parent Lot Loss' ? (
                      <Link href={``} target="_blank">
                        {lossData?.out_weight &&
                        lossData?.out_weight !== 0 &&
                        lossData?.out_weight !== 0.001
                          ? lossData?.out_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    ) : (
                      <Link
                        href={`${CONSTANTS.API_BASE_URL}app/query-report/Vatav%20Report?item_name=${lossData?.item}&loss_period=${getLossPeriodValueFromURL}&factory=${getFactoryValueFromURL}&is_material_issue=1`}
                        target="_blank"
                      >
                        {lossData?.out_weight &&
                        lossData?.out_weight !== 0 &&
                        lossData?.out_weight !== 0.001
                          ? lossData?.out_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    )}
                  </td>
                  <td className="text-end">
                    {lossData?.balance &&
                    lossData?.balance !== 0 &&
                    lossData?.balance !== 0.001
                      ? lossData?.balance?.toFixed(3)
                      : '--'}
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn  text-capitalize btn-link fs-13"
                      type="button"
                      onClick={() => convertFunc(lossData?.item)}
                    >
                      Convert
                    </button>
                  </td>
                </tr>
              );
            })}

          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>

            {['in_weight', 'out_weight', 'balance'].map(
              (column: string, i: number) => (
                <td className="font-weight-bold text-end" key={i}>
                  {CalculateTotalOfReportItem(column, reportLossItem || [])}
                </td>
              )
            )}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LossReportItem;
