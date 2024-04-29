import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const hasGPCItem = (operationCardDetailData: any) => {
  const findGPCItem = operationCardDetailData?.operation_card_issue_details?.find((issueItem: any) => issueItem?.item === 'GPC');
  return findGPCItem;
};

const columnsBuilder = (operationCardDetailData: any) => {
  let columnsList: string[] = ['Customer Name', 'Sales Order', 'Item', 'Design Name', 'Production Qty', 'Size'];
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
  handleCheckboxChange: (soisd_item: string) => void,
  handleChangesInReadyQty: (key: any, changedValue: number, soisd_item: string) => void
) => {
  return (
    <tr className="table-text" key={rowData?.soisd_item}>
      <td className="text-center">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(rowData?.soisd_item)}
          checked={selectedItems.includes(rowData?.soisd_item)}
        />
      </td>
      <td className="text-center">
        {rowData?.customer_name && (rowData?.customer_name !== '' || rowData?.customer_name !== null)
          ? rowData?.customer_name
          : '--'}
      </td>
      <td className="text-center">{rowData?.sales_order}</td>
      <td className="text-center">{rowData?.item}</td>
      <td className="text-center">{doGetAllOrders ? rowData?.item_name : rowData?.design}</td>
      <td className="text-center">{rowData?.production_qty}</td>
      <td className="text-center">{rowData?.size}</td>
      {hasGPCItem(operationCardDetailData) && (
        <td className="text-center d-flex justify-content-center">
          <input
            type="number"
            className="input_fields px-2 py-1 rounded-2 text-center"
            style={{ width: '100%', maxWidth: '120px' }}
            value={rowData?.ready_qty ?? 0}
            onChange={(e: any) => handleChangesInReadyQty(e.key, parseInt(e.target.value), rowData?.soisd_item)}
            onKeyDown={(e: any) => {
              if (e.key === 'Backspace') {
                // Clear the value of the input field
                handleChangesInReadyQty(e.key, e.target.value, rowData?.soisd_item);
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
  handleUpdateSalesOrderListWithReadyQty,
  operationCardNextProductProcessDepartment,

  operationCardProductDept,
}: any) {
  const [doGetAllOrders, setDoGetAllOrders] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState<boolean>(false);

  const handleHeaderCheckboxChange = () => {
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
    setSelectedItems(isHeaderCheckboxChecked ? [] : salesOrderList.map((data: any) => data.soisd_item));
  };

  const handleCheckboxChange = (itemId: string) => {
    const isChecked = selectedItems.includes(itemId);
    if (isChecked) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const handleDeleteSelectedItems = () => {
    const updatedData: any = [];
    salesOrderList.forEach((item: any) => {
      if (!selectedItems.includes(item.soisd_item)) {
        updatedData.push(item);
      }
    });

    // Update the state with the filtered data
    // sellsOrderData(updatedData);
    setSalesOrderList(updatedData);

    // Clear selected items
    setSelectedItems([]);
    setIsHeaderCheckboxChecked(false);
  };

  const handleChangesInReadyQty = (key: any, userEnteredValue: number, soisd_item: string) => {
    let showError: boolean = false;
    // console.log('user enter', key, userEnteredValue, soisd_item);
    if (key === 'Backspace') {
      setSalesOrderList((prevData: any[]) => {
        const updatedData = prevData.map((item: any) => {
          if (item?.soisd_item === soisd_item) {
            return { ...item, ready_qty: '' };
          }
          return item;
        });
        return updatedData;
      });
    } else {
      if (isNaN(userEnteredValue)) {
        if (!showError) {
          // Show error message only if it hasn't been shown before
          showError = true;
          toast.error('Please enter correct data.');
        }
      } else {
        setSalesOrderList((prevData: any[]) => {
          const updatedData = prevData.map((item: any) => {
            if (item?.soisd_item === soisd_item) {
              if (!isNaN(userEnteredValue) && userEnteredValue <= item.production_qty) {
                return { ...item, ready_qty: userEnteredValue };
              } else {
                if (!showError) {
                  // Show error message only if it hasn't been shown before
                  showError = true;
                  toast.error(
                    // 'Entered value should be a number and less than or equal to production quantity.'
                    'Ready quantity should be less than or equal to production quantity.'
                  );
                }
                return item;
              }
            }
            return item;
          });
          return updatedData;
        });
      }
    }
  };
  // console.log('salesOrderList', salesOrderList);
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

      <div className="row mt-2">
        <div className="col-md-12">
          {/* {operationCardProductDept?.show_get_orders !== 0 && ( */}
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
                            handleChangesInReadyQty
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
            <button className="btn btn-blue btn-py " onClick={handleUpdateSalesOrderListWithReadyQty}>
              Save
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default SalesOrderTable;
