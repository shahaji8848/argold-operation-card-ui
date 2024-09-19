import React from 'react';

const ExistingMeltingLotSingleOrder = ({ existingSalesOrderData, formatDate, selectedOrders, handleCheckboxChange }: any) => {
  return (
    <>
      {existingSalesOrderData?.single_orders?.length > 0 && (
        <>
          <div className="mt-2">
            <p className="p-0 m-0">Single Orders</p>
          </div>

          <div className="mt-1">
            <table className="table table-bordered">
              <thead className="card-listing-head">
                <tr>
                  {[
                    'select',
                    'order date',
                    'delivery date',
                    'customer',
                    'description',
                    'sales order number',
                    'order weight',
                    'market design name',
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
                {existingSalesOrderData?.single_orders &&
                  existingSalesOrderData?.single_orders?.map((ordersData: any, idx: any) => {
                    return (
                      <>
                        {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                          // Check if the current marketDesign item is checked
                          const isChecked = !!selectedOrders[itemGroupData?.unique_key];
                          return (
                            <tr>
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  checked={isChecked} // Set the checkbox checked state
                                  onChange={() =>
                                    handleCheckboxChange(itemGroupData?.unique_key, itemGroupData?.design, isChecked, '')
                                  }
                                />
                              </td>
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
                                {ordersData?.total_order_weight !== ' ' && ordersData?.total_order_weight !== null
                                  ? ordersData?.total_order_weight?.toFixed(3)
                                  : '--'}
                              </td>

                              <td className="text-center">{itemGroupData?.market_design_name}</td>

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

export default ExistingMeltingLotSingleOrder;