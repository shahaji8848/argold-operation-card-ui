import React from 'react';

const BunchViewSalesOrder = ({ salesOrderData, formatDate, groupOrdersByDesign, columnList }: any) => {
  if (salesOrderData?.bunch_orders?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h3>No Single Orders Found</h3>
      </div>
    );
  }

  const arrayforColumnNames = [
    { key: 'order date', value: columnList?.order_date },
    { key: 'delivery date', value: columnList?.delivery_date },
    { key: 'sales order', value: columnList?.sales_order },
    { key: 'customer', value: columnList?.customer },
    { key: 'description', value: columnList?.description },
    { key: 'product category', value: columnList?.product_category },
    { key: 'machine size', value: columnList?.machine_size },
    { key: 'Factory Design Name', value: columnList?.factory_design_name },
    { key: 'design line', value: columnList?.design_line },
    { key: 'design', value: columnList?.design },
    { key: 'Bunch order weight', value: true },
    { key: 'size', value: true },
    { key: 'quantity', value: true },
  ];

  return (
    <>
      {salesOrderData?.bunch_orders?.length > 0 && (
        <>
          <div className="mt-3">
            <p className="p-0 m-0">Bunch Orders</p>
          </div>
          <div className="mt-1">
            <table className="table table-bordered">
              <thead className="card-listing-head">
                <tr>
                  {arrayforColumnNames.map((val, index) => {
                    return val?.value ? (
                      <th className="thead-dark text-center" scope="col" key={index}>
                        {val?.key}
                      </th>
                    ) : (
                      <th className="thead-dark text-center d-none" scope="col" key={index}>
                        {val?.key}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {salesOrderData?.bunch_orders &&
                  salesOrderData?.bunch_orders?.map((ordersData: any, idx: any) => {
                    const productCategory = ordersData?.item_group_data
                      ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.product_category
                      : '--';
                    const machineSize = ordersData?.item_group_data
                      ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.machine_size
                      : '--';
                    const factoryDesign = ordersData?.item_group_data
                      ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.factory_design_name
                      : '--';
                    const designLine = ordersData?.item_group_data
                      ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.design_line
                      : '--';
                    const showOrderDate = arrayforColumnNames.find((col) => col.key === 'order date')?.value;
                    const showDeliveryDate = arrayforColumnNames.find((col) => col.key === 'delivery date')?.value;
                    const showSalesOrder = arrayforColumnNames.find((col) => col.key === 'sales order')?.value;
                    const showCustomer = arrayforColumnNames.find((col) => col.key === 'customer')?.value;
                    const showDescription = arrayforColumnNames.find((col) => col.key === 'description')?.value;
                    const showProductCategory = arrayforColumnNames.find((col) => col.key === 'product category')?.value;
                    const showMachineSize = arrayforColumnNames.find((col) => col.key === 'machine size')?.value;
                    const showDesignLine = arrayforColumnNames.find((col) => col.key === 'design line')?.value;
                    const showDesign = arrayforColumnNames.find((col) => col.key === 'design')?.value;
                    const showFactoryDesign = arrayforColumnNames.find((col) => col.key === 'Factory Design Name')?.value;
                    return (
                      <tr>
                        {showOrderDate ? (
                          <td className="text-center">
                            {ordersData?.order_date !== ' ' && ordersData?.order_date !== null
                              ? formatDate(ordersData?.order_date)
                              : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDeliveryDate ? (
                          <td className="text-center">
                            {ordersData?.delivery_date !== ' ' && ordersData?.delivery_date !== null
                              ? formatDate(ordersData?.delivery_date)
                              : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showSalesOrder ? (
                          <td className="text-center">
                            {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                              ? ordersData?.sales_order.split('-').pop()
                              : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showCustomer ? (
                          <td className="text-center">
                            {ordersData?.customer !== '' && ordersData?.customer !== null ? ordersData?.customer : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDescription ? (
                          <td className="text-center">
                            {ordersData?.description !== ' ' && ordersData?.description !== null ? ordersData?.description : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showProductCategory ? (
                          <td className="text-center">{productCategory || '--'}</td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showMachineSize ? <td className="text-center">{machineSize || '--'}</td> : <td className="d-none"></td>}
                        {showFactoryDesign ? (
                          <td className="text-center">{factoryDesign || ''}</td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDesignLine ? <td className="text-center">{designLine || '--'}</td> : <td className="d-none"></td>}
                        {showDesign ? (
                          <td className="text-center">{ordersData?.design || '--'}</td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        <td className="text-center">
                          {ordersData?.total_estimate_bunch_weight ? ordersData?.total_estimate_bunch_weight?.toFixed(3) : '--'}
                        </td>
                        <td>
                          {ordersData.item_group_data.map((itemGroupData: any) =>
                            itemGroupData.market_design_name_values.map((e: any) => (
                              <div className="text-center" key={e.soi_name}>
                                {e.size?.toFixed(3) || '--'}
                              </div>
                            ))
                          )}
                        </td>

                        <td>
                          {ordersData.item_group_data.map((itemGroupData: any) =>
                            itemGroupData.market_design_name_values.map((e: any) => (
                              <div className="text-center" key={e.soi_name}>
                                {e.quantity?.toFixed(3) || '--'}
                              </div>
                            ))
                          )}
                        </td>
                      </tr>
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

export default BunchViewSalesOrder;
