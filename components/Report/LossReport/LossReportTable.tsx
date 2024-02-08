import React from 'react';

const LossReportTable = () => {
  return (
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
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>{' '}
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
        <tr>
          <td>outside refine water recovery</td>
          <td>0.001</td>
          <td>271599.00</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.303</td>
          <td>0.30334534</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LossReportTable;
