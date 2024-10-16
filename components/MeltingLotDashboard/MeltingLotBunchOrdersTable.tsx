import React from 'react';
import Design from '../InputFieldText/Design';

const MeltingLotBunchOrdersTable = ({
  salesOrderData,
  selectedOrders,
  handleCheckboxChange,
  formatDate,
  handleSaveSalesOrder,
  selectedDesign,
  groupOrdersByDesign,
}: any) => {
  // Calculate totals for order weight
  const calculateTotals = () => {
    let totalOrderWeight = 0;
    salesOrderData?.bunch_orders?.forEach((orderData: any) => {
      // orderData?.total_order_weight?.forEach((values: any) => {
      totalOrderWeight += orderData?.total_order_weight || 0;
      // });
      // totalOrderWeight += orderData.total_weight || 0;
    });
    return totalOrderWeight.toFixed(3);
  };

  return (
    <>
      {salesOrderData?.bunch_orders?.length > 0 && (
        <>
          <div className="mt-2">
            <p className="p-0 m-0">Bunch Orders</p>
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
                    groupOrdersByDesign === 0 ? 'market design name' : 'design',
                    'Bunch Weight',
                    'Bunch Length',
                    'Per Inch Weight',
                    'Estimate Bunch Weight',
                  ].map((val: any, index: any) => (
                    <th className="thead-dark text-center" scope="col" key={index}>
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesOrderData?.bunch_orders &&
                  salesOrderData?.bunch_orders?.map((ordersData: any, idx: any) => {
                    return (
                      <>
                        {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                          const isChecked = !!selectedOrders[itemGroupData?.unique_key];
                          // Determine if the checkbox should be disabled
                          const isDisabled = selectedDesign && selectedDesign !== itemGroupData?.design;

                          return (
                            <tr>
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  checked={isChecked} // Set the checkbox checked state
                                  disabled={isDisabled} // Disable if a different design is selected
                                  onChange={() =>
                                    handleCheckboxChange(itemGroupData?.unique_key, itemGroupData?.design, isChecked, isDisabled)
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
                                {itemGroupData?.total_estimate_bunch_weight !== ' ' &&
                                itemGroupData?.total_estimate_bunch_weight !== null
                                  ? itemGroupData?.total_estimate_bunch_weight?.toFixed(3)
                                  : '--'}
                              </td>

                              <td className="text-center">
                                {groupOrdersByDesign === 0 ? itemGroupData?.market_design_name : itemGroupData?.design}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.estimate_bunch_weight}</div>
                                    </>
                                  );
                                })}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.bunch_length}</div>
                                    </>
                                  );
                                })}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.per_inch_weight}</div>
                                    </>
                                  );
                                })}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any) => {
                                  return (
                                    <>
                                      <div>{marketDesign?.estimate_bunch_weight}</div>
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

export default MeltingLotBunchOrdersTable;
