import React from 'react';

const OperationCardIssueItem = () => {
  return (
    <div className="table-responsive ">
      <table className="table table-bordered">
        <thead>
          <tr className="table-text">
            {[
              'item',
              'In Wt',
              'Gross Purity',
              'Gross Wt',
              'Fine Purity',
              'Fine Weight',
              'OP',
            ].map((val, i: any) => (
              <th className="thead-dark text-center" scope="col" key={i}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="table-text">
            <td>Chain</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
          </tr>
          <tr className="table-text">
            <td>Melting Wastage</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
          </tr>
          <tr className="table-text">
            <td>Loss</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
          </tr>
          <tr className="table-text">
            <td>Ghiss</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
            <td className="text-end">0.0</td>
          </tr>
          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>
            <td className="font-weight-bold text-end">0.0</td>
            <td className="font-weight-bold text-end">0.0</td>
            <td className="font-weight-bold text-end">0.0</td>
            <td className="font-weight-bold text-end">0.0</td>
            <td className="font-weight-bold text-end">0.0</td>
            <td className="font-weight-bold text-end">0.0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardIssueItem;
