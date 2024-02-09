import Link from 'next/link';
import React from 'react';

const LossReportDetailTable = ({ reportLossDetailData }: any) => {
  console.log('component reportLossDetailData', reportLossDetailData);
  const hrefValue = window.location.href;

  const splitVal = hrefValue.split('=');
  const decodedUrl = decodeURI(splitVal[1]);
  console.log('search ', decodedUrl);
  return (
    <>
      <div className=" text-uppercase fw-semibold fs-14 my-3">
        <span className="blue">Loss Report :</span> {decodedUrl} Report
      </div>

      <div className="table-responsive">
        <table className="table table-bordered ">
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
                'Operation card',
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
                  <td>{lossData?.type_of_loss}</td>
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
                    {lossData?.uncrecoverable_loss &&
                    lossData?.uncrecoverable_loss !== null
                      ? lossData?.uncrecoverable_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.uncrecoverable_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.balance_loss && lossData?.balance_loss !== null
                      ? lossData?.balance_loss?.toFixed(3)
                      : '--'}
                    {/* {lossData?.balance_loss?.toFixed(3)} */}
                  </td>
                  <td className="text-end">
                    {lossData?.percentage_recovered?.toFixed(3)}
                  </td>
                  <td>
                    <Link
                      href={`/operation-card-detail?name=${lossData?.operation_card}`}
                    >
                      {lossData?.operation_card}
                    </Link>
                  </td>
                </tr>
              );
            })}

            {/* <tr className="card-listing-total">
            <td></td>
            <td></td>
            <td>299.00</td>
            <td>299.00</td>
            <td>299.00</td>
            <td>299.00</td>
            <td>0</td>
            <td>0</td>
            <td>0.303</td>
            <td>0</td>
            <td>299.00</td>
            <td>0</td>
            <td></td>
            <td></td>
            <td></td>
          </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LossReportDetailTable;
