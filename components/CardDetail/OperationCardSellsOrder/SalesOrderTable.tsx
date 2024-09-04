import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const hasGPCItem = (operationCardDetailData: any) => {
  const findGPCItem = operationCardDetailData?.operation_card_issue_details?.find((issueItem: any) => issueItem?.item === 'GPC');
  return findGPCItem;
};

const columnsBuilder = (operationCardDetailData: any) => {
  let columnsList: string[] = [
    'Customer Name',
    'Sales Order',
    operationCardDetailData?.product === 'KA Chain' || operationCardDetailData?.product === 'Ball Chain'
      ? 'Market Design Name'
      : 'item',
    'Design Name',
    'Production Qty',
    'Size',
  ];
  if (hasGPCItem(operationCardDetailData)) {
    columnsList.push('Ready Qty');
  }
  return columnsList;
};

const rowsBuilder = (
  operationCardDetailData: any,
  rowData: any,
  doGetAllOrders: boolean,
  selectedItems: any,
  handleCheckboxChange: (order_id: string) => void,
  handleChangesInReadyQty: (key: any, changedValue: number, order_id: string) => void,
  handleCustomerChange: (order_id: any, value: any) => void
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
        {operationCardDetailData?.product === 'KA Chain' || operationCardDetailData?.product === 'Ball Chain'
          ? rowData?.market_design_name
          : rowData?.item}
      </td>
      <td className="text-center">{doGetAllOrders ? rowData?.item_name : rowData?.design}</td>
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
          <input
            type="number"
            className="input_fields px-2 py-1 rounded-2 text-center"
            style={{ width: '100%', maxWidth: '120px' }}
            value={rowData?.ready_qty ?? 0}
            onChange={(e: any) => handleChangesInReadyQty(e.key, parseInt(e.target.value), rowData?.order_id)}
            onKeyDown={(e: any) => {
              if (e.key === 'Backspace') {
                // Clear the value of the input field
                handleChangesInReadyQty(e.key, e.target.value, rowData?.order_id);
              }
            }}
          />
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
}: any) {
  const [doGetAllOrders, setDoGetAllOrders] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState<boolean>(false);
  const singleOrdersWithItems = salesOrderList
    .map((order: any) => ({
      ...order,
      qty_size_list: order.qty_size_list.filter((sizeItem: any) => sizeItem.is_bunch === 0),
    }))
    .filter((order: any) => order.qty_size_list.length > 0); // Ensure at least one item is included

  // Log the filtered bunch orders with items
  console.log('singleOrdersWithItems', singleOrdersWithItems);

  const bunchOrdersWithItems = salesOrderList
    .map((order: any) => ({
      ...order,
      qty_size_list: order.qty_size_list.filter((sizeItem: any) => sizeItem.is_bunch === 1),
    }))
    .filter((order: any) => order.qty_size_list.length > 0); // Ensure at least one item is included
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

  const [showError, setShowError] = useState(false);

  const handleChangesInReadyQty: any = (key: any, userEnteredValue: string, order_id: string) => {
    console.log('User entered:', key, userEnteredValue, order_id);

    // Convert the entered value to a string
    const userValueStr = userEnteredValue.toString();

    if (key === 'Backspace') {
      setSalesOrderList((prevData: any[]) => {
        return prevData.map((item: any) => {
          if (item?.order_id === order_id) {
            return { ...item, ready_qty: '' };
          }
          return item;
        });
      });
    } else {
      setSalesOrderList((prevData: any[]) => {
        const updatedData = prevData.map((item: any) => {
          if (item?.order_id === order_id) {
            // Convert totalQty to string
            const totalQtyStr = item.total_qty.toString();

            // Check if userValue matches totalQty exactly as a string
            if (userValueStr.length === totalQtyStr.length) {
              if (userValueStr === totalQtyStr) {
                setShowError(false); // Reset error state if value is correct
                return { ...item, ready_qty: userEnteredValue };
              } else {
                if (!showError) {
                  setShowError(true); // Set error state if value is incorrect
                  toast.error('Ready Quantity must exactly match the total Quantity for this order!');
                }
                // Return item without updating ready_qty
                return { ...item, ready_qty: '' };
              }
            } else {
              // If the length does not match, do not show an error, just return the item
              return { ...item, ready_qty: userEnteredValue };
            }
          }
          return item;
        });
        return updatedData;
      });
    }
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
                  {columnsBuilder(operationCardDetailData)?.map((val, i: any) => (
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
                          {rowsBuilder(
                            operationCardDetailData,
                            salesOrder,
                            doGetAllOrders,
                            // selectedItems,
                            // handleCheckboxChange,
                            selectedSingleOrderItems,
                            (order_id: string) => handleSalesOrderCheckboxChange(order_id, false),
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
                  {columnsBuilder(operationCardDetailData)?.map((val, i: any) => (
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
                          {rowsBuilder(
                            operationCardDetailData,
                            salesOrder,
                            doGetAllOrders,
                            // selectedItems,
                            // handleCheckboxChange,
                            selectedBunchOrderItems,
                            (order_id: string) => handleSalesOrderCheckboxChange(order_id, true),
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
