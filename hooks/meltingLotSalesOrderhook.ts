'use client';
import GETMeltingPlanBasedOnFilters from '@/services/api/melting-lot-dashboard-page/get-data-base-on-filters';
import GETMeltingPlanOrders from '@/services/api/melting-lot-dashboard-page/get-melting-plan-order';
import GETMeltingPlanFilters from '@/services/api/melting-lot-dashboard-page/melting-plan-filters';
import POSTAddOrders from '@/services/api/melting-lot-dashboard-page/post-add-orders';
import { get_access_token } from '@/store/slice/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMeltingLotSalesOrder = () => {
  const { token } = useSelector(get_access_token);
  const [meltingPlan, setMeltingPlan] = useState<any>('');
  const [meltingPlanFilters, setMeltingPlanFilters] = useState<any>({});
  const [salesOrderData, setSalesOrderData] = useState<any>([]);
  const [selectedOrders, setSelectedOrders] = useState<{ [key: string]: boolean }>({});
  const [selectedDesign, setSelectedDesign] = useState<any>(null); // New state to track selected design
  const [existingSalesOrderData, setExistingSalesOrderData] = useState<any>([]);
  const [deletedSingleOrders, setDeletedSingleOrders] = useState<any[]>([]);
  // State to manage selected orders
  const [existingSelectedOrders, setExistingSelectedOrders] = useState<any>({});

  useEffect(() => {
    const url = window.location.href;
    const meltingPlanValue = url.split('=')[1];

    setMeltingPlan(meltingPlanValue || '');
    if (meltingPlanValue) {
      fetchMeltingPlanFilter(meltingPlanValue);
      fetchExistingMeltingPlanOrder(meltingPlanValue);
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
      setSalesOrderData(getMeltingPlanBasedOnFiltersData?.data?.message);
      toast.error(getMeltingPlanBasedOnFiltersData?.data?.message?.message);
    } else {
      setSalesOrderData([]);
      toast.error('No Data Found');
    }
  };

  const handleGetSalesOrders = () => {
    fetchMeltingPlanBasedOnFilters();
  };

  const handleCheckboxChange = (unique_key: any, design: string, isChecked: boolean, isDisabled: boolean) => {
    if (isDisabled) return; // Do nothing if the checkbox is disabled

    setSelectedOrders((prevData) => {
      if (isChecked) {
        // If the checkbox is already checked and is being unchecked
        const updatedData = { ...prevData };
        delete updatedData[unique_key]; // Remove the unchecked order from the selected orders

        // If all checkboxes are unchecked, reset selectedDesign
        if (Object.keys(updatedData).length === 0) {
          setSelectedDesign(null);
        }

        return updatedData;
      } else {
        // If the checkbox is being checked
        if (selectedDesign && selectedDesign !== design) {
          toast.error('You can only select orders with the same design.');
          return prevData; // Do not update state if different design
        }

        // Set selectedDesign if none is selected
        if (!selectedDesign) {
          setSelectedDesign(design);
        }

        // Add the checked order to the selected orders
        return { ...prevData, [unique_key]: true };
      }
    });
  };

  // Function to format date formate
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

  //function to get  Selected add melting lot sales order data
  const fetchExistingMeltingPlanOrder = async (meltingPlanValue: any) => {
    const getMeltingPlanOrders = await GETMeltingPlanOrders(meltingPlanValue, token);
    if (getMeltingPlanOrders?.status === 200) {
      setExistingSalesOrderData(getMeltingPlanOrders?.data?.message);
    } else {
      setExistingSalesOrderData([]);
    }
  };

  const handleSaveSalesOrder = async () => {
    let transformedDataList: any[] = [];

    transformedDataList.push({
      melting_plan: meltingPlan,
    });

    // Iterate over the single orders in salesOrderData

    salesOrderData?.single_orders?.forEach((order: any) => {
      // Iterate over item group data in the current order
      order?.item_group_data?.forEach((itemGroupData: any) => {
        // Check if the current item group is selected
        console.log('selectedOrders', selectedOrders);
        console.log('selectedOrders', itemGroupData?.unique_key);
        console.log('selectedOrders', selectedOrders[itemGroupData?.unique_key]);
        if (selectedOrders[itemGroupData?.unique_key]) {
          // Iterate over market design name values in the current item group
          itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
            // Create a new order object with the necessary details
            const newOrder = {
              design: itemGroupData?.design,
              sales_order: order?.sales_order,
              order_date: order?.order_date,
              delivery_date: order?.delivery_date,
              customer: order?.customer,
              description: order?.description,
              total_order_weight: order?.total_order_weight,
              total_estimate_bunch_weight: order?.total_estimate_bunch_weight,
              total_bunch_weight: order?.total_bunch_weight,
              soi_name: marketDesign?.soi_name,
              item: marketDesign?.item,
              market_design_name: marketDesign?.market_design_name,
              product: marketDesign?.product,
              size: marketDesign?.size,
              quantity: marketDesign?.quantity,
              is_bunch: marketDesign?.is_bunch,
              weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
              product_category: marketDesign?.product_category,
              bunch_length: marketDesign?.bunch_length,
              per_inch_weight: marketDesign?.per_inch_weight,
              estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
              order_weight: marketDesign?.order_weight,
            };

            // Add the new order object to the transformed data list
            transformedDataList.push(newOrder);
          });
        }
      });
    });

    // Iterate over the salesOrderData bunch orders
    salesOrderData?.bunch_orders?.forEach((order: any) => {
      // Iterate over item group data in the current order
      order?.item_group_data?.forEach((itemGroupData: any) => {
        // Check if the current item group is selected
        console.log('selectedOrders', selectedOrders);
        console.log('itemGroupData unique_key', itemGroupData?.unique_key);
        console.log('selectedOrders[itemGroupData.unique_key]', selectedOrders[itemGroupData?.unique_key]);

        if (selectedOrders[itemGroupData?.unique_key]) {
          // Iterate over market design name values in the current item group
          itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
            // Create a new order object with the necessary details
            const newOrder = {
              design: itemGroupData?.design,
              sales_order: order?.sales_order,
              order_date: order?.order_date,
              delivery_date: order?.delivery_date,
              customer: order?.customer,
              description: order?.description,
              total_order_weight: order?.total_order_weight,
              total_estimate_bunch_weight: order?.total_estimate_bunch_weight,
              total_bunch_weight: order?.total_bunch_weight,
              soi_name: marketDesign?.soi_name,
              item: marketDesign?.item,
              market_design_name: marketDesign?.market_design_name,
              product: marketDesign?.product,
              size: marketDesign?.size,
              quantity: marketDesign?.quantity,
              is_bunch: marketDesign?.is_bunch,
              weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
              product_category: marketDesign?.product_category,
              bunch_length: marketDesign?.bunch_length,
              per_inch_weight: marketDesign?.per_inch_weight,
              estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
              order_weight: marketDesign?.order_weight,
            };

            // Add the new order object to the transformed data list
            transformedDataList.push(newOrder);
          });
        }
      });
    });

    // Now, also include deleted orders for single in the POST request
    existingSalesOrderData?.single_orders?.forEach((deletedOrder: any) => {
      deletedOrder?.item_group_data?.forEach((itemGroupData: any) => {
        itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
          const deletedOrderData = {
            design: itemGroupData?.design,
            sales_order: deletedOrder?.sales_order,
            order_date: deletedOrder?.order_date,
            delivery_date: deletedOrder?.delivery_date,
            customer: deletedOrder?.customer,
            description: deletedOrder?.description,
            total_order_weight: deletedOrder?.total_order_weight,
            soi_name: marketDesign?.soi_name,
            item: marketDesign?.item,
            market_design_name: marketDesign?.market_design_name,
            product: marketDesign?.product,
            size: marketDesign?.size,
            quantity: marketDesign?.quantity,
            is_bunch: marketDesign?.is_bunch,
            weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
            product_category: marketDesign?.product_category,
            bunch_length: marketDesign?.bunch_length,
            per_inch_weight: marketDesign?.per_inch_weight,
            estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
            order_weight: marketDesign?.order_weight,
          };
          transformedDataList.push(deletedOrderData);
        });
      });
    });

    // Now, also include deleted orders for bunch in the POST request
    existingSalesOrderData?.bunch_orders?.forEach((deletedOrder: any) => {
      deletedOrder?.item_group_data?.forEach((itemGroupData: any) => {
        itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
          const deletedOrderData = {
            design: itemGroupData?.design,
            sales_order: deletedOrder?.sales_order,
            order_date: deletedOrder?.order_date,
            delivery_date: deletedOrder?.delivery_date,
            customer: deletedOrder?.customer,
            description: deletedOrder?.description,
            total_order_weight: deletedOrder?.total_order_weight,
            soi_name: marketDesign?.soi_name,
            item: marketDesign?.item,
            market_design_name: marketDesign?.market_design_name,
            product: marketDesign?.product,
            size: marketDesign?.size,
            quantity: marketDesign?.quantity,
            is_bunch: marketDesign?.is_bunch,
            weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
            product_category: marketDesign?.product_category,
            bunch_length: marketDesign?.bunch_length,
            per_inch_weight: marketDesign?.per_inch_weight,
            estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
            order_weight: marketDesign?.order_weight,
          };
          transformedDataList.push(deletedOrderData);
        });
      });
    });

    // Debugging: Check the transformed data list
    console.log('transformedDataList', transformedDataList);

    // Make the API call
    try {
      const updatedData = await POSTAddOrders(transformedDataList, token);
      if (updatedData?.status === 200) {
        toast.success(updatedData?.data?.message?.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast.error(updatedData?.data?.message);
      } else {
        toast.error('Failed to update sales order');
      }
    } catch (error) {
      toast.error('Failed to update sales order');
    }
  };

  // Handle checkbox change
  // const handleExistingCheckboxChange = (uniqueKey: any) => {
  //   setExistingSelectedOrders((prevSelectedOrders: any) => ({
  //     ...prevSelectedOrders,
  //     [uniqueKey]: !prevSelectedOrders[uniqueKey], // Toggle the selection
  //   }));
  // };

  const handleDeleteSalesOrder = () => {
    // Filter out the orders that are selected
    const updatedSingleOrders = existingSalesOrderData?.single_orders
      .map((order: any) => {
        const filteredItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
        );

        // Capture deleted item_group_data to store in state
        const deletedItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]
        );

        // Store deleted items in state
        if (deletedItemGroupData.length > 0) {
          setDeletedSingleOrders((prevDeleted) => [...prevDeleted, { ...order, item_group_data: !deletedItemGroupData }]);
        }

        return { ...order, item_group_data: filteredItemGroupData };
      })
      .filter((order: any) => order.item_group_data.length > 0);

    const updatedBunchOrders = existingSalesOrderData?.bunch_orders
      .map((order: any) => {
        const filteredItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
        );

        // Capture deleted item_group_data to store in state
        const deletedItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]
        );

        // Store deleted items in state
        if (deletedItemGroupData.length > 0) {
          setDeletedSingleOrders((prevDeleted) => [...prevDeleted, { ...order, item_group_data: !deletedItemGroupData }]);
        }

        return { ...order, item_group_data: filteredItemGroupData };
      })
      .filter((order: any) => order.item_group_data.length > 0);

    // Update the existingSalesOrderData state with the filtered data
    setExistingSalesOrderData((prevState: any) => ({
      ...prevState,
      single_orders: updatedSingleOrders,
      bunch_orders: updatedBunchOrders,
    }));

    // Reset selectedOrders state after deletion
    setSelectedOrders({});
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
    selectedDesign,
    existingSalesOrderData,
    handleDeleteSalesOrder,
  };
};

export default useMeltingLotSalesOrder;
