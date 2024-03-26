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
  const [numericValues, setNumericValues] = useState<Array<number>>([]);
  const [isTableChanged, setIsTableChanged] = useState(false);

  useEffect(() => {
    if (sellsOrderData && sellsOrderData?.length > 0) {
      setShowTable(true);
    } else {
      // setShowTable(false);
      // toast.error('No Data Available');
    }
  }, [sellsOrderData]);

  // const handleButtonClick = () => {
  //   getOperationCardSellsOrder();
  //   // setShowTable(true);
  // };

  // const handleButtonClick = async () => {
  //   await getOperationCardSellsOrder();
  // };
  useEffect(() => {
    // Check if any selected items or numeric values have changed
    setIsTableChanged(
      selectedItems?.length > 0 ||
        numericValues.some((val) => !isNaN(val)) ||
        sellsOrderData?.length > 0
    );
  }, [selectedItems, numericValues]);

  const handleButtonClick = async () => {
    await getOperationCardSellsOrder();

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

  const handleHeaderCheckboxChange = () => {
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
    setSelectedItems(
      isHeaderCheckboxChecked
        ? []
        : sellsOrderData.map((data: any) => data.so_detail)
    );
  };

  const handleDeleteSelectedItems = () => {
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
    setIsHeaderCheckboxChecked(false);
  };

  // const handleNumericChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   i: number
  // ) => {
  //   const value = parseFloat(e.target.value);
  //   const updatedNumericValues: any = [...numericValues];
  //   updatedNumericValues[i] = isNaN(value) ? '' : value;
  //   setNumericValues(updatedNumericValues);
  // };

  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const value = parseFloat(e.target.value);
    const updatedData = [...sellsOrderData];
    const valueData = sellsOrderData?.map((data: any) => {
      return data?.production_qty;
    });
    updatedData[i].ready_qty = value;
    if (updatedData <= valueData) {
      setSellsOrderData(updatedData);
    }
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
            {sellsOrderData && sellsOrderData?.length > 0 && (
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
                          <td className="text-center">{data?.sales_order}</td>
                          <td className="text-center">{data?.item}</td>
                          <td className="text-center">{data?.item_name}</td>
                          <td className="text-center">
                            {data?.production_qty}
                          </td>
                          <td className="text-center">{data?.size}</td>
                          {operationCardDetailData?.operation_department ===
                            'GPC' && (
                            <td className="text-center d-flex justify-content-center">
                              <input
                                type="number"
                                className="input_fields px-2 py-1 rounded-2"
                                // Assuming data is the numeric value from sellsOrderData
                                // value={numericValues[i]}
                                // onChange={(
                                //   e: React.ChangeEvent<HTMLInputElement>
                                // ) => handleNumericChange(e, i)}
                                value={
                                  // data?.production_qty <= data?.ready_qty
                                  //   ? data?.ready_qty
                                  //   : ''
                                  // data?.production_qty <= data?.ready_qty
                                  //   ? data?.ready_qty
                                  //   : ''
                                  data?.ready_qty
                                }
                                // onChange={(
                                //   e: React.ChangeEvent<HTMLInputElement>
                                // ) => handleNumericChange(e, i)}
                                // onChange={(e: any) => {
                                //   e.target.value;
                                // }}
                                // onChange={(
                                //   e: React.ChangeEvent<HTMLInputElement>
                                // ) => {
                                //   const newValue = parseFloat(e.target.value);
                                //   if (!isNaN(newValue)) {
                                //     const updatedData = [...sellsOrderData];
                                //     updatedData[i].ready_qty = newValue;
                                //     setSellsOrderData(updatedData);
                                //   }
                                // }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleNumericChange(e, i)}
                                style={{ width: '100%', maxWidth: '120px' }}
                              />
                            </td>
                          )}

                          {/* {operationCardDetailData?.operation_card_issue_details?.map(
                            (ele: any) => {
                              return (
                                ele?.item === 'GPC' &&
                                ele?.item && ( */}
                          {/* <td className="text-center d-flex justify-content-center">
                            <input
                              type="number"
                              className="input_fields px-2 py-1 rounded-2"
                              // Assuming data is the numeric value from sellsOrderData
                              value={
                                // data?.production_qty <= data?.ready_qty
                                //   ? data?.ready_qty
                                //   : ''
                                data?.ready_qty
                              }
                              // onChange={(
                              //   e: React.ChangeEvent<HTMLInputElement>
                              // ) => handleNumericChange(e, i)}
                              // onChange={(e: any) => {
                              //   e.target.value;
                              // }}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const newValue = parseFloat(e.target.value);
                                if (!isNaN(newValue)) {
                                  const updatedData = [...sellsOrderData];
                                  updatedData[i].ready_qty = newValue;
                                  setSellsOrderData(updatedData);
                                }
                              }}
                              style={{
                                width: '100%',
                                maxWidth: '120px',
                              }}
                            />
                          </td> */}
                          {/* )
                              );
                            }
                          )} */}
                        </tr>
                      ))}
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
                  // disabled={selectedItems?.length === 0}
                  // disabled={!isTableChanged}
                >
                  Save
                </button>
              </div>
            )}
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
