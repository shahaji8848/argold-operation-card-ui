import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import meltingStyles from '../../styles/melting-lot-data.module.css';
import useOperationDetailCard from '@/hooks/operationDetailCardhook';
import meltingLotList from './get_melting_lot_api_response.json';

const OperationCardTableDataset = () => {
  const { handleMeltingLotShowOrder }: any = useOperationDetailCard();

  return (
    <div className="card py-2 px-2">
      {meltingLotList?.data && meltingLotList?.data.length > 0 ? (
        meltingLotList?.data?.map((meltingData: any, idx: any) => {
          // const productType: string[] = meltingLotList?.data?.map((productData: any, index: number) => productData?.product);
          //
          // const columns = meltingLotList?.columns || [];
          // const productColumns = columns[productType] || []; // Adjust to use correct productType
          //
          // Extract the product type for the current item
          const productType: any = meltingData?.product; // Assuming productType is a single string

          // Access columns based on the productType
          const columns: any = meltingLotList?.columns || {};
          const productColumns = columns[productType] || []; // Adjust to use correct productType

          return (
            <div key={idx} className="mb-2">
              <div className="d-flex justify-content-between">
                <div>
                  <span
                    className={`text-uppercase ${meltingData.orders_added === 0 ? 'text-danger' : ''} ${
                      meltingData.orders_added === 1 ? 'text-success' : ''
                    } bold pe-2 fs-14`}
                  >
                    {meltingData.melting_plan || '--'}
                  </span>
                  <span>(purity: {meltingData.purity || '--'}) &nbsp;</span>
                  <span>(hook purity: {meltingData.hook_purity || '--'}) &nbsp;</span>
                  <span>(balance order weight: {meltingData.balance_order_weight || ' -- '}) &nbsp;</span>
                  <p className="text-uppercase text-success bold mt-1 fs-14">{meltingData.title || '--'}</p>
                </div>
                <div>
                  {meltingData.docstatus === 0 && (
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData.melting_plan_url} className="text-white" target="_blank">
                        Edit Melting Plan
                      </Link>
                    </button>
                  )}
                  {meltingData.docstatus === 1 && (
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData.melting_plan_url} className="text-white" target="_blank">
                        View Melting Plan
                      </Link>
                    </button>
                  )}
                  {meltingData.edit_url && (
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData.edit_url} className="text-white" target="_blank">
                        Edit Melting Lot
                      </Link>
                    </button>
                  )}
                  {meltingData.create_url && (
                    <button className="text-end btn btn-blue btn-py me-2">
                      <Link href={meltingData.create_url} className="text-white" target="_blank">
                        Create Melting Lot
                      </Link>
                    </button>
                  )}
                  {meltingData.view_url && (
                    <>
                      <button className="text-end btn btn-blue btn-py me-2">
                        <Link href={meltingData.view_url} className="text-white" target="_blank">
                          View Melting Lot
                        </Link>
                      </button>
                      <button className="text-end btn btn-blue btn-py ">
                        <Link
                          href={`add-sales-order?melting_plan=${meltingData.melting_plan}`}
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
                      {productColumns?.map((column: any, colIndex: any) => (
                        <th className="thead-dark text-center" scope="col" key={colIndex}>
                          {column.replace(/_/g, ' ')}
                        </th>
                      ))}
                      <th className="text-center">add order details</th>
                    </tr>
                  </thead>
                  <tbody className="card-listing-body">
                    {meltingData?.linked_operations && meltingData?.linked_operations.length > 0 ? (
                      meltingData.linked_operations.map((operation: any, opIdx: any) => (
                        <tr key={opIdx}>
                          {productColumns?.map((column: any, colIndex: any) => (
                            <td key={colIndex}>
                              {operation && column in operation
                                ? operation[column] && operation[column] !== null
                                  ? operation[column]
                                  : '--'
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
                        <td colSpan={productColumns.length + 1} className="text-center w-100 my-4">
                          <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                          <div className="fs-14 grey">No Data</div>
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
            <div className="fs-14 grey">No Data</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationCardTableDataset;
