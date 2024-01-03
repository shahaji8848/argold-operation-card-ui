import React from 'react';

const OperationCardReceiptItem = () => {
  return (
    <>
      <h5 className="mt-2 mb-2">Receipt Items</h5>
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
              <td>1093.65</td>
              <td>100</td>
              <td>1093.65</td>
              <td>91.8</td>
              <td>1003.971</td>
            </tr>
            <tr className="table-text">
              <td className="font-weight-bold">Total</td>
              <td className="font-weight-bold">1093.65</td>
              <td className="font-weight-bold">100</td>
              <td className="font-weight-bold">1093.65</td>
              <td className="font-weight-bold">91.8</td>
              <td className="font-weight-bold">1003.971</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OperationCardReceiptItem;
