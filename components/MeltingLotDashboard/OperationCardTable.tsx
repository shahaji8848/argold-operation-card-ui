import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import meltingStyles from '../../styles/melting-lot-data.module.css';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';

const OperationCardTable = ({ meltingLotList }: any) => {
  const { handleMeltingLotShowOrder }: any = useOperationDetailCard();

  return (
    <div className="card py-2 px-2">
      {meltingLotList && meltingLotList.length > 0 ? (
        meltingLotList.map((meltingData: any, idx: any) => (
          <div className="mb-2" key={idx}>
            <div className="d-flex justify-content-between">
              <div>
                <span
                  className={`text-uppercase ${meltingData?.orders_added === 0 ? 'text-danger' : ''} ${
                    meltingData?.orders_added === 1 ? 'text-success' : ''
                  } bold pe-2 fs-14`}
                >
                  {meltingData?.melting_plan || '--'}
                </span>
                <span>(purity: {meltingData?.purity || '--'}) &nbsp;</span>
                <span>(hook purity: {meltingData?.hook_purity || '--'}) &nbsp;</span>
                <span>
                  (balance order weight:
                  {meltingData?.balance_order_weight || ' -- '}) &nbsp;
                </span>
                <p className="text-uppercase text-success bold mt-1 fs-14">{meltingData?.title || '--'}</p>
              </div>
              <div>
                {meltingData?.docstatus === 0 && (
                  <button className="text-end btn btn-blue btn-py me-2">
                    <Link href={meltingData?.melting_plan_url} className="text-white" target="_blank">
                      Edit Melting Plan
                    </Link>
                  </button>
                )}
                {meltingData?.docstatus === 1 && (
                  <button className="text-end btn btn-blue btn-py me-2">
                    <Link href={meltingData?.melting_plan_url} className="text-white" target="_blank">
                      View Melting Plan
                    </Link>
                  </button>
                )}
                {meltingData?.edit_url && (
                  <button className="text-end btn btn-blue btn-py me-2">
                    <Link href={meltingData?.edit_url} className="text-white" target="_blank">
                      Edit Melting Lot
                    </Link>
                  </button>
                )}
                {meltingData?.create_url && (
                  <button className="text-end btn btn-blue btn-py me-2">
                    <Link href={meltingData?.create_url} className="text-white" target="_blank">
                      Create Melting Lot
                    </Link>
                  </button>
                )}
                {meltingData?.view_url && (
                  <>
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData?.view_url} className="text-white" target="_blank">
                        View Melting Lot
                      </Link>
                    </button>
                    <button className="text-end btn btn-blue btn-py ">
                      <Link
                        href={`add-sales-order?melting_plan=${meltingData?.melting_plan}`}
                        className="text-white"
                        target="_blank"
                      >
                        Add Sales Order
                      </Link>
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="card-listing-head">
                  <tr>
                    {meltingData?.columns?.map((column: any, colIndex: any) => (
                      <th className="thead-dark text-center" scope="col" key={colIndex}>
                        {column.replace(/_/g, ' ')}
                      </th>
                    ))}
                    <th>add order details</th>
                  </tr>
                </thead>
                <tbody className="card-listing-body">
                  {meltingData?.linked_operations && meltingData?.linked_operations.length > 0 ? (
                    meltingData?.linked_operations.map((operation: any, opIdx: any) => (
                      <tr key={opIdx}>
                        {meltingData?.columns?.map((column: any, colIndex: any) => (
                          <td key={colIndex}>{operation && column in operation ? operation[column] : '--'}</td>
                        ))}
                        <td>
                          {operation?.operation_card ? (
                            <button
                              className={`btn btn-blue btn-py ${meltingStyles.edit_order_details_btn}`}
                              onClick={handleMeltingLotShowOrder}
                            >
                              <Link
                                href={`operation-card-detail?name=${operation?.operation_card}`}
                                className="text-white"
                                target="_blank"
                              >
                                Edit Order Details
                              </Link>
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={meltingData?.columns?.length + 1} className="text-center w-100 my-4">
                        <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                        <div className="fs-14 grey">No Data</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center">
          <div className="text-center w-100 my-4">
            <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
            <div className="fs-14 grey">No Data</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardTable;
