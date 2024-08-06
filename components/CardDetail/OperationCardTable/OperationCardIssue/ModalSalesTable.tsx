import React from 'react';
import styles from '../../../../styles/operationDetail.module.css';
import useAssignedOrderCustomerHook from '@/hooks/useAssignedOrderCustomerHook';

const ModalSalesTable = ({ salesOrderList, operationCardDetailData }: any) => {
  console.log('operationCardDetailData', operationCardDetailData);

  const { handleSubmit, handleCheckboxChange } = useAssignedOrderCustomerHook({ operationCardDetailData, salesOrderList });
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
                    console.log('salesOrderList aaaaa', salesOrderList);
                    return (
                      <tr className="table-text" key={index}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(orderData)}
                            // checked={isHeaderCheckboxChecked}
                          />
                        </td>
                        <td className="text-center">{orderData.sales_order}</td>
                        <td className="text-center">{orderData.market_design_name}</td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div>{values.production_qty}</div>)}
                        </td>
                        <td className="text-center">
                          {orderData.qty_size_list.length > 0 &&
                            orderData.qty_size_list.map((values: any, id: any) => <div>{values.size}</div>)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start mt-3">
        <button
          type="button"
          className={`btn btn-blueColor ${styles.submit_btn}`}
          onClick={handleSubmit}
          // disabled={disableSubmitBtn}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ModalSalesTable;
