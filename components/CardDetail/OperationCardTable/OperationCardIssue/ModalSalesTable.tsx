import { toast } from 'react-toastify';

const ModalSalesTable: any = ({
  salesOrderList,
  operationCardDetailData,
  selectedSalesOrderData,
  selectedCustomer,
  setSelectedSalesOrderData,
  setSelectedCustomer,
}: any) => {
  console.log('modal data salesOrderList', salesOrderList);
  console.log('modal data operationCardDetailData', operationCardDetailData);

  // Calculate totals for production qty and order weight
  const calculateTotals = () => {
    let totalProductionQty = 0;
    let totalOrderWeight = 0;

    salesOrderList?.forEach((orderData: any) => {
      orderData?.qty_size_list?.forEach((values: any) => {
        totalProductionQty += values.production_qty || 0;
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
            <table className="table table-bordered">
              <thead>
                <tr className="table-text">
                  <th className="thead-dark text-center" scope="col"></th>
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
                    Order Qty
                  </th>
                  <th className="thead-dark text-center" scope="col">
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesOrderList?.length > 0 &&
                  salesOrderList.map((orderData: any, index: any) => {
                    const isChecked = selectedSalesOrderData.some((item: any) => item === orderData);
                    // const isDisabled = !!orderData?.assigned_order_id;
                    const isDisabled = selectedCustomer && selectedCustomer !== orderData?.customer;
                    console.log('is checked', isDisabled);
                    return (
                      <tr className="table-text" key={index}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(orderData, !isChecked, isDisabled)}
                            checked={isChecked || isDisabled}
                            // disabled={orderData?.assigned_order_id}
                            disabled={isDisabled}
                          />
                        </td>
                        <td className="text-center">{orderData.sales_order}</td>
                        <td className="text-center">{orderData.market_design_name}</td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.production_qty}</div>)}
                        </td>
                        <td></td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.size}</div>)}
                        </td>
                      </tr>
                    );
                  })}

                {/* Totals Row */}
                <tr className="table-text">
                  <td className="text-center" colSpan={3}>
                    <strong>Total</strong>
                  </td>
                  <td className="text-center">
                    <strong>{totalProductionQty}</strong>
                  </td>

                  <td className="text-center">
                    <strong>{totalOrderWeight}</strong>
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
