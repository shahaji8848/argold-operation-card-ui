import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import IssueDescriptionModal from './IssueDescriptionModal';

const OperationCardIssueItem = ({ operationCardDetailData }: any) => {
  const router = useRouter();
  const hasOPkey = (val: any) => {
    return val.hasOwnProperty('operation_card');
  };

  const renderTableCell = (data: any, key: any) => {
    const value = data?.hasOwnProperty(key) ? data[key] : '--';

    return (
      <td className="text-end">
        {value === 0 || value === '' || value === null || value === '--' ? '--' : Number.parseFloat(value).toFixed(3)}
      </td>
    );
  };

  const InValidColumnsForSummation = [
    'old_operation_card',
    'karigar',
    'next_karigar',
    'tounch_no',
    'fire_tounch_no',
    'machine',
    'worker',
    'line_number',
    'next_tracking_number',
    'next_worker',
  ];

  const redirectToNextOC = (oc_id: string) => {
    router.push(`/operation-card-detail?name=${oc_id}`);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100); // Give time for the route to change before reloading
    // router.replace(router.asPath); // This forces the page to refresh
    router.refresh(); // Refresh the current page
  };

  const CalculateTotal = (column: string, data: any[]) => {
    if (InValidColumnsForSummation?.includes(`${column}`)) {
      return '--';
    } else {
      if (column === 'in_gross_purity') {
        const totalInWeight = data.reduce((total: any, item: any) => total + item['in_weight'], 0);
        const totalInGrossWeight = data.reduce((total: any, item: any) => total + item['in_gross_weight'], 0);
        if (totalInGrossWeight !== 0 && totalInWeight !== 0) {
          return ((totalInGrossWeight / totalInWeight) * 100).toFixed(3);
        } else {
          return 0;
        }
        // return ((totalInGrossWeight / totalInWeight) * 100).toFixed(3);
      } else if (column === 'in_fine_purity') {
        const totalGrossWeight = data.reduce((total: any, item: any) => total + item['in_gross_weight'], 0);
        const totalFineWeight = data.reduce((total: any, item: any) => total + item['in_fine_weight'], 0);
        if (totalFineWeight !== 0 && totalGrossWeight !== 0) {
          return ((totalFineWeight / totalGrossWeight) * 100).toFixed(3);
        } else {
          return 0;
        }
        // return ((totalFineWeight / totalGrossWeight) * 100).toFixed(3);
      } else {
        return operationCardDetailData?.operation_card_issue_details
          ?.reduce((total: any, item: any) => {
            if (item[column] === undefined) {
              return 0;
            } else {
              return total + item[column];
            }
          }, 0)
          .toFixed(3);
      }
    }
  };

  function ToolTipData(descriptionData: string) {
    return (
      <Tooltip id="tooltip">
        <strong>{descriptionData}</strong>
      </Tooltip>
    );
  }

  return (
    <div className="table-responsive ">
      <table className="table table-bordered">
        <thead>
          <tr className="table-text">
            {[
              'Item',
              'In Wt',
              'Gross Purity',
              'Gross Wt',
              'Fine Purity',
              'Fine Weight',
              'Touch No',
              'Fire Touch No ',
              'Line Number',
              'Tracking Number',
              'Machine',
              'Karigar',
              'Worker',
              'Next Karigar',
              'Next Worker',
              'OP',
              'Description',
            ].map((val, i: any) => (
              <th className="thead-dark text-center" scope="col" key={i}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {operationCardDetailData?.operation_card_issue_details?.length > 0 &&
            operationCardDetailData?.operation_card_issue_details?.map((data: any, i: any) => (
              <tr className="table-text" key={i}>
                <td>{data.item}</td>
                <td className="text-end">{data?.in_weight === 0 ? '--' : data?.in_weight?.toFixed(3)}</td>
                <td className="text-end">{data?.in_gross_purity === 0 ? '--' : data?.in_gross_purity?.toFixed(3)}</td>
                <td className="text-end">{data?.in_gross_weight === 0 ? '--' : data?.in_gross_weight?.toFixed(3)}</td>
                <td className="text-end">{data?.in_fine_purity === 0 ? '--' : data?.in_fine_purity?.toFixed(3)}</td>
                <td className="text-end">{data?.in_fine_weight === 0 ? '--' : data?.in_fine_weight?.toFixed(3)}</td>
                <td className="text-end">{data?.in_weight === 0 || data?.tounch_no === 0 ? '--' : data?.tounch_no}</td>
                <td className="text-end">{data?.in_weight === 0 || data?.fire_tounch_no === 0 ? '--' : data?.fire_tounch_no}</td>
                <td className="text-end">{data?.line_number === 0 ? '--' : data?.line_number}</td>
                <td className="text-end">{data?.next_tracking_number === '' ? '--' : data?.next_tracking_number}</td>
                <td className="text-end">{data?.machine ?? '--'}</td>
                <td className="text-end">{data?.karigar ?? '--'}</td>
                <td className="text-end">{data?.next_worker ?? '--'}</td>
                <td className="text-end">{data?.next_karigar ?? '--'}</td>
                <td className="text-end">{data?.next_worker ?? '--'}</td>
                <td className="text-end">
                  {hasOPkey(data) ? (
                    <Link
                      href={`/operation-card-detail?name=${data?.operation_card}`}
                      onClick={() => redirectToNextOC(data?.operation_card)}
                    >
                      {data?.operation_card?.split('-').pop()}
                    </Link>
                  ) : (
                    '--'
                  )}
                </td>
                <td>
                  {data?.description && data?.description !== '' ? (
                    <IssueDescriptionModal description={data?.description} />
                  ) : (
                    '--'
                  )}
                </td>
              </tr>
            ))}
          <tr className="table-text">
            <td className="font-weight-bold ">Total</td>
            {[
              'in_weight',
              'in_gross_purity',
              'in_gross_weight',
              'in_fine_purity',
              'in_fine_weight',
              'tounch_no',
              'fire_tounch_no',
              'line_number',
              'next_tracking_number',
              'machine',
              'karigar',
              'worker',
              'next_karigar',
              'next_worker',
              'old_operation_card',
            ].map((data: any, i: any) => (
              <td className="font-weight-bold text-end" key={i}>
                {CalculateTotal(data, operationCardDetailData?.operation_card_issue_details || [])}
              </td>
            ))}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardIssueItem;
