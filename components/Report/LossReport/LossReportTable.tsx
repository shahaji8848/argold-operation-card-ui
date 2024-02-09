import React from 'react';

const LossReportTable = ({ reportLossData }: any) => {
  console.log(reportLossData, 'reportLossData');
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
          {reportLossData?.map((lossData: any, idx: any) => {
            return (
              <tr key={idx}>
                <td>{lossData?.department_group}</td>
                <td className="text-end">{lossData?.total_fine_weight}</td>
                <td className="text-end">{lossData?.in_gross_weight}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LossReportTable;
