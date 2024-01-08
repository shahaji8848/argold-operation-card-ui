import React from 'react';

const OperationCardIssueItem = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData');
  const CalculateTotal = (column: any) => {
    return operationCardDetailData?.receipt_details?.reduce(
      (total: any, item: any) => total + item[column],
      0
    );
  };
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
          {operationCardDetailData?.operation_card_issue_details?.length > 0 &&
            operationCardDetailData?.operation_card_issue_details?.map(
              (data: any, i: any) => (
                <tr className="table-text" key={i}>
                  <td>{data.item}</td>
                  <td className="text-end">{data?.in_weight}</td>
                  <td className="text-end">{data?.in_gross_purity}</td>
                  <td className="text-end">{data?.in_gross_weight}</td>
                  <td className="text-end">{data?.in_fine_purity}</td>
                  <td className="text-end">{data?.in_fine_weight}</td>
                  <td className="text-end">{data?.old_operation_card}</td>
                </tr>
              )
            )}
          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>
            {[
              'in_weight',
              'in_gross_purity',
              'in_gross_weight',
              'in_fine_purity',
              'in_fine_weight',
              'old_operation_card',
            ].map((data: any, i: any) => (
              <td className="font-weight-bold text-end" key={i}>
                {CalculateTotal(data)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardIssueItem;
