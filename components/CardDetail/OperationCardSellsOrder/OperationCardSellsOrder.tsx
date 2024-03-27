import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OperationCardSellsOrder = ({
  operationCardDetailData,
  getOperationCardSellsOrder,
  sellsOrderData,
  setSellsOrderData,
  handleSaveButtonClickSalesOrder,
}: any) => {
  console.log('sellsOrderData from component', sellsOrderData);
  const [showTable, setShowTable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);
  const [numericValues, setNumericValues] =
    useState<Array<number>>(sellsOrderData);
  const [isTableChanged, setIsTableChanged] = useState(false);

  useEffect(() => {
    if (sellsOrderData && sellsOrderData?.length > 0) {
      setShowTable(true);
    } else {
      // setShowTable(false);
      // toast.error('No Data Available');
    }
  }, [sellsOrderData]);

  useEffect(() => {
    // Check if any selected items or numeric values have changed
    setIsTableChanged(
      selectedItems?.length > 0 ||
        numericValues.some((val) => !isNaN(val)) ||
        sellsOrderData?.length > 0
    );
  }, [selectedItems, numericValues]);

  // useEffect(() => {
  //   // Check if any selected items or numeric values have changed
  //   const isTableChanged =
  //     selectedItems.length > 0 ||
  //     sellsOrderData.some((item: any, index: any) => {
  //       const newValue = parseFloat(item.ready_qty);
  //       return isNaN(newValue) || newValue !== numericValues[index];
  //     });

  //   setIsTableChanged(isTableChanged);
  // }, [selectedItems, sellsOrderData, numericValues]);
  // useEffect(() => {
  //   // Check if any selected items have changed
  //   const isTableChanged =
  //     selectedItems?.length > 0 ||
  //     sellsOrderData?.some((item: any) => isNaN(parseFloat(item?.ready_qty)));

  //   setIsTableChanged(isTableChanged);
  // }, [sellsOrderData]);

  const handleButtonClick = async () => {
    await getOperationCardSellsOrder();

    if (sellsOrderData && sellsOrderData?.length !== 0) {
      // toast.success('fetched order data');
    } else {
      toast.error('No data found');
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    const isChecked = selectedItems.includes(itemId);
    if (isChecked) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleHeaderCheckboxChange = () => {
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
    setSelectedItems(
      isHeaderCheckboxChecked
        ? []
        : sellsOrderData.map((data: any) => data.soisd_item)
    );
  };

  const handleDeleteSelectedItems = () => {
    const updatedData: any = [];
    sellsOrderData.forEach((item: any) => {
      if (!selectedItems.includes(item.soisd_item)) {
        updatedData.push(item);
      }
    });

    // Update the state with the filtered data
    // sellsOrderData(updatedData);
    setSellsOrderData(updatedData);

    // Clear selected items
    setSelectedItems([]);
    setIsHeaderCheckboxChecked(false);
  };

  const handleNumericChange = (newValue: number, i: number) => {
    let errorShown = false; // Flag to track whether error message has been shown
    setSellsOrderData((prevData: any[]) => {
      // Specify the type of prevData as any[]
      const updatedData = prevData.map((item: any, index: number) => {
        if (index === i) {
          if (!isNaN(newValue) && newValue <= item.production_qty) {
            return { ...item, ready_qty: newValue };
          } else if (isNaN(newValue)) {
            return { ...item, ready_qty: 0 }; // Set ready_qty to 0 if input value is NaN
          } else {
            if (!errorShown) {
              // Show error message only if it hasn't been shown before
              errorShown = true;
              toast.error(
                // 'Entered value should be a number and less than or equal to production quantity.'
                'Entered value ready quantity should be less than or equal to production quantity.'
              );
            }
            return item;
          }
        }
        return item;
      });
      return updatedData;
    });
  };

  return (
    <div>
      <button
        className="btn btn-blue px-4 px-1 btn-py "
        onClick={handleButtonClick}
      >
        Get Orders
      </button>
      {showTable ? (
        <div className="row mt-2">
          <div className="col-md-12">
            {/* <span className="bold">Operation Card Order Details</span> */}
            {/* {showTable && sellsOrderData && sellsOrderData?.length > 0 && ( */}
            <div className="table-responsive mt-2">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-text">
                    <th className="text-center thead-dark">
                      <input
                        type="checkbox"
                        onChange={handleHeaderCheckboxChange}
                        checked={isHeaderCheckboxChecked}
                      />
                    </th>
                    {[
                      'Sales Order',
                      'Item',
                      'Design Name',
                      'Production Qty',
                      'Size',
                    ].map((val, i: any) => (
                      <th
                        className="thead-dark text-center"
                        scope="col"
                        key={i}
                      >
                        {val}
                      </th>
                    ))}
                    {/* {operationCardDetailData?.operation_department ===
                        'GPC' && (
                        <th className="thead-dark text-center">Ready Qty</th>
                      )} */}
                    {operationCardDetailData?.operation_card_issue_details?.map(
                      (ele: any) => {
                        return (
                          ele?.item === 'GPC' &&
                          ele?.item && (
                            <th className="thead-dark text-center">
                              Ready Qty
                            </th>
                          )
                        );
                      }
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sellsOrderData && sellsOrderData?.length > 0 ? (
                    sellsOrderData &&
                    sellsOrderData?.map((data: any, i: any) => (
                      <tr className="table-text" key={i}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            // onChange={() =>
                            //   handleCheckboxChange(data?.soisd_item)
                            // }
                            // checked={selectedItems.includes(data?.soisd_item)}
                            onChange={() =>
                              handleCheckboxChange(data?.soisd_item)
                            }
                            checked={selectedItems.includes(data?.soisd_item)}
                          />
                        </td>
                        <td className="text-center">{data?.sales_order}</td>
                        <td className="text-center">{data?.item}</td>
                        <td className="text-center">{data?.item_name}</td>
                        <td className="text-center">{data?.production_qty}</td>
                        <td className="text-center">{data?.size}</td>
                        {/* {operationCardDetailData?.operation_department ===
                          'GPC' && (
                          <td className="text-center d-flex justify-content-center">
                            <input
                              type="number"
                              className="input_fields px-2 py-1 rounded-2 text-center"
                              value={data?.ready_qty || ''} // Ensure empty string fallback if data?.ready_qty is undefined or null
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleNumericChange(
                                  parseFloat(e.target.value),
                                  i
                                )
                              }
                              style={{ width: '100%', maxWidth: '120px' }}
                            />
                          </td>
                        )} */}
                        {operationCardDetailData?.operation_card_issue_details?.map(
                          (ele: any) => {
                            return (
                              ele?.item === 'GPC' &&
                              ele?.item && (
                                <td className="text-center d-flex justify-content-center">
                                  <input
                                    type="number"
                                    className="input_fields px-2 py-1 rounded-2 text-center"
                                    value={data?.ready_qty || ''} // Ensure empty string fallback if data?.ready_qty is undefined or null
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                      handleNumericChange(
                                        parseFloat(e.target.value),
                                        i
                                      )
                                    }
                                    style={{ width: '100%', maxWidth: '120px' }}
                                  />
                                </td>
                              )
                            );
                          }
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center w-100 my-4">
                        <Image
                          src="/grid-empty-state.png"
                          alt="empty Logo"
                          width={40}
                          height={42}
                          className="my-2"
                        />
                        <div className="fs-14 grey">No Data </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {selectedItems?.length > 0 && (
                <button
                  className="btn btn-danger btn-py fs-13 me-2 "
                  onClick={handleDeleteSelectedItems}
                >
                  Delete
                  {/* <i className="fa fa-trash btn-none" aria-hidden="true"></i> */}
                </button>
              )}

              <button
                className="btn btn-blue btn-py "
                onClick={handleSaveButtonClickSalesOrder}
                // disabled={
                //   !isTableChanged ||
                //   !selectedItems?.length ||
                //   sellsOrderData?.length < 0
                // }
                // disabled={
                //   !isTableChanged ||
                //   selectedItems.length === 0 ||
                //   sellsOrderData.length === 0
                // }

                // disabled={selectedItems?.length === 0}
                // disabled={!isTableChanged}
              >
                Save
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      ) : (
        // <p>No Data Available</p>
        <></>
      )}
    </div>
  );
};

export default OperationCardSellsOrder;
