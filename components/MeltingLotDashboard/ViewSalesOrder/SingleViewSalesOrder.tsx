import useMeltingViewHook from '@/hooks/meltingViewHokks';
import React from 'react';
import styles from '../../../styles/operation-card-list.module.css';
const SingleViewSalesOrder = ({ salesOrderData, formatDate, groupOrdersByDesign, columnList, title }: any) => {
  console.log(salesOrderData, 'SALES OORDER DAA');

  if (salesOrderData?.length === 0) {
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
    { key: 'product category', value: columnList?.product_category },
    { key: 'machine size', value: columnList?.machine_size },
    { key: 'design', value: columnList?.design },
    { key: 'Factory Design Name', value: columnList?.factory_design_name },
    { key: 'design line', value: columnList?.design_line },
    { key: 'description', value: columnList?.description },
    { key: 'order weight', value: true },
    { key: 'size', value: true },
    { key: 'quantity', value: true },
  ];
  return (
    <>
      {salesOrderData?.length > 0 && (
        <>
          <div className="mt-3">
            <p className="p-0 m-0">{title}</p>
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
                {salesOrderData &&
                  salesOrderData?.map((ordersData: any, idx: any) => {
                    // const productCategory = ordersData?.item_group_data
                    //   ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.product_category
                    //   : '--';
                    // const machineSize = ordersData?.item_group_data
                    //   ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.machine_size
                    //   : '--';
                    // const factoryDesign = ordersData?.item_group_data
                    //   ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.factory_design_name
                    //   : '--';
                    // const designLine = ordersData?.item_group_data
                    //   ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.design_line
                    //   : '--';
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
                      <tr style={{ fontSize: '12px' }}>
                        {showOrderDate ? (
                          <td className={`text-center`}>
                            <div>
                              {ordersData?.order_date !== ' ' && ordersData?.order_date !== null
                                ? formatDate(ordersData?.order_date)
                                : '--'}
                            </div>
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDeliveryDate ? (
                          <td className={`text-center`}>
                            {ordersData?.delivery_date !== ' ' && ordersData?.delivery_date !== null
                              ? formatDate(ordersData?.delivery_date)
                              : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showSalesOrder ? (
                          <td className={`text-center`}>
                            {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
                              ? ordersData?.sales_order.split('-').pop()
                              : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showCustomer ? (
                          <td className={`text-center`}>
                            {ordersData?.customer !== '' && ordersData?.customer !== null ? ordersData?.customer : '--'}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}

                        {showProductCategory ? (
                          <td>
                            {ordersData?.item_group_data.map((itemGroupData: any, index: any) => (
                              <div key={index} className={`text-center ${styles.textFormat}`}>
                                <div style={{ display: 'ruby-text' }}>{itemGroupData?.product_category || '--'}</div>
                                {/* as i dont want to count first and value */}
                                {itemGroupData?.market_design_name_values?.slice(0, -1).map((e: any, i: any) => (
                                  <div key={i} style={{ opacity: '0', borderBottom: '2px solid red' }}>
                                    --
                                  </div>
                                ))}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showMachineSize ? (
                          <td>
                            {ordersData?.item_group_data.map((itemGroupData: any, index: any) => (
                              <div key={index} className={`text-center ${styles.textFormat}`}>
                                <div style={{ display: 'ruby-text' }}>{itemGroupData?.machine_size || '--'}</div>
                                {itemGroupData?.market_design_name_values?.slice(0, -1).map((e: any, i: any) => (
                                  <div key={i} style={{ opacity: '0' }}>
                                    --
                                  </div>
                                ))}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDesign ? (
                          <td>
                            {ordersData?.item_group_data.map((itemGroupData: any, index: any) => (
                              <div key={index} className={`text-center ${styles.textFormat}`}>
                                <div style={{ display: 'ruby-text' }}>{itemGroupData?.design || '--'}</div>
                                {itemGroupData?.market_design_name_values?.slice(0, -1).map((e: any, i: any) => (
                                  <div key={i} style={{ opacity: '0' }}>
                                    --
                                  </div>
                                ))}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showFactoryDesign ? (
                          <td>
                            {ordersData?.item_group_data.map((itemGroupData: any, index: any) => (
                              <div key={index} className={`text-center ${styles.textFormat}`}>
                                <div style={{ display: 'ruby-text' }}>{itemGroupData?.factory_design_name || '--'}</div>
                                {/* as i dont want to count first and value */}
                                {itemGroupData?.market_design_name_values?.slice(0, -1).map((e: any, i: any) => (
                                  <div key={i} style={{ opacity: '0' }}>
                                    --
                                  </div>
                                ))}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDesignLine ? (
                          <td>
                            {ordersData?.item_group_data.map((itemGroupData: any, index: any) => (
                              <div key={index} className={`text-center ${styles.textFormat}`}>
                                <div style={{ display: 'ruby-text' }}>{itemGroupData?.design_line || '--'}</div>
                                {/* as i dont want to count first and value */}
                                {itemGroupData?.market_design_name_values?.slice(0, -1).map((e: any, i: any) => (
                                  <div key={i} style={{ opacity: '0' }}>
                                    --
                                  </div>
                                ))}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        {showDescription ? (
                          <td>
                            {ordersData.item_group_data.map((itemGroupData: any) =>
                              itemGroupData.market_design_name_values.map((e: any, index: any) => (
                                <div className={`text-center ${styles.textFormat}`}>
                                  <div style={{ display: 'ruby-text' }}>
                                    {e?.description?.length > 50 ? `${e?.description?.slice(0, 50)}...` : e?.description || '--'}
                                  </div>
                                </div>
                              ))
                            )}
                          </td>
                        ) : (
                          <td className="d-none"></td>
                        )}
                        <td>
                          {ordersData.item_group_data.map((itemGroupData: any) =>
                            itemGroupData.market_design_name_values.map((e: any) => (
                              <div className={`text-center`} key={e.soi_name}>
                                <div style={{ display: 'ruby-text' }}>
                                  {title === 'Single Orders'
                                    ? e.order_weight?.toFixed(3) || '--'
                                    : e.estimate_bunch_weight?.toFixed(3) || '--'}
                                </div>
                              </div>
                            ))
                          )}
                        </td>
                        <td>
                          {ordersData.item_group_data.map((itemGroupData: any) =>
                            itemGroupData.market_design_name_values.map((e: any) => (
                              <div className={`text-center`} key={e.soi_name}>
                                <div style={{ display: 'ruby-text' }}>{e.size?.toFixed(3) || '--'}</div>
                              </div>
                            ))
                          )}
                        </td>

                        <td>
                          {ordersData.item_group_data.map((itemGroupData: any) => (
                            <div className={``}>
                              {itemGroupData.market_design_name_values.map((e: any) => (
                                <div className={`text-center `} key={e.soi_name}>
                                  <div style={{ display: 'ruby-text' }}>{e.quantity?.toFixed(3) || '--'}</div>
                                </div>
                              ))}
                            </div>
                          ))}
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

export default SingleViewSalesOrder;

// border-bottom: 1px solid black;
//     margin-bottom: 4px;
//     padding-bottom: 4px;
