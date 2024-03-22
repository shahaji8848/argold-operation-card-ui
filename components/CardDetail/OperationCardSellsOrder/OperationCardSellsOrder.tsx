import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OperationCardSellsOrder = ({
  getOperationCardSellsOrder,
  sellsOrderData,
}: any) => {
  console.log('sellsOrderData from component', sellsOrderData);
  const [showTable, setShowTable] = useState(false);

  const handleButtonClick = () => {
    getOperationCardSellsOrder();
    setShowTable(true);
    if (sellsOrderData.length === 0) {
      toast.error('No data available from the API');
    }
  };

  return (
    <div>
      <button
        className="btn btn-blue px-4 px-1 btn-py "
        onClick={handleButtonClick}
      >
        Get Sales Order
      </button>
      <div className="row mt-2">
        <div className="col-xxl-5 col-xl-4 col-md-5">
          {/* <span className="bold">Operation Card Order Detail:</span> */}
          {showTable && sellsOrderData?.length > 0 && (
            <div className="table-responsive mt-2">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-text">
                    {[
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
                        <td></td>
                        <td className="text-end">{data?.item}</td>
                        <td className="text-end">{data?.production_qty}</td>
                        <td className="text-end">{data?.size}</td>
                        <td className="text-end">{data?.name}</td>
                        <td className="text-end">{data?.item_name}</td>
                        <td className="text-end">{data?.sales_order}</td>
                        <td className="text-end">{data?.so_detail}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperationCardSellsOrder;
