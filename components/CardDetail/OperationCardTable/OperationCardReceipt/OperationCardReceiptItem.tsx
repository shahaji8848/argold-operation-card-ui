import React from 'react';

const OperationCardReceiptItem = ({ operationCardDetailData }: any) => {
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
          {operationCardDetailData?.receipt_details?.map(
            (data: any, i: any) => (
              <tr className="table-text" key={i}>
                <td>{data.item}</td>
                <td className="text-end">{data.in_weight}</td>
                <td className="text-end">{data.in_gross_purity}</td>
                <td className="text-end">{data.in_gross_weight}</td>
                <td className="text-end">{data.in_fine_purity}</td>
                <td className="text-end">{data.in_fine_weight}</td>
              </tr>
            )
          )}
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
