import { CONSTANTS, callFormDataPOSTAPI } from '@/services/config/api-config';
import { get_access_token } from '@/store/slice/login-slice';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const LossReportItem = ({
  reportLossItem,
  getLossPeriodValueFromURL,
  getFactoryValueFromURL,
}: any) => {
  const { token } = useSelector(get_access_token);
  async function convertFunc(item_name: any) {
    const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.internal_transfer.create_internal_transfer_from_parent_lot_loss.create_internal_transfer_for_unrecoverable_loss`;
    const formData: any = new FormData();
    formData.append('item', item_name);
    formData.append('loss_period', getLossPeriodValueFromURL);
    formData.append('factory', getFactoryValueFromURL);
    const getAPIResponse: any = await callFormDataPOSTAPI(url, formData, token);
    return getAPIResponse;
  }
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
                        {lossData?.in_weight && lossData?.in_weight !== 0
                          ? lossData?.in_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    ) : (
                      <Link
                        href={`${CONSTANTS.API_BASE_URL}app/query-report/Vatav%20Report?item_name=${lossData?.item}&loss_period=${getLossPeriodValueFromURL}&factory=${getFactoryValueFromURL}`}
                        target="_blank"
                      >
                        {lossData?.in_weight && lossData?.in_weight !== 0
                          ? lossData?.in_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    )}
                  </td>
                  <td className="text-end">
                    {lossData?.item === 'Parent Lot Loss' ? (
                      <Link href={``} target="_blank">
                        {lossData?.out_weight && lossData?.out_weight !== 0
                          ? lossData?.out_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    ) : (
                      <Link
                        href={`${CONSTANTS.API_BASE_URL}app/query-report/Vatav%20Report?item_name=${lossData?.item}&loss_period=${getLossPeriodValueFromURL}&factory=${getFactoryValueFromURL}&is_material_issue=1`}
                        target="_blank"
                      >
                        {lossData?.out_weight && lossData?.out_weight !== 0
                          ? lossData?.out_weight?.toFixed(3)
                          : '--'}
                      </Link>
                    )}
                  </td>
                  <td className="text-end">
                    {lossData?.balance && lossData?.balance !== 0
                      ? lossData?.balance?.toFixed(3)
                      : '--'}
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-primary text-capitalize filter-btn fs-13"
                      type="button"
                      onClick={() => convertFunc(lossData?.item)}
                    >
                      Convert
                    </button>
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
