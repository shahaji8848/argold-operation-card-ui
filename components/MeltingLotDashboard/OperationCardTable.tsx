import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import meltingStyles from '../../styles/melting-lot-data.module.css';

const OperationCardTable = ({ meltingLotList }: any) => {
  return (
    <div className="card py-2 px-2">
      {meltingLotList && meltingLotList?.length > 0 ? (
        meltingLotList?.map((meltingData: any, idx: any) => {
          return (
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <div>
                  <span className="text-uppercase text-danger bold pe-2 fs-14">
                    {meltingData?.melting_plan && meltingData?.melting_plan !== '' && meltingData?.melting_plan !== null
                      ? meltingData?.melting_plan
                      : '--'}
                  </span>
                  <span>
                    (purity:{' '}
                    {meltingData?.purity && meltingData?.purity !== '' && meltingData?.purity !== null
                      ? meltingData?.purity
                      : '--'}
                    ) &nbsp;
                  </span>
                  <span>
                    (hook purity:{' '}
                    {meltingData?.hook_purity && meltingData?.hook_purity !== '' && meltingData?.hook_purity !== null
                      ? meltingData?.hook_purity
                      : '--'}
                    ) &nbsp;
                  </span>
                  <span>
                    (balance order weight:
                    {meltingData?.balance_order_weight &&
                    meltingData?.balance_order_weight !== '' &&
                    meltingData?.balance_order_weight !== null
                      ? meltingData?.balance_order_weight
                      : ' -- '}
                    ) &nbsp;
                  </span>
                  <p className="text-uppercase text-success bold mt-1 fs-14">
                    {meltingData?.title === '' || meltingData?.title === null ? '--' : meltingData?.title}
                  </p>
                </div>
                <div>
                  {meltingData?.edit_url && (
                    <button className="text-end btn btn-blue btn-py ">
                      <Link href={meltingData?.edit_url} className="text-white" target="_blank">
                        Edit Melting Lot
                      </Link>
                    </button>
                  )}
                  {meltingData?.create_url && (
                    <button className="text-end btn btn-blue btn-py ">
                      <Link href={meltingData?.create_url} className="text-white" target="_blank">
                        Create Melting Lot
                      </Link>
                    </button>
                  )}
                  {meltingData?.view_url && (
                    <>
                      <button className="text-end btn btn-blue btn-py me-2">
                        <Link
                          href={`add-sales-order?melting_plan=${meltingData?.melting_plan}`}
                          className="text-white"
                          target="_blank"
                        >
                          Add Sales Order
                        </Link>
                      </button>
                      <button className="text-end btn btn-blue btn-py ">
                        <Link href={meltingData?.view_url} className="text-white" target="_blank">
                          View Melting Lot
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
                      {[
                        'Melting lot',
                        'chain',
                        'type',
                        'size',
                        'design',
                        'line',
                        'cutting process',
                        'tone',
                        'description',
                        'weight',
                        'pending wt',
                        'split level',
                        'current dept',
                        'in weight',
                        'out lot purity',
                        'touch purity',
                        'fire touch purity',
                        'wastage',
                        'add order details',
                      ].map((val: any, index: any) => (
                        <th className="thead-dark text-center" scope="col" key={index}>
                          {val}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="card-listing-body">
                    {meltingData?.linked_operations && meltingData?.linked_operations.length > 0 ? (
                      meltingData?.linked_operations?.map((meltingData: any, idx: any) => {
                        return (
                          <tr>
                            <td>
                              {meltingData?.melting_lot && meltingData?.melting_lot !== '' && meltingData?.melting_lot !== null
                                ? meltingData?.melting_lot
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.product_category &&
                              meltingData?.product_category !== '' &&
                              meltingData?.product_category !== null
                                ? meltingData?.product_category
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.type && meltingData?.type !== '' && meltingData?.type !== null
                                ? meltingData?.type
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.machine_size && meltingData?.machine_size !== '' && meltingData?.machine_size !== null
                                ? meltingData?.machine_size
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.design && meltingData?.design !== '' && meltingData?.design !== null
                                ? meltingData?.design
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.line && meltingData?.line !== '' && meltingData?.line !== null
                                ? meltingData?.line
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.cutting_process &&
                              meltingData?.cutting_process !== '' &&
                              meltingData?.cutting_process !== null
                                ? meltingData?.cutting_process
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.tone && meltingData?.tone !== '' && meltingData?.tone !== null
                                ? meltingData?.tone
                                : '--'}{' '}
                            </td>
                            <td>
                              {meltingData?.description && meltingData?.description !== '' && meltingData?.description !== null
                                ? meltingData?.description
                                : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.weight && meltingData?.weight !== null ? meltingData?.weight : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.balance_weight &&
                              meltingData?.balance_weight !== '' &&
                              meltingData?.balance_weight !== null
                                ? meltingData?.balance_weight
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.split_level && meltingData?.split_level !== '' && meltingData?.split_level !== null
                                ? meltingData?.split_level
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.current_dept && meltingData?.current_dept !== '' && meltingData?.current_dept !== null
                                ? meltingData?.current_dept
                                : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.in_weight && meltingData?.in_weight !== null ? meltingData?.in_weight : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.out_lot_purity &&
                              meltingData?.out_lot_purity !== '' &&
                              meltingData?.out_lot_purity !== null
                                ? meltingData?.out_lot_purity
                                : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.tounch_purity &&
                              meltingData?.tounch_purity !== '' &&
                              meltingData?.tounch_purity !== null
                                ? meltingData?.tounch_purity
                                : '--'}
                            </td>
                            <td className="text-end">
                              {meltingData?.fire_tounch_purity &&
                              meltingData?.fire_tounch_purity !== '' &&
                              meltingData?.fire_tounch_purity !== null
                                ? meltingData?.fire_tounch_purity
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.waistage && meltingData?.waistage !== '' && meltingData?.waistage !== null
                                ? meltingData?.waistage
                                : '--'}
                            </td>
                            <td>
                              {meltingData?.operation_card &&
                              meltingData?.operation_card !== '' &&
                              meltingData?.operation_card !== null ? (
                                <button className={`btn btn-blue btn-py ${meltingStyles.edit_order_details_btn}`}>
                                  <Link
                                    href={`operation-card-detail?name=${meltingData?.operation_card}`}
                                    className="text-white"
                                    target="_blank"
                                  >
                                    Edit Order Details
                                  </Link>
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={19} className="text-center w-100 my-4">
                          <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                          <div className="fs-14 grey">No Data </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center">
          <div className="text-center w-100 my-4">
            <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
            <div className="fs-14 grey">No Data </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardTable;
