import UpdateSalesOrderAPI from '@/services/api/operation-card-detail-page/update-sales-order-api';
import { get_access_token } from '@/store/slice/login-slice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useAssignedOrderCustomerHook = ({ operationCardDetailData, salesOrderList }: any) => {
  const { token } = useSelector(get_access_token);

  const [salesOrderData, setSalesOrderData] = useState<any>({});

  const handleCheckboxChange: any = (data: any) => {
    setSalesOrderData(data);
  };

  const handleSubmit: any = async () => {
    console.log('operationCardDetailData', operationCardDetailData, salesOrderData);

    const customerName: any =
      Object.keys(operationCardDetailData)?.length > 0 &&
      operationCardDetailData?.operation_card_issue_details?.find((data: any) => data.item === 'Customer')?.name;

    console.log('customer ids', customerName);

    let transformedDataList: any[] = [];

    salesOrderList.forEach((order: any) => {
      if (order.qty_size_list && order.qty_size_list.length > 0) {
        order.qty_size_list.forEach((qtyItem: any) => {
          let newOrder = {
            order_id: order.order_id,
            sales_order: order.sales_order,
            customer: order.customer ?? '',
            item: order.item,
            item_name: order.item_name,
            size: qtyItem.size,
            production_qty: qtyItem.production_qty,
            ready_qty: qtyItem.production_qty,
            soisd_item: qtyItem.soisd_item,
          };
          transformedDataList.push(newOrder);
        });
      } else {
        let newOrder = {
          order_id: order.order_id,
          sales_order: order.sales_order,
          customer: order.customer ?? '',
          item: order.item,
          item_name: order.item_name,
          size: null,
          production_qty: null,
          ready_qty: null,
          soisd_item: null,
        };
        transformedDataList.push(newOrder);
      }
    });

    console.log('transformedDataList', transformedDataList, salesOrderData);
    transformedDataList.forEach((data: any) => {
      if (data.sales_order === salesOrderData.sales_order) {
        data.assigned_order_id = '1';
      }
    });
    console.log('transformedDataList addAssignedOrderId', transformedDataList);

    try {
      // const updatedData = await UpdateSalesOrderAPI(transformedDataList, operationCardDetailData?.name, token);
      //   if (updatedData?.status === 200) {
      //     toast.success('Sales order updated successfully');
      //   }
    } catch (error) {
      //   toast.error('Failed to update sales order');
    }
  };

  return {
    handleSubmit,
    handleCheckboxChange,
  };
};

export default useAssignedOrderCustomerHook;
