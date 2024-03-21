import React, { useState } from 'react';

const OperationCardSellsOrder = ({
  getOperationCardSellsOrder,
  sellsOrderData,
}: any) => {
  console.log('sellsOrderData from component', sellsOrderData);
  const [showTable, setShowTable] = useState(false);

  const handleButtonClick = () => {
    getOperationCardSellsOrder();
    setShowTable(true);
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
          {showTable && sellsOrderData.length > 0 && (
            <div className="table-responsive mt-2">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-text">
                    {[
                      'Item',
                      'Size',
                      'Production Qty',
                      'Ready Qty',
                      'MI Order Detail Ref',
                      'Design',
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
                  {/* {operationCardDetailData?.receipt_details?.length > 0 &&
              operationCardDetailData?.receipt_details?.map(
                (data: any, i: any) => (
                  <tr className="table-text" key={i}>
                    <td></td>
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                  </tr>
                )
              )} */}
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
