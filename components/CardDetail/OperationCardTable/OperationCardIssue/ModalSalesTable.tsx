import useCommon from '@/hooks/common';
import { toast } from 'react-toastify';

const ModalSalesTable: any = ({
  tableHeading,
  salesOrderList,
  operationCardDetailData,
  selectedSalesOrderData,
  selectedCustomer,
  setSelectedSalesOrderData,
  setSelectedCustomer,
  showCheckbox,
}: any) => {
  // Calculate totals for production qty and order weight
  const { formatDate } = useCommon();
  const calculateTotals = () => {
    let totalProductionQty = 0;
    let totalOrderWeight = 0;

    salesOrderList?.forEach((orderData: any) => {
      orderData?.qty_size_list?.forEach((values: any) => {
        totalProductionQty += values.production_qty || 0;
        totalOrderWeight += values.order_weight || 0;
      });
      // totalOrderWeight += orderData.total_weight || 0;
    });

    return { totalProductionQty, totalOrderWeight };
  };

  const handleCheckboxChange = (data: any, isChecked: boolean, isDisabled: boolean) => {
    if (isDisabled) return;

    setSelectedSalesOrderData((prevData: any) => {
      if (isChecked) {
        if (selectedCustomer && selectedCustomer !== data.customer) {
          toast.error('You can only select orders with the same customer name.');
          return prevData;
        } else {
          if (!selectedCustomer) {
            setSelectedCustomer(data.customer); // Set the selected customer when the first order is checked
          }
          return [...prevData, data]; // Add the newly selected order to the list
        }
      } else {
        const updatedData = prevData.filter((item: any) => item.order_id !== data.order_id);
        if (updatedData.length === 0) {
          setSelectedCustomer(''); // Reset customer if no orders are selected
        }
        return updatedData;
      }
    });
  };

  const { totalProductionQty, totalOrderWeight } = calculateTotals();

  return (
    <>
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="table-responsive mt-2">
            <h6 className="bold">{tableHeading}</h6>
            <table className="table table-bordered">
              <thead>
                <tr className="table-text">
                  {showCheckbox && <th className="thead-dark text-center" scope="col"></th>}
                  <td className="thead-dark text-center" scope="col">
                    Order Date
                  </td>
                  <th className="thead-dark text-center" scope="col">
                    Customer Name
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Sales Order
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Market Design
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Production Qty
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Order Weight
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesOrderList?.length > 0 &&
                  salesOrderList.map((orderData: any, index: any) => {
                    // Calculate totals for each individual row
                    const rowProductionQty = orderData.qty_size_list.reduce(
                      (acc: number, values: any) => acc + (values.production_qty || 0),
                      0
                    );
                    const rowOrderWeight = orderData.qty_size_list.reduce(
                      (acc: number, values: any) => acc + (values.order_weight || 0),
                      0
                    );
                    // const isChecked = selectedSalesOrderData.some((item: any) => item === orderData);
                    const isChecked = selectedSalesOrderData.some((item: any) => item.order_id === orderData.order_id);

                    // const isDisabled = !!orderData?.assigned_order_id;
                    const isDisabled = selectedCustomer && selectedCustomer !== orderData?.customer;

                    return (
                      <>
                        <tr className="table-text" key={index}>
                          {showCheckbox && (
                            <td className="text-center">
                              <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(orderData, !isChecked, isDisabled)}
                                checked={isChecked || isDisabled || !!orderData?.assigned_order_id}
                                // disabled={orderData?.assigned_order_id}
                                disabled={isDisabled || orderData?.assigned_order_id}
                              />
                            </td>
                          )}
                          <td className="text-center">{orderData?.order_date ? formatDate(orderData.order_date) : ''}</td>
                          {/* <td className="text-center">{orderData?.order_date === '' ? '--' : orderData.order_date}</td> */}
                          <td className="text-center">{orderData?.customer ? orderData.customer : ''}</td>
                          <td className="text-center">{orderData?.sales_order?.split('-')?.pop()}</td>
                          <td className="text-center">{orderData?.market_design_name}</td>
                          <td className="text-center">
                            {orderData.qty_size_list.length > 0 &&
                              orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.production_qty}</div>)}
                          </td>
                          <td className="text-center">
                            {orderData.qty_size_list.length > 0 &&
                              orderData.qty_size_list.map((values: any, id: any) => (
                                <div key={id}>{values.order_weight.toFixed(2)}</div>
                              ))}
                          </td>
                          <td className="text-center">
                            {orderData.qty_size_list.length > 0 &&
                              orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.size}</div>)}
                          </td>
                        </tr>

                        {/* Row totals for production qty and order weight */}
                        {salesOrderList.length > 1 && (
                          <tr className="table-text" key={`total-${index}`}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-center">
                              <strong>Total</strong>
                            </td>
                            <td className="text-center">
                              <strong>{rowProductionQty}</strong>
                            </td>
                            <td className="text-center">
                              <strong>{rowOrderWeight.toFixed(2)}</strong>
                            </td>
                            <td></td>
                          </tr>
                        )}
                      </>
                    );
                  })}

                {/* Totals Row */}
                <tr className="table-text">
                  <td className="text-center" colSpan={3}>
                    <strong>Total</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td className="text-center">
                    <strong>{totalProductionQty}</strong>
                  </td>

                  <td className="text-center">
                    <strong>{totalOrderWeight.toFixed(2)}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSalesTable;
