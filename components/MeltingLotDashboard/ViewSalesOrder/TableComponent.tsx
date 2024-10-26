import React from 'react';

type Props = {};

const TableComponent = (salesOrderData: any, formatDate: any) => {
  return (
    <table className="table table-bordered">
      <thead className="card-listing-head">
        <tr>
          {[
            'order date',
            'delivery date',
            'sales order number',
            'customer',
            'description',
            'Product Category',
            'Machine Size',
            'Design',
            'weight',
            'Size',
            'Quantity',
          ].map((val: any, index: any) => (
            <th className="thead-dark text-center" scope="col" key={index}>
              {val}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {salesOrderData &&
          salesOrderData?.map((ordersData: any, idx: any) => {
            const productCategory = ordersData?.item_group_data
              ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.product_category
              : '--';
            const machineSize = ordersData?.item_group_data
              ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.machine_size
              : '--';

            return (
              <tr>
                <td className="text-center">
                  {ordersData?.order_date !== ' ' && ordersData?.order_date !== null ? formatDate(ordersData?.order_date) : '--'}
                </td>
                <td className="text-center">
                  {ordersData?.delivery_date !== ' ' && ordersData?.delivery_date !== null
                    ? formatDate(ordersData?.delivery_date)
                    : '--'}
                </td>
                <td className="text-center">
                  {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                    ? ordersData?.sales_order.split('-').pop()
                    : '--'}
                </td>
                <td className="text-center">
                  {ordersData?.customer !== ' ' && ordersData?.customer !== null ? ordersData?.customer : '--'}
                </td>
                <td className="text-center">
                  {ordersData?.description !== ' ' && ordersData?.description !== null ? ordersData?.description : '--'}
                </td>

                <td className="text-center">{productCategory || '--'}</td>
                <td>
                  {ordersData.item_group_data.map((itemGroupData: any) =>
                    itemGroupData.market_design_name_values.map((e: any) => (
                      <div className="text-center" key={e.soi_name}>
                        {e?.machine_size?.toFixed(2) || '--'}
                      </div>
                    ))
                  )}
                </td>
                <td className="text-center">{ordersData?.design || '--'}</td>
                <td>
                  {ordersData.item_group_data.map((itemGroupData: any) =>
                    itemGroupData.market_design_name_values.map((e: any) => (
                      <div className="text-center" key={e.soi_name}>
                        {e.order_weight?.toFixed(2) || '--'}
                      </div>
                    ))
                  )}
                </td>

                <td>
                  {ordersData.item_group_data.map((itemGroupData: any) =>
                    itemGroupData.market_design_name_values.map((e: any) => (
                      <div className="text-center" key={e.soi_name}>
                        {e.size?.toFixed(2) || '--'}
                      </div>
                    ))
                  )}
                </td>

                <td>
                  {ordersData.item_group_data.map((itemGroupData: any) =>
                    itemGroupData.market_design_name_values.map((e: any) => (
                      <div className="text-center" key={e.soi_name}>
                        {e.quantity?.toFixed(2) || '--'}
                      </div>
                    ))
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableComponent;
