import React from 'react';

const OperationCardIssueItem = () => {
  return (
    <div>
      <h5 className="mt-2 mb-2">Issue Items</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-text">
              {[
                'item',
                'In Wt',
                'Gross Purity',
                'Gross Wt',
                'Fine Purity',
                'Fine Weight',
                'Tounch No',
                'Fire Tounch No',
                'Operation Card/Old OP',
              ].map((val, i: any) => (
                <th className="thead-dark" scope="col" key={i}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="table-text">
              <td>Chain</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr className="table-text">
              <td>Melting Wastage</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr className="table-text">
              <td>Loss</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr className="table-text">
              <td>Ghiss</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr className="table-text">
              <td className="font-weight-bold">Total</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
              <td className="font-weight-bold">0.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationCardIssueItem;
