const ModalSalesTable: any = ({
  salesOrderList,
  operationCardDetailData,
  selectedSalesOrderData,
  setSelectedSalesOrderData,
}: any) => {
  console.log('modal data salesOrderList', salesOrderList);
  console.log('modal data operationCardDetailData', operationCardDetailData);

  const handleCheckboxChange = (data: any, isChecked: boolean, isDisabled: boolean) => {
    if (isDisabled) return;

    setSelectedSalesOrderData((prevData: any) => {
      if (isChecked) {
        return [...prevData, data];
      } else {
        return prevData.filter((item: any) => item !== data);
      }
    });
  };
  // const customerInWt: any =
  //   Object.keys(operationCardDetailData)?.length > 0 &&
  //   operationCardDetailData?.operation_card_issue_details?.find((data: any) => data.item === 'Customer')?.in_weight;

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
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesOrderList?.length > 0 &&
                  salesOrderList.map((orderData: any, index: any) => {
                    const isChecked = selectedSalesOrderData.some((item: any) => item === orderData);
                    const isDisabled = !!orderData?.assigned_order_id;

                    return (
                      <tr className="table-text" key={index}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(orderData, !isChecked, isDisabled)}
                            checked={isChecked || isDisabled}
                            disabled={orderData?.assigned_order_id}
                          />
                        </td>
                        <td className="text-center">{orderData.sales_order}</td>
                        <td className="text-center">{orderData.market_design_name}</td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.production_qty}</div>)}
                        </td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div key={id}>{values.size}</div>)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSalesTable;
