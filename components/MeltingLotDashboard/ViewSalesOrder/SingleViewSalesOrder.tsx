import React from 'react';

const SingleViewSalesOrder = ({ salesOrderData, formatDate, groupOrdersByDesign }: any) => {
  console.log('salesOrderData', salesOrderData);
  return (
    <>
      {salesOrderData?.single_orders?.length > 0 && (
        <>
          <div className="mt-2">
            <p className="p-0 m-0">Single Orders</p>
          </div>

          <div className="mt-1">
            <table className="table table-bordered">
              <thead className="card-listing-head">
                <tr>
                  {[
                    'order date',
                    'delivery date',
                    'customer',
                    'description',
                    'sales order number',
                    'order weight',
                    groupOrdersByDesign === 0 ? 'market design name' : 'design',

                    'size',
                    'qty',
                  ].map((val: any, index: any) => (
                    <th className="thead-dark text-center" scope="col" key={index}>
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesOrderData?.single_orders &&
                  salesOrderData?.single_orders?.map((ordersData: any, idx: any) => {
                    return (
                      <>
                        {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                          // Check if the current marketDesign item is checked

                          return (
                            <tr>
                              <td className="text-center">
                                {ordersData?.order_date !== ' ' && ordersData?.order_date !== null
                                  ? formatDate(ordersData?.order_date)
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {ordersData?.delivery_date !== ' ' && ordersData?.delivery_date !== null
                                  ? formatDate(ordersData?.delivery_date)
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {ordersData?.customer !== ' ' && ordersData?.customer !== null ? ordersData?.customer : '--'}
                              </td>
                              <td className="text-center">
                                {ordersData?.description !== ' ' && ordersData?.description !== null
                                  ? ordersData?.description
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                                  ? ordersData?.sales_order.split('-').pop()
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.total_order_weight !== ' ' && itemGroupData?.total_order_weight !== null
                                  ? itemGroupData?.total_order_weight?.toFixed(3)
                                  : '--'}
                              </td>

                              <td className="text-center">
                                {groupOrdersByDesign === 0 ? itemGroupData?.market_design_name : itemGroupData?.design}
                              </td>

                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.size}</div>
                                    </>
                                  );
                                })}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.quantity}</div>
                                    </>
                                  );
                                })}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default SingleViewSalesOrder;
