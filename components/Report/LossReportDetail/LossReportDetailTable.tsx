import React from 'react';

const LossReportDetailTable = () => {
  return (
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
              'per kg loss after recovery',
              'unrecoverable',
              'balance loss',
              '% recovered',
              'Action',
              '',
              '',
            ].map((val: any, index: any) => (
              <th className=" text-center" scope="col" key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="card-listing-body">
          <tr>
            <td>08-02-2024</td>
            <td>01-02-2024 To 08-02-2024</td>
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
            <td className="blue">create metal receipt</td>
            <td className="blue">unrecoverable</td>
            <td className="blue">Add Quotation</td>
          </tr>

          <tr className="card-listing-total">
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LossReportDetailTable;
