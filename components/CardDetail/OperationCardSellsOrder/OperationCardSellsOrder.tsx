import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OperationCardSellsOrder = ({
  getOperationCardSellsOrder,
  sellsOrderData,
  setSellsOrderData,
}: any) => {
  console.log('sellsOrderData from component', sellsOrderData);
  const [showTable, setShowTable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleButtonClick = () => {
    getOperationCardSellsOrder();
    setShowTable(true);
    // if (sellsOrderData?.length === 0) {
    //   toast.error('No data available');
    // }
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
    // Filter out selected items from the sellsOrderData
    // const updatedData = sellsOrderData?.filter(
    //   (item: any) => !selectedItems?.includes(item?.so_detail)
    // );
    // Show a message if no items are selected
    // if (selectedItems?.length === 0) {
    //   toast.error('No items selected for deletion');
    //   return;
    // }
    // Update the state with the filtered data
    // getOperationCardSellsOrder(updatedData);
    // setSelectedItems([]);

    const updatedData: any = [];
    sellsOrderData.forEach((item: any) => {
      if (!selectedItems.includes(item.so_detail)) {
        updatedData.push(item);
      }
    });

    // Update the state with the filtered data
    // sellsOrderData(updatedData);
    setSellsOrderData(updatedData);

    // Clear selected items
    setSelectedItems([]);
  };

  return (
    <div>
      <button
        className="btn btn-blue px-4 px-1 btn-py "
        onClick={handleButtonClick}
      >
        Get Orders
      </button>
      <div className="row mt-2">
        <div className="col-md-12">
          {/* <span className="bold">Operation Card Order Details</span> */}
          {showTable && sellsOrderData?.length > 0 && (
            <div className="table-responsive mt-2">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-text">
                    {[
                      '',
                      'Item',
                      'Production Qty',
                      'Size',
                      'Name',
                      'Item Name',
                      // 'Ready Qty',
                      // 'MI Order Detail Ref',
                      // 'Design',
                      'Sales Order',
                      'SOISD Item',
                    ].map((val, i: any) => (
                      <th
                        className="thead-dark text-center"
                        scope="col"
                        key={i}
                      >
                        {val}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellsOrderData?.length > 0 &&
                    sellsOrderData?.map((data: any, i: any) => (
                      <tr className="table-text" key={i}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange(data?.so_detail)
                            }
                            checked={selectedItems.includes(data?.so_detail)}
                          />
                        </td>
                        <td className="text-center">{data?.item}</td>
                        <td className="text-center">{data?.production_qty}</td>
                        <td className="text-center">{data?.size}</td>
                        <td className="text-center">{data?.name}</td>
                        <td className="text-center">{data?.item_name}</td>
                        <td className="text-center">{data?.sales_order}</td>
                        <td className="text-center">{data?.so_detail}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button
                className="btn btn-danger btn-py fs-14"
                onClick={handleDeleteSelectedItems}
              >
                Delete
                {/* <i className="fa fa-trash btn-none" aria-hidden="true"></i> */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperationCardSellsOrder;
