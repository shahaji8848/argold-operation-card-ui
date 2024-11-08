import React from 'react';

const ExistingMeltingLotSingleOrder = ({
  existingSalesOrderData,
  formatDate,
  selectedOrders,
  handleCheckboxChange,
  groupOrdersByDesign,
}: any) => {
  const calculateTotals = () => {
    let totalOrderWeight = 0;
    existingSalesOrderData?.single_orders?.forEach((orderData: any) => {
      totalOrderWeight += orderData?.total_order_weight || 0;
    });
    return totalOrderWeight.toFixed(3);
  };

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
                    'sales order number',
                    'order weight',
                    groupOrdersByDesign === 0 ? 'market design name' : 'design',
                    'description',
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
                          const isChecked = selectedOrders && !!selectedOrders[itemGroupData?.unique_key];
                          return (
                            <tr>
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  checked={isChecked} // Set the checkbox checked state
                                  onChange={() =>
                                    handleCheckboxChange(itemGroupData?.unique_key, itemGroupData?.design, isChecked, 'main')
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
                                {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                                  ? ordersData?.sales_order.split('-').pop()
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {ordersData?.total_order_weight !== ' ' && ordersData?.total_order_weight !== null
                                  ? ordersData?.total_order_weight?.toFixed(3)
                                  : '--'}
                              </td>
                              <td className="text-center">
                                {groupOrdersByDesign === 0 ? itemGroupData?.market_design_name : itemGroupData?.design}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any, index: any) => {
                                  const descriptionParts = marketDesign?.description?.split('-');
                                  const firstDescriptionPart = descriptionParts
                                    ? descriptionParts[0]
                                    : marketDesign?.description || '--';
                                  return (
                                    <div key={index}>
                                      <div>{firstDescriptionPart}</div>
                                    </div>
                                  );
                                })}
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

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-center fw-bold">Total</td>
                  <td className="text-center">{calculateTotals()}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ExistingMeltingLotSingleOrder;
