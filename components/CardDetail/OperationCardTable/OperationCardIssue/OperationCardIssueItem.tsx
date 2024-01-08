import React from 'react';

const OperationCardIssueItem = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData');
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
          {operationCardDetailData?.operation_card_issue_details?.map(
            (data: any, i: any) => (
              <tr className="table-text">
                <td>{data.item}</td>
                <td className="text-end">{data.in_weight}</td>
                <td className="text-end">{data.in_gross_purity}</td>
                <td className="text-end">{data.in_gross_weight}</td>
                <td className="text-end">{data.in_fine_purity}</td>
                <td className="text-end">{data.in_fine_weight}</td>
                <td className="text-end">{data.item}</td>
              </tr>
            )
          )}
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
