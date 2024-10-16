import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import meltingStyles from '../../styles/melting-lot-data.module.css';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';

const OperationCardTable = ({ meltingLotList }: any) => {
  const { handleMeltingLotShowOrder }: any = useOperationDetailCard();
  const { meltingPlanFilters, handleViewSalesOrderOnProductAndPurity }: any = useMeltingLotSalesOrder();

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
                <span>
                  {meltingData?.info && (
                    <>
                      <span>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="info-tooltip">
                              <span className="text-captilize bold">order weight: </span>
                              {meltingData?.info?.order_weight.toFixed(2) || ' -- '}
                              &nbsp;<span>&lt;</span>&nbsp;
                              <span className="text-captilize bold">sum of balance weight: </span>
                              {meltingData?.info?.sum_of_balance_weight.toFixed(2) || ' -- '}
                            </Tooltip>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            style={{ fill: 'rgb(220 53 69)', cursor: 'pointer' }}
                            className="bi bi-info-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>
                        </OverlayTrigger>
                      </span>
                    </>
                  )}
                </span>

                <p className="text-uppercase text-success bold mt-1 fs-14">{meltingData?.title || '--'}</p>
              </div>
              <div>
                <button
                  className="text-end btn btn-blue btn-py me-2 "
                  onClick={() => handleViewSalesOrderOnProductAndPurity(meltingData?.melting_plan)}
                >
                  <Link
                    href={`view-sales-order?melting_plan=${meltingData?.melting_plan}`}
                    className="text-white"
                    target="_blank"
                  >
                    View Sales Order
                  </Link>
                </button>
                {meltingData?.docstatus === 0 && (
                  <>
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData?.melting_plan_url} className="text-white" target="_blank">
                        Edit Melting Plan
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
                    {/* {meltingData?.columns?.map((column: any, colIndex: any) => (
                      <th className="thead-dark text-center" scope="col" key={colIndex}>
                        {column.replace(/_/g, ' ')}
                      </th>
                    ))} */}
                    {meltingData?.linked_operations &&
                      meltingData?.linked_operations.length > 0 &&
                      Object.keys(meltingData.linked_operations[0]).map((key, colIndex) => (
                        <>
                          <th className="thead-dark text-center" scope="col" key={colIndex}>
                            {key.replace(/_/g, ' ')}
                          </th>
                        </>
                      ))}
                    <th className="text-center">add order details</th>
                  </tr>
                </thead>
                <tbody className="card-listing-body">
                  {meltingData?.linked_operations && meltingData?.linked_operations.length > 0 ? (
                    // meltingData?.linked_operations.map((operation: any, opIdx: any) => (
                    //   <tr key={opIdx}>
                    //     {meltingData?.columns?.map((column: any, colIndex: any) => (
                    //       <td key={colIndex}>
                    //         {operation && column in operation
                    //           ? operation[column] && operation[column] !== null
                    //             ? column === 'purity' && typeof operation[column] === 'number'
                    //               ? operation[column].toFixed(3)
                    //               : operation[column]
                    //             : '--'
                    //           : '--'}
                    //       </td>
                    //     ))}
                    //     <td>
                    //       {operation?.operation_card ? (
                    //         <button
                    //           className={`btn btn-blue btn-py ${meltingStyles.edit_order_details_btn}`}
                    //           onClick={handleMeltingLotShowOrder}
                    //         >
                    //           <Link
                    //             href={`operation-card-detail?name=${operation?.operation_card}`}
                    //             className="text-white"
                    //             target="_blank"
                    //           >
                    //             Edit Order Details
                    //           </Link>
                    //         </button>
                    //       ) : null}
                    //     </td>
                    //   </tr>
                    // ))

                    meltingData?.linked_operations.map((operation: any, opIdx: any) => (
                      <tr key={opIdx}>
                        {Object.keys(operation).map((key, colIndex) => (
                          <td key={colIndex} className="text-center">
                            {operation[key] !== null && operation[key] !== undefined && operation[key] !== ''
                              ? typeof operation[key] === 'number' && key === 'purity'
                                ? operation[key].toFixed(3)
                                : operation[key]
                              : '--'}
                          </td>
                        ))}
                        <td className="text-center">
                          {operation?.operation_card ? (
                            <button
                              className={`btn btn-blue btn-py ${meltingStyles.edit_order_details_btn}`}
                              onClick={handleMeltingLotShowOrder}
                            >
                              <Link
                                href={`operation-card-detail?name=${operation?.operation_card}`}
                                className="text-white text-center"
                                target="_blank"
                              >
                                Edit Order Details
                              </Link>
                            </button>
                          ) : (
                            '--'
                          )}
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
