import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useCommon from '@/hooks/common';

const hasGPCItem = (operationCardDetailData: any) => {
  const findGPCItem = operationCardDetailData?.operation_card_issue_details?.find((issueItem: any) => issueItem?.item === 'GPC');
  return findGPCItem;
};

const columnsBuilder = (operationCardDetailData: any, operationCardProductDept: any) => {
  let columnsList: string[] = [
    'Order Date',
    'Customer Name',
    'Sales Order',
    'Order Weight',
    operationCardDetailData?.product === 'KA Chain' || operationCardDetailData?.product === 'Ball Chain'
      ? operationCardProductDept?.group_orders_by_design === 0
        ? 'Market Design Name'
        : ''
      : 'item',
    operationCardProductDept?.group_orders_by_design === 1 ? 'Design Name' : '',
    'Production Qty',
    'Size',
  ];
  if (hasGPCItem(operationCardDetailData)) {
    columnsList.push('Ready Qty');
  }
  // return columnsList;
  // Filter out any null values from the columns list
  return columnsList.filter((column) => column !== '');
};

const rowsBuilder = (
  operationCardDetailData: any,
  rowData: any,
  doGetAllOrders: boolean,
  selectedItems: any,
  handleCheckboxChange: (order_id: string) => void,
  handleChangesInReadyQty: (key: any, changedValue: number, order_id: string, innerArray: any) => void,
  handleCustomerChange: (order_id: any, value: any) => void,
  operationCardProductDept: any,
  formatDate: any
) => {
  return (
    <tr className="table-text" key={rowData?.order_id}>
      <td className="text-center">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(rowData?.order_id)}
          checked={selectedItems.includes(rowData?.order_id)}
        />
      </td>
      <td>
        <div className="text-center">{formatDate(rowData?.order_date)}</div>
      </td>
      {/* <td className="text-center">{rowData?.order_date ? rowData?.order_date : ''} </td> */}
      <td className="text-center">
        <input
          type="text"
          value={rowData?.customer ? rowData?.customer : ''}
          className="px-1 input_fields py-1 rounded-2 grey"
          onChange={(e) => handleCustomerChange(rowData?.order_id, e.target.value)}
        />
      </td>
      <td className="text-center">{rowData?.sales_order && rowData?.sales_order.split('-')?.pop()}</td>

      <td className="text-center">
        {rowData?.qty_size_list?.map((qtyList: any, idx: any) => {
          return (
            <>
              <div key={idx}>{qtyList?.order_weight.toFixed(3)}</div>
            </>
          );
        })}
      </td>

      {operationCardDetailData?.product === 'KA Chain' || operationCardDetailData?.product === 'Ball Chain' ? (
        operationCardProductDept?.group_orders_by_design === 0 ? (
          <td className="text-center">{rowData?.market_design_name} </td>
        ) : operationCardProductDept?.group_orders_by_design === 1 ? (
          <td className="text-center">{rowData?.design || rowData?.item_name} </td>
        ) : (
          ''
        )
      ) : (
        <td className="text-center">{rowData?.item}</td>
      )}
      {/* 
      {doGetAllOrders ? (
        <td className="text-center"> {rowData?.item_name} </td>
      ) : (
        operationCardProductDept?.group_orders_by_design === 1 && <td className="text-center">{rowData?.design}</td>
      )} */}

      <td className="text-center">
        {rowData?.qty_size_list?.map((qtyList: any, idx: any) => {
          return (
            <>
              <div key={idx}>{qtyList?.production_qty}</div>
            </>
          );
        })}
      </td>
      <td className="text-center">
        {rowData?.qty_size_list?.map((qtyList: any, idx: any) => {
          return (
            <>
              <div key={idx}>{qtyList?.size}</div>
            </>
          );
        })}
      </td>

      {hasGPCItem(operationCardDetailData) && (
        <td className="text-center d-flex justify-content-center">
          <div className="d-flex flex-column">
            {rowData?.qty_size_list?.map((qtyList: any, idx: any) => {
              return (
                <div key={idx} className="">
                  <input
                    type="number"
                    className="input_fields px-2  rounded-2 text-center"
                    style={{ width: '100%', maxWidth: '120px' }}
                    value={qtyList?.ready_qty}
                    onChange={(e: any) =>
                      handleChangesInReadyQty(e.key, parseInt(e.target.value), rowData?.order_id, qtyList?.soisd_item)
                    }
                    onKeyDown={(e: any) => {
                      if (e.key === 'Backspace') {
                        // Clear the value of the input field
                        handleChangesInReadyQty(e.key, e.target.value, rowData?.order_id, qtyList?.soisd_item);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </td>
      )}
    </tr>
  );
};

function SalesOrderTable({
  operationCardDetailData,
  salesOrderList,
  setSalesOrderList,
  getAllSalesOrderList,
  HandleSalesOrderSave,
  operationCardNextProductProcessDepartment,
  handleCustomerChange,
  operationCardProductDept,
  selectedSingleOrderItems,
  selectedBunchOrderItems,
  isSingleHeaderChecked,
  isBunchHeaderChecked,
  handleSalesOrderCheckboxChange,
  handleSalesOrderHeaderCheckboxChange,
  handleSalesOrderDeleteSelectedItems,
  showError,
}: any) {
  const [doGetAllOrders, setDoGetAllOrders] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState<boolean>(false);
  const singleOrdersWithItems = salesOrderList.map((order: any) => ({
    ...order,
    qty_size_list: order.qty_size_list?.filter((sizeItem: any) => sizeItem.is_bunch === 0),
  }));
  const { formatDate } = useCommon();
  // .filter((order: any) => order.qty_size_list?.length > 0); // Ensure at least one item is included
  // Log the filtered bunch orders with items

  const bunchOrdersWithItems = salesOrderList
    .map((order: any) => ({
      ...order,
      qty_size_list: order.qty_size_list?.filter((sizeItem: any) => sizeItem.is_bunch === 1),
    }))
    .filter((order: any) => order.qty_size_list?.length > 0); // Ensure at least one item is included
  // const handleHeaderCheckboxChange = () => {
  //   setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
  //   setSelectedItems(isHeaderCheckboxChecked ? [] : salesOrderList.map((data: any) => data.order_id));
  // };

  // const handleCheckboxChange = (itemId: string) => {
  //   const isChecked = selectedItems.includes(itemId);
  //   if (isChecked) {
  //     setSelectedItems(selectedItems.filter((item) => item !== itemId));
  //   } else {
  //     setSelectedItems([...selectedItems, itemId]);
  //   }
  // };

  // const handleDeleteSelectedItems = () => {
  //   const updatedData: any = [];
  //   salesOrderList.forEach((item: any) => {
  //     if (!selectedItems.includes(item.order_id)) {
  //       updatedData.push(item);
  //     }
  //   });

  //   // Update the state with the filtered data
  //   // sellsOrderData(updatedData);
  //   setSalesOrderList(updatedData);

  //   // Clear selected items
  //   setSelectedItems([]);
  //   setIsHeaderCheckboxChecked(false);
  // };

  // const [showError, setShowError] = useState(false);

  const handleChangesInReadyQty: any = (key: any, userEnteredValue: string, order_id: string, innerArray: string) => {
    // Convert the entered value to a string
    const userValueStr = userEnteredValue.toString();
    setSalesOrderList((prevData: any[]) => {
      return prevData.map((item: any) => {
        const updatedQtySizeList = item?.qty_size_list?.map((qty: any) => {
          if (qty?.soisd_item === innerArray) {
            return { ...qty, ready_qty: Number(userValueStr), qty_change: 1 };
          }
          return qty;
        });
        return { ...item, qty_size_list: updatedQtySizeList };
      });
    });
    // if (key === 'Backspace') {
    //   setSalesOrderList((prevData: any[]) => {
    //     return prevData.map((item: any) => {
    //       const updatedQtySizeList = item?.qty_size_list?.map((qty: any) => {
    //         if (qty?.soisd_item === innerArray) {
    //           // Update the ready_qty for the matched qty
    //           setShowError(false); // Reset error state if value is correct
    //           return { ...qty, ready_qty: '' };
    //         }
    //         return qty; // Return unchanged qty if soisd_item doesn't match
    //       });

    //       // Return updated item with the updated qty_size_list
    //       return { ...item, qty_size_list: updatedQtySizeList };
    //       return item;
    //     });
    //   });
    // } else {
    //   setSalesOrderList((prevData: any[]) => {
    //     return prevData.map((item: any) => {
    //       if (item?.order_id === order_id) {
    //         const totalQtyStr = item.total_qty.toString();
    //         if (userValueStr?.length === totalQtyStr?.length) {
    //           if (userValueStr === totalQtyStr) {
    //             const updatedQtySizeList = item?.qty_size_list?.map((qty: any) => {
    //               if (qty?.soisd_item <= innerArray) {
    //                 // Update the ready_qty for the matched qty
    //                 setShowError(false); // Reset error state if value is correct
    //                 return { ...qty, ready_qty: userEnteredValue };
    //               }
    //               return qty; // Return unchanged qty if soisd_item doesn't match
    //             });

    //             // Return updated item with the updated qty_size_list
    //             return { ...item, qty_size_list: updatedQtySizeList };
    //           } else {
    //             if (!showError) {
    //               setShowError(true);
    //               toast.error('Ready Quantity must exactly match the total Quantity for this order!');
    //             }
    //             // If the entered value doesn't match total_qty, return the item as is
    //             return { ...item };
    //           }
    //         } else {
    //           const updatedQtySizeList = item?.qty_size_list?.map((qty: any) => {
    //             if (qty?.soisd_item === innerArray) {
    //               return { ...qty, ready_qty: userEnteredValue };
    //             }
    //             return qty;
    //           });
    //           return { ...item, qty_size_list: updatedQtySizeList };
    //         }
    //       }
    //       return item; // Return unchanged item if the order_id doesn't match
    //     });
    //   });
    // }
  };
  return (
    <div>
      <div>
        {/* {operationCardProductDept?.show_get_orders !== 0 &&  */}
        <h6 className="bold">Operation Card Order Details :</h6>
        {/* } */}
      </div>
      <div>
        {operationCardProductDept?.show_get_orders !== 0 && (
          <button
            className="btn btn-blue px-4 px-1 btn-py mt-2"
            onClick={() => {
              getAllSalesOrderList();
              setDoGetAllOrders(true);
            }}
          >
            Get Orders
          </button>
        )}
      </div>

      {/* <div className="row mt-2">
        <div className="col-md-12">      
          <div className="table-responsive mt-2">
            <table className="table table-bordered">
              <thead>
                <tr className="table-text">
                  <th className="text-center thead-dark">
                    <input type="checkbox" onChange={handleHeaderCheckboxChange} checked={isHeaderCheckboxChecked} />
                  </th>
                  {columnsBuilder(operationCardDetailData)?.map((val, i: any) => (
                    <th className="thead-dark text-center" scope="col" key={i}>
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesOrderList?.length > 0 ? (
                  <>
                    {salesOrderList?.map((salesOrder: any) => {
                      return (
                        <>
                          {rowsBuilder(
                            operationCardDetailData,
                            salesOrder,
                            doGetAllOrders,
                            selectedItems,
                            handleCheckboxChange,
                            handleChangesInReadyQty,
                            handleCustomerChange
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center w-100 my-4">
                      <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                      <div className="fs-14 grey">No Data </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {selectedItems?.length > 0 && (
              <button className="btn btn-danger btn-py fs-13 me-2 " onClick={handleDeleteSelectedItems}>
                Delete
              </button>
            )}
            <button className="btn btn-blue btn-py " onClick={HandleSalesOrderSave}>
              Save
            </button>
          </div>
        </div>
      </div> */}

      {/* Table for Single Orders */}
      <div className="row mt-2">
        <div className="col-md-12">
          <h6 className="bold">Single Orders</h6>
          <div className="table-responsive mt-2">
            <table className="table table-bordered">
              <thead>
                <tr className="table-text">
                  <th className="text-center thead-dark">
                    <input
                      type="checkbox"
                      // onChange={handleHeaderCheckboxChange}
                      onChange={(e) => handleSalesOrderHeaderCheckboxChange('single', e.target.checked)}
                      // checked={isHeaderCheckboxChecked}
                      checked={isSingleHeaderChecked}
                    />
                  </th>
                  {columnsBuilder(operationCardDetailData, operationCardProductDept)?.map((val, i: any) => (
                    <th className="thead-dark text-center" scope="col" key={i}>
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {singleOrdersWithItems?.length > 0 ? (
                  <>
                    {singleOrdersWithItems?.map((salesOrder: any) => {
                      return (
                        <>
                          {salesOrder?.qty_size_list?.length > 0 &&
                            rowsBuilder(
                              operationCardDetailData,
                              salesOrder,
                              doGetAllOrders,
                              // selectedItems,
                              // handleCheckboxChange,
                              selectedSingleOrderItems,
                              (order_id: string) => handleSalesOrderCheckboxChange(order_id, false),
                              handleChangesInReadyQty,
                              handleCustomerChange,
                              operationCardProductDept,
                              formatDate
                            )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center w-100 my-4">
                      <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                      <div className="fs-14 grey">No Data </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Table for Bunch Orders */}
      <div className="row mt-2">
        <div className="col-md-12">
          <h6 className="bold">Bunch Orders</h6>
          <div className="table-responsive mt-2">
            <table className="table table-bordered">
              <thead>
                <tr className="table-text">
                  <th className="text-center thead-dark">
                    <input
                      type="checkbox"
                      // onChange={handleHeaderCheckboxChange}
                      onChange={(e) => handleSalesOrderHeaderCheckboxChange('bunch', e.target.checked)}
                      // checked={isHeaderCheckboxChecked}
                      checked={isBunchHeaderChecked}
                    />
                  </th>
                  {columnsBuilder(operationCardDetailData, operationCardProductDept)?.map((val, i: any) => (
                    <th className="thead-dark text-center" scope="col" key={i}>
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bunchOrdersWithItems?.length > 0 ? (
                  <>
                    {bunchOrdersWithItems?.map((salesOrder: any) => {
                      return (
                        <>
                          {salesOrder?.qty_size_list?.length > 0 &&
                            rowsBuilder(
                              operationCardDetailData,
                              salesOrder,
                              doGetAllOrders,
                              // selectedItems,
                              // handleCheckboxChange,
                              selectedBunchOrderItems,
                              (order_id: string) => handleSalesOrderCheckboxChange(order_id, true),
                              handleChangesInReadyQty,
                              handleCustomerChange,
                              operationCardProductDept,
                              formatDate
                            )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center w-100 my-4">
                      <Image src="/grid-empty-state.png" alt="empty Logo" width={40} height={42} className="my-2" />
                      <div className="fs-14 grey">No Data </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(selectedSingleOrderItems?.length > 0 || selectedBunchOrderItems?.length > 0) && (
        <button className="btn btn-danger btn-py fs-13 me-2" onClick={handleSalesOrderDeleteSelectedItems}>
          Delete
        </button>
      )}
      <button className="btn btn-blue btn-py" onClick={HandleSalesOrderSave}>
        Save
      </button>
    </div>
  );
}

export default SalesOrderTable;
