import React from 'react';

const OperationCardReceiptItem = () => {
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
            <td className="text-end">1093.65</td>
            <td className="text-end">100</td>
            <td className="text-end">1093.65</td>
            <td className="text-end">91.8</td>
            <td className="text-end">1003.971</td>
          </tr>
          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>
            <td className="font-weight-bold text-end">1093.65</td>
            <td className="font-weight-bold text-end">100</td>
            <td className="font-weight-bold text-end">1093.65</td>
            <td className="font-weight-bold text-end">91.8</td>
            <td className="font-weight-bold text-end">1003.971</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardReceiptItem;
