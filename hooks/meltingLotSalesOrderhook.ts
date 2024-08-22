'use client';
import GETMeltingPlanBasedOnFilters from '@/services/api/melting-lot-dashboard-page/get-data-base-on-filters';
import GETMeltingPlanFilters from '@/services/api/melting-lot-dashboard-page/melting-plan-filters';
import POSTAddOrders from '@/services/api/melting-lot-dashboard-page/post-add-orders';
import { get_access_token } from '@/store/slice/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMeltingLotSalesOrder = () => {
  const { token } = useSelector(get_access_token);
  const [meltingPlan, setMeltingPlan] = useState('');
  const [meltingPlanFilters, setMeltingPlanFilters] = useState({});
  const [salesOrderData, setSalesOrderData] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const url = window.location.href;
    const meltingPlanValue = url.split('=')[1];

    setMeltingPlan(meltingPlanValue || '');
    if (meltingPlanValue) {
      fetchMeltingPlanFilter(meltingPlanValue);
    }
  }, [meltingPlan]);

  const fetchMeltingPlanFilter = async (meltingPlanValue: any) => {
    const getMelitngPlanFilters = await GETMeltingPlanFilters(token, meltingPlanValue);

    if (getMelitngPlanFilters?.status === 200) {
      setMeltingPlanFilters(getMelitngPlanFilters?.data?.message);
    } else {
      setMeltingPlanFilters({});
    }
  };

  const fetchMeltingPlanBasedOnFilters = async () => {
    const getMeltingPlanBasedOnFiltersData = await GETMeltingPlanBasedOnFilters(
      meltingPlanFilters?.design,
      meltingPlanFilters?.product,
      meltingPlanFilters?.machine_size,
      meltingPlanFilters?.product_category,
      token
    );

    if (getMeltingPlanBasedOnFiltersData?.status === 200) {
      // if (
      //   getMeltingPlanBasedOnFiltersData?.data?.message?.bunch_orders > 0 ||
      //   getMeltingPlanBasedOnFiltersData?.data?.message?.single_orders > 0
      // ) {
      setSalesOrderData(getMeltingPlanBasedOnFiltersData?.data?.message);
      // }
      toast.error(getMeltingPlanBasedOnFiltersData?.data?.message?.message);
    } else {
      setSalesOrderData([]);
      toast.error('No Data Found');
    }
  };

  const handleGetSalesOrders = () => {
    fetchMeltingPlanBasedOnFilters();
  };

  const handleCheckboxChange = (sales_order: any) => {
    setSelectedOrders((prev) => ({
      ...prev,
      [sales_order]: !prev[sales_order],
    }));
  };

  const handleSaveSalesOrder = async () => {
    let transformedDataList: any[] = [];

    transformedDataList.push({
      melting_plan: meltingPlan,
    });

    // Iterate over single_orders
    salesOrderData?.single_orders?.forEach((order: any, index: any) => {
      if (selectedOrders[order?.sales_order]) {
        const marketDesignName = order?.market_design_name;

        // Ensure item_group_data exists and iterate over it
        if (order?.item_group_data && order?.item_group_data.length > 0) {
          order?.item_group_data.forEach((itemGroupData: any) => {
            // Access the correct items array
            const items = itemGroupData[marketDesignName];

            // Ensure items exist and iterate over them
            if (items && items.length > 0) {
              items.forEach((qtyItem: any) => {
                let newOrder = {
                  sales_order: order?.sales_order,
                  order_date: order?.order_date,
                  delivery_date: order?.delivery_date,
                  customer: order?.customer,
                  description: order?.description,
                  order_weight: order?.order_weight,
                  market_design_name: order?.market_design_name,
                  soi_name: qtyItem?.soi_name,
                  item: qtyItem?.item,
                  product: qtyItem?.product,
                  size: qtyItem?.size,
                  quantity: qtyItem?.quantity,
                  is_bunch: qtyItem?.is_bunch,
                  weight_per_unit_qty: qtyItem?.weight_per_unit_qty,
                };
                // Push the new order to the transformed data list
                transformedDataList.push(newOrder);
              });
            }
          });
        }
      }
    });

    // Iterate over bunch_orders
    salesOrderData?.bunch_orders?.forEach((order: any) => {
      if (selectedOrders[order?.sales_order]) {
        const marketDesignName = order?.market_design_name;
        // Ensure item_group_data exists and iterate over it
        if (order?.item_group_data && order?.item_group_data.length > 0) {
          order?.item_group_data.forEach((itemGroupData: any) => {
            // Access the correct items array
            const items = itemGroupData[marketDesignName];

            // Ensure items exist and iterate over them
            if (items && items.length > 0) {
              items.forEach((qtyItem: any) => {
                let newOrder = {
                  sales_order: order?.sales_order,
                  order_date: order?.order_date,
                  delivery_date: order?.delivery_date,
                  customer: order?.customer,
                  description: order?.description,
                  order_weight: order?.order_weight,
                  market_design_name: order?.market_design_name,
                  soi_name: qtyItem?.soi_name,
                  item: qtyItem?.item,
                  product: qtyItem?.product,
                  size: qtyItem?.size,
                  quantity: qtyItem?.quantity,
                  is_bunch: qtyItem?.is_bunch,
                  weight_per_unit_qty: qtyItem?.weight_per_unit_qty,
                };
                // Push the new order to the transformed data list
                transformedDataList.push(newOrder);
              });
            }
          });
        }
      }
    });

    // Debugging: Check the transformed data list
    console.log('transformedDataList', transformedDataList);

    // Make the API call
    try {
      const updatedData = await POSTAddOrders(transformedDataList, token);
      if (updatedData?.status === 200) {
        toast.success('Sales order updated successfully');
      } else {
        toast.error('Failed to update sales order');
      }
    } catch (error) {
      toast.error('Failed to update sales order');
    }
  };

  // Function to format date
  const formatDate = (dateString: any) => {
    if (!dateString || dateString === ' ' || dateString === null) {
      return '--';
    }

    // Attempt to parse and format the date
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns 0-11
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      return '--';
    }
  };

  return {
    meltingPlan,
    meltingPlanFilters,
    handleGetSalesOrders,
    salesOrderData,
    selectedOrders,
    handleCheckboxChange,
    formatDate,
    handleSaveSalesOrder,
  };
};

export default useMeltingLotSalesOrder;
