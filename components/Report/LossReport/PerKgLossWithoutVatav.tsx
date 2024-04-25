import React from 'react';

const PerKgLossWithoutVatav = ({ perKgLossVatav }: any) => {
  return (
    <>
      <div className="table-responsive">
        <h6 className="bold">Total Per Kg Loss Without Vatav :</h6>
        <table className="table table-bordered mt-2">
          <thead className="card-listing-head ">
            <tr>
              {['Total Loss', 'Value'].map((val: any, index: any) => (
                <th className=" text-center" scope="col" key={index}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="card-listing-body">
            <tr>
              <td>Total Fine Loss</td>
              <td className="text-end">
                {perKgLossVatav?.total_fine_loss && perKgLossVatav?.total_fine_loss !== 0
                  ? perKgLossVatav?.total_fine_loss?.toFixed(3)
                  : '--'}
              </td>
            </tr>
            <tr>
              <td>Total Fine Loss Recovered</td>
              <td className="text-end">
                {perKgLossVatav?.total_fine_loss_recovered && perKgLossVatav?.total_fine_loss_recovered !== 0
                  ? perKgLossVatav?.total_fine_loss_recovered?.toFixed(3)
                  : '--'}
              </td>
            </tr>
            <tr>
              <td>Recovery %</td>
              <td className="text-end">
                {perKgLossVatav?.recovery_percentage && perKgLossVatav?.recovery_percentage !== 0
                  ? perKgLossVatav?.recovery_percentage?.toFixed(3)
                  : '--'}
              </td>
            </tr>
            <tr>
              {/* <td>Total Unrecoverable Loss Without Vatav Loss</td> */}
              <td>Total Unrecoverable Loss</td>
              <td className="text-end">
                {perKgLossVatav?.total_uncrecoverable_loss && perKgLossVatav?.total_uncrecoverable_loss !== 0
                  ? perKgLossVatav?.total_uncrecoverable_loss?.toFixed(3)
                  : '--'}
              </td>
            </tr>
            <tr>
              <td>Production </td>
              <td className="text-end">
                {perKgLossVatav?.production_loss && perKgLossVatav?.production_loss !== 0
                  ? perKgLossVatav?.production_loss?.toFixed(3)
                  : '--'}
              </td>
            </tr>
            <tr>
              <td>Per Kg Loss</td>
              <td className="text-end">
                {perKgLossVatav?.per_kg_loss_without_vatav && perKgLossVatav?.per_kg_loss_without_vatav !== 0
                  ? perKgLossVatav?.per_kg_loss_without_vatav?.toFixed(3)
                  : '--'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PerKgLossWithoutVatav;
