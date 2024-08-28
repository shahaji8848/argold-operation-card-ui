import React from 'react';

const MeltingLotSingleOrdersTable = ({
  salesOrderData,
  selectedOrders,
  handleCheckboxChange,
  formatDate,
  handleSaveSalesOrder,
}: any) => {
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
                    'select',
                    'order date',
                    'delivery date',
                    'customer',
                    'description',
                    'sales order number',
                    'order weight',
                    'market design name',
                    'size',
                    // 'quantity',
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
                    const marketDesignName = ordersData?.market_design_name;
                    return (
                      <tr>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={!!selectedOrders[ordersData?.sales_order]}
                            onChange={() => handleCheckboxChange(ordersData?.sales_order)}
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
                          {ordersData?.description !== ' ' && ordersData?.description !== null ? ordersData?.description : '--'}
                        </td>
                        <td className="text-center">
                          {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                            ? ordersData?.sales_order.split('-').pop()
                            : '--'}
                        </td>
                        <td className="text-center">
                          {/* {ordersData?.order_weight !== ' ' && ordersData?.order_weight !== null
                            ? ordersData?.order_weight?.toFixed(3)
                            : '--'} */}
                          {ordersData?.total_order_weight !== ' ' && ordersData?.total_order_weight !== null
                            ? ordersData?.total_order_weight?.toFixed(3)
                            : '--'}
                        </td>
                        <td className="text-center">
                          {ordersData?.market_design_name !== ' ' && ordersData?.market_design_name !== null
                            ? ordersData?.market_design_name
                            : '--'}
                        </td>
                        <td className="text-center">
                          {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                            const items = itemGroupData[marketDesignName];
                            return items && items?.map((items: any, idx: any) => <div>{items.size}</div>);
                          })}
                        </td>
                        <td className="text-center">
                          {ordersData?.item_group_data?.map((itemGroupData: any, idx: any) => {
                            const items = itemGroupData[marketDesignName];
                            return items && items?.map((items: any, idx: any) => <div>{items.quantity}</div>);
                          })}
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

export default MeltingLotSingleOrdersTable;
