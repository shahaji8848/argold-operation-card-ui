import React from 'react';

const ExistingMeltingLotBunchOrder = ({
  existingSalesOrderData,
  formatDate,
  selectedOrders,
  handleCheckboxChange,
  groupOrdersByDesign,
}: any) => {
  // Calculate totals for order weight
  const calculateTotals = () => {
    let totalOrderWeight = 0;
    existingSalesOrderData?.bunch_orders?.forEach((orderData: any) => {
      // orderData?.total_order_weight?.forEach((values: any) => {
      totalOrderWeight += orderData?.total_order_weight || 0;
      // });
      // totalOrderWeight += orderData.total_weight || 0;
    });
    return totalOrderWeight.toFixed(3);
  };

  return (
    <>
      {existingSalesOrderData?.bunch_orders?.length > 0 && (
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
                    'sales order number',
                    'order weight',
                    groupOrdersByDesign === 0 ? 'market design name' : 'design',
                    'Bunch Weight',
                    'Bunch Length',
                    'description',
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
                {existingSalesOrderData?.bunch_orders &&
                  existingSalesOrderData?.bunch_orders?.map((ordersData: any, idx: any) => {
                    return (
                      <>
                        {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                          const isChecked = !!selectedOrders[itemGroupData?.unique_key];

                          return (
                            <tr>
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  disabled={
                                    itemGroupData?.market_design_name_values?.length > 0 &&
                                    itemGroupData?.market_design_name_values.some(
                                      (marketDesign: any) => !!selectedOrders[marketDesign.soi_name]
                                    )
                                  } // Disable if any "bunch_length" checkbox is selected
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
                                {ordersData?.total_estimate_bunch_weight !== ' ' &&
                                ordersData?.total_estimate_bunch_weight !== null
                                  ? ordersData?.total_estimate_bunch_weight?.toFixed(3)
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
                                  const isWtChecked = !!selectedOrders[marketDesign?.soi_name];

                                  return (
                                    <>
                                      <div className="d-flex justify-content-between">
                                        <span className="text-start">
                                          <input
                                            type="checkbox"
                                            checked={isWtChecked || isChecked}
                                            disabled={isChecked} // Disable when main checkbox is selected
                                            onChange={() =>
                                              handleCheckboxChange(
                                                marketDesign?.soi_name,
                                                itemGroupData?.design,
                                                isWtChecked,
                                                'bunch'
                                              )
                                            }
                                          />
                                        </span>
                                        <span>{marketDesign?.bunch_length}</span>
                                      </div>
                                    </>
                                  );
                                })}
                              </td>
                              <td className="text-center">
                                {itemGroupData?.market_design_name_values?.map((marketDesign: any, index: any) => {
                                  const descriptionParts = marketDesign?.description?.split('-');
                                  const firstDescriptionPart = descriptionParts
                                    ? descriptionParts[0]
                                    : marketDesign?.description || '';
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
                  <td className="text-center fw-bold">Total</td>
                  <td className="text-center">{calculateTotals()}</td>
                  <td></td>
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

export default ExistingMeltingLotBunchOrder;
