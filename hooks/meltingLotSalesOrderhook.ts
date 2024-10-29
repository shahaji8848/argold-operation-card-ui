'use client';

import DELETESalesOrders from '@/services/api/melting-lot-dashboard-page/delete-sales-order';
import GETMeltingPlanBasedOnFilters from '@/services/api/melting-lot-dashboard-page/get-data-base-on-filters';
import GETMeltingPlanOrders from '@/services/api/melting-lot-dashboard-page/get-melting-plan-order';
import GETMeltingPlanFilters from '@/services/api/melting-lot-dashboard-page/melting-plan-filters';
import POSTAddOrders from '@/services/api/melting-lot-dashboard-page/post-add-orders';
import GETProductFiltersForDesign from '@/services/api/melting-lot-dashboard-page/product-filters-for-design';
import GETProductFiltersGroupOrdersByDesign from '@/services/api/melting-lot-dashboard-page/product-filters-group-by-design';
import GETViewSalesOrder from '@/services/api/melting-lot-dashboard-page/view-sales-order';
import GETViewSalesOrderShowFields from '@/services/api/melting-lot-dashboard-page/view-sales-order-show-fields';
import { get_access_token } from '@/store/slice/login-slice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMeltingLotSalesOrder = () => {
  const { token } = useSelector(get_access_token);
  const [meltingPlanFilters, setMeltingPlanFilters] = useState<any>({});
  const [salesOrderData, setSalesOrderData] = useState<any>([]);
  const [selectedOrders, setSelectedOrders] = useState<{ [key: string]: boolean }>({});
  const [selectedDesign, setSelectedDesign] = useState<any>(null); // New state to track selected design
  const [existingSalesOrderData, setExistingSalesOrderData] = useState<any>([]);
  // View sales order
  const [viewSalesOrderData, setViewSalesOrderData] = useState<any>([]);
  const [allowMultipleDesign, setAllowMultipleDesign] = useState<any>();
  const [groupOrdersByDesign, setGroupOrdersByDesign] = useState<any>();
  const [viewSalesOrderFields, setViewSalesOrderFields] = useState<any>({});
  const [addOrderBtndisabled, setAddOrderBtndisabled] = useState<any>(false);
  const [combinationNameValue, setCombinationNameValue] = useState<any>('');
  const searchParams = useSearchParams();
  const meltingPlan = searchParams.get('melting_plan');
  const lotDataParam = searchParams.get('lot_data'); // No redeclaration

  const meltingPlanFilterParams = {
    melting_plan: searchParams.get('melting_plan'),
    lot_data: searchParams.get('lot_data'),
  };

  useEffect(() => {
    if (meltingPlan) {
      fetchMeltingPlanFilter();
      fetchExistingMeltingPlanOrder(meltingPlan);
      handleViewSalesOrderOnProductAndPurity(meltingPlan);
    }
    if (lotDataParam) {
      const parsedLotData = JSON.parse(decodeURIComponent(lotDataParam)); // Use a new variable name

      // Access the combination_name from the parsed data
      const combinationName = parsedLotData.combination_name;
      setCombinationNameValue(combinationName);
    }
  }, [meltingPlan]);

  const fetchMeltingPlanFilter = async () => {
    const getMelitngPlanFilters = await GETMeltingPlanFilters(token, meltingPlanFilterParams);

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

  const fetchProductFiltersForDesign = async () => {
    const getProductFiltersForDesign = await GETProductFiltersForDesign(meltingPlanFilters?.product, token);
    if (getProductFiltersForDesign?.status === 200) {
      setAllowMultipleDesign(getProductFiltersForDesign?.data?.data[0]?.allow_multiple_designs_in_orders);
    }
  };

  const fetchNextProductProcessDepartment = async () => {
    const fetchNextProductProcessDepartmentData: any = await GETProductFiltersGroupOrdersByDesign(
      meltingPlanFilters?.product,
      token
    );
    if (fetchNextProductProcessDepartmentData?.status === 200) {
      setGroupOrdersByDesign(fetchNextProductProcessDepartmentData?.data?.data[0]?.group_orders_by_design);
    }
  };

  useEffect(() => {
    if (meltingPlanFilters?.product !== null) {
      fetchNextProductProcessDepartment();
      fetchProductFiltersForDesign();
    }
  }, [meltingPlanFilters?.product]);

  const handleGetSalesOrders = () => {
    fetchMeltingPlanBasedOnFilters();
    fetchNextProductProcessDepartment();
  };

  const handleCheckboxChange = (unique_key: any, design: string, isChecked: boolean, isDisabled: boolean) => {
    if (isDisabled) return; // Do nothing if the checkbox is disabled

    setSelectedOrders((prevData) => {
      if (isChecked) {
        // If the checkbox is already checked and is being unchecked
        const updatedData = { ...prevData };
        console.log("updateddd",updatedData)
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
    const lotDataParam: any = searchParams.get('lot_data');
    const parsedLotData = JSON.parse(decodeURIComponent(lotDataParam)); // Use a new variable name

    // Access the combination_name from the parsed data
    const combinationName = parsedLotData?.combination_name || ' ';

    const getMeltingPlanOrders = await GETMeltingPlanOrders(meltingPlanValue, combinationName, token);
    if (getMeltingPlanOrders?.status === 200) {
      setExistingSalesOrderData(getMeltingPlanOrders?.data?.message);
    } else {
      setExistingSalesOrderData([]);
    }
  };

  const handleSaveSalesOrder = async () => {
    console.log('sales order data', salesOrderData, selectedOrders);
    let transformedDataList: any[] = [];
    // Iterate over the single orders in salesOrderData

    salesOrderData?.single_orders?.forEach((order: any) => {
      // Iterate over item group data in the current order
      order?.item_group_data?.forEach((itemGroupData: any) => {
        // Check if the current item group is selected

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

        // if (selectedOrders[itemGroupData?.unique_key]) {
        // Iterate over market design name values in the current item group
        itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
          // Create a new order object with the necessary details
          console.log('soi mamee sele', selectedOrders);

          if (selectedOrders[itemGroupData?.unique_key] || selectedOrders[marketDesign?.soi_name]) {
            console.log('soi mamee', marketDesign.soi_name);
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
          }
        });
        // }
      });
    });

    let updatedSalesOrderData: any = {
      melting_plan: meltingPlan,
      combination_name: combinationNameValue,
      pending_sales_orders_data: transformedDataList,
    };

    console.log({updatedSalesOrderData})

    // Now, also include deleted orders for single in the POST request
    // existingSalesOrderData?.single_orders?.forEach((deletedOrder: any) => {
    //   deletedOrder?.item_group_data?.forEach((itemGroupData: any) => {
    //     itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
    //       const deletedOrderData = {
    //         design: itemGroupData?.design,
    //         sales_order: deletedOrder?.sales_order,
    //         order_date: deletedOrder?.order_date,
    //         delivery_date: deletedOrder?.delivery_date,
    //         customer: deletedOrder?.customer,
    //         description: deletedOrder?.description,
    //         total_order_weight: deletedOrder?.total_order_weight,
    //         soi_name: marketDesign?.soi_name,
    //         item: marketDesign?.item,
    //         market_design_name: marketDesign?.market_design_name,
    //         product: marketDesign?.product,
    //         size: marketDesign?.size,
    //         quantity: marketDesign?.quantity,
    //         is_bunch: marketDesign?.is_bunch,
    //         weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
    //         product_category: marketDesign?.product_category,
    //         bunch_length: marketDesign?.bunch_length,
    //         per_inch_weight: marketDesign?.per_inch_weight,
    //         estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
    //         order_weight: marketDesign?.order_weight,
    //       };
    //       transformedDataList.push(deletedOrderData);
    //     });
    //   });
    // });

    // Now, also include deleted orders for bunch in the POST request
    // existingSalesOrderData?.bunch_orders?.forEach((deletedOrder: any) => {
    //   deletedOrder?.item_group_data?.forEach((itemGroupData: any) => {
    //     itemGroupData?.market_design_name_values?.forEach((marketDesign: any) => {
    //       const deletedOrderData = {
    //         design: itemGroupData?.design,
    //         sales_order: deletedOrder?.sales_order,
    //         order_date: deletedOrder?.order_date,
    //         delivery_date: deletedOrder?.delivery_date,
    //         customer: deletedOrder?.customer,
    //         description: deletedOrder?.description,
    //         total_order_weight: deletedOrder?.total_order_weight,
    //         soi_name: marketDesign?.soi_name,
    //         item: marketDesign?.item,
    //         market_design_name: marketDesign?.market_design_name,
    //         product: marketDesign?.product,
    //         size: marketDesign?.size,
    //         quantity: marketDesign?.quantity,
    //         is_bunch: marketDesign?.is_bunch,
    //         weight_per_unit_qty: marketDesign?.weight_per_unit_qty,
    //         product_category: marketDesign?.product_category,
    //         bunch_length: marketDesign?.bunch_length,
    //         per_inch_weight: marketDesign?.per_inch_weight,
    //         estimate_bunch_weight: marketDesign?.estimate_bunch_weight,
    //         order_weight: marketDesign?.order_weight,
    //       };
    //       transformedDataList.push(deletedOrderData);
    //     });
    //   });
    // });

    // Debugging: Check the transformed data list

    // Make the API call
    try {
      // setAddOrderBtndisabled(true);
      // const updatedData = await POSTAddOrders(updatedSalesOrderData, token);
      // if (updatedData?.status === 200) {
      //   const isSucess = updatedData?.data?.message?.message;
      //   if (isSucess) {
      //     toast.success(updatedData?.data?.message?.message);
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 2000);
      //     setTimeout(() => {
      //       setAddOrderBtndisabled(false);
      //     }, 3000);
      //   } else {
      //     setAddOrderBtndisabled(false);
      //     toast.error(updatedData?.data?.message);
      //   }
      // } else {
      //   toast.error('Failed to update sales order');
      //   setAddOrderBtndisabled(false);
      // }
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

  // const handleDeleteSalesOrder = () => {
  //   // Filter out the orders that are selected
  //   const updatedSingleOrders = existingSalesOrderData?.single_orders
  //     .map((order: any) => {
  //       const filteredItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Capture deleted item_group_data to store in state
  //       const deletedItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Store deleted items in state
  //       if (deletedItemGroupData.length > 0) {
  //         setDeletedSingleOrders((prevDeleted) => [...prevDeleted, { ...order, item_group_data: !deletedItemGroupData }]);
  //       }

  //       return { ...order, item_group_data: filteredItemGroupData };
  //     })
  //     .filter((order: any) => order.item_group_data.length > 0);

  //   const updatedBunchOrders = existingSalesOrderData?.bunch_orders
  //     .map((order: any) => {
  //       const filteredItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Capture deleted item_group_data to store in state
  //       const deletedItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Store deleted items in state
  //       if (deletedItemGroupData.length > 0) {
  //         setDeletedSingleOrders((prevDeleted) => [...prevDeleted, { ...order, item_group_data: !deletedItemGroupData }]);
  //       }

  //       return { ...order, item_group_data: filteredItemGroupData };
  //     })
  //     .filter((order: any) => order.item_group_data.length > 0);

  //   // Update the existingSalesOrderData state with the filtered data
  //   setExistingSalesOrderData((prevState: any) => ({
  //     ...prevState,
  //     single_orders: updatedSingleOrders,
  //     bunch_orders: updatedBunchOrders,
  //   }));

  //   // Reset selectedOrders state after deletion
  //   setSelectedOrders({});
  // };

  // const handleDeleteSalesOrder = async () => {
  //   const deletedItemsSoiNames: string[] = [];

  //   // Filter out the orders that are selected for single_orders
  //   const updatedSingleOrders = existingSalesOrderData?.single_orders
  //     .map((order: any) => {
  //       const filteredItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Capture deleted item_group_data based on unique_key
  //       const deletedItemGroupData = order.item_group_data.filter((itemGroupData: any) => {
  //         const marketValues = itemGroupData?.market_design_name_values || [];
  //         return selectedOrders[itemGroupData?.unique_key]; // Ensure we are matching with unique_key
  //       });

  //       // Collect the deleted items' soi_name for the API call
  //       deletedItemGroupData.forEach((itemGroupData: any) => {
  //         const marketValues = itemGroupData?.market_design_name_values || [];
  //         if (marketValues[0]?.soi_name) {
  //           deletedItemsSoiNames.push(marketValues[0].soi_name); // Push soi_name to array
  //         }
  //       });

  //       // Return updated orders
  //       return { ...order, item_group_data: filteredItemGroupData };
  //     })
  //     .filter((order: any) => order.item_group_data.length > 0);

  //   // Filter out the orders that are selected for bunch_orders
  //   const updatedBunchOrders = existingSalesOrderData?.bunch_orders
  //     .map((order: any) => {
  //       const filteredItemGroupData = order.item_group_data.filter(
  //         (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
  //       );

  //       // Capture deleted item_group_data based on unique_key
  //       const deletedItemGroupData = order.item_group_data.filter((itemGroupData: any) => {
  //         const marketValues = itemGroupData?.market_design_name_values || [];
  //         return selectedOrders[itemGroupData?.unique_key]; // Ensure we are matching with unique_key
  //       });

  //       // Collect the deleted items' soi_name for the API call
  //       deletedItemGroupData.forEach((itemGroupData: any) => {
  //         const marketValues = itemGroupData?.market_design_name_values || [];
  //         if (marketValues[0]?.soi_name) {
  //           deletedItemsSoiNames.push(marketValues[0].soi_name); // Push soi_name to array
  //         }
  //       });

  //       // Return updated orders
  //       return { ...order, item_group_data: filteredItemGroupData };
  //     })
  //     .filter((order: any) => order.item_group_data.length > 0);

  //   // Update the existingSalesOrderData state with the filtered data
  //   setExistingSalesOrderData((prevState: any) => ({
  //     ...prevState,
  //     single_orders: updatedSingleOrders,
  //     bunch_orders: updatedBunchOrders,
  //   }));

  //   // If there are items to delete, make the API call
  //   if (deletedItemsSoiNames.length > 0) {
  //     try {
  //       // Send the DELETE API call to delete the selected sales orders as query params
  //       const response = await DELETESalesOrders(deletedItemsSoiNames, token);

  //       if (response?.status === 200) {
  //         if (response?.data?.message !== 'Cannot delete the Sales Order as it has already been added to an Operation Card.') {
  //           toast.success(response?.data?.message);
  //         } else {
  //           toast.error(response?.data?.message);
  //           // setTimeout(() => {
  //           //   window.location.reload(); // Reload the page after showing the error toast
  //           // }, 2000); // 2 seconds delay
  //         }
  //       }

  //       // Reset selectedOrders state after deletion
  //       setSelectedOrders({});
  //     } catch (error: any) {
  //       toast.error('Error deleting sales orders:', error);
  //     }
  //   } else {
  //     toast.error('No sales order is selected');
  //   }
  // };

  const handleDeleteSalesOrder = async () => {
    const deletedItemsSoiNames: string[] = [];

    // Filter out the orders that are selected for single_orders
    const updatedSingleOrders = existingSalesOrderData?.single_orders
      .map((order: any) => {
        const filteredItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
        );

        // Collect all deleted `soi_name` from selected orders
        order.item_group_data
          .filter((itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]) // Filter selected orders
          .forEach((itemGroupData: any) => {
            const marketValues = itemGroupData?.market_design_name_values || [];
            // Collect all `soi_name` values and push to deletedItemsSoiNames
            marketValues.forEach((marketValue: any) => {
              if (marketValue?.soi_name) {
                deletedItemsSoiNames.push(marketValue?.soi_name); // Push all selected `soi_name`
              }
            });
          });

        // Return updated orders
        return { ...order, item_group_data: filteredItemGroupData };
      })
      .filter((order: any) => order.item_group_data.length > 0);

    // Filter out the orders that are selected for bunch_orders
    const updatedBunchOrders = existingSalesOrderData?.bunch_orders
      .map((order: any) => {
        const filteredItemGroupData = order.item_group_data.filter(
          (itemGroupData: any) => !selectedOrders[itemGroupData?.unique_key]
        );

        // Collect all deleted `soi_name` from selected bunch orders
        order.item_group_data
          .filter((itemGroupData: any) => selectedOrders[itemGroupData?.unique_key]) // Filter selected orders
          .forEach((itemGroupData: any) => {
            const marketValues = itemGroupData?.market_design_name_values || [];
            // Collect all `soi_name` values and push to deletedItemsSoiNames
            marketValues.forEach((marketValue: any) => {
              if (marketValue?.soi_name) {
                deletedItemsSoiNames.push(marketValue?.soi_name); // Push all selected `soi_name`
              }
            });
          });

        // Return updated orders
        return { ...order, item_group_data: filteredItemGroupData };
      })
      .filter((order: any) => order.item_group_data.length > 0);

    // Update the existingSalesOrderData state with the filtered data
    setExistingSalesOrderData((prevState: any) => ({
      ...prevState,
      single_orders: updatedSingleOrders,
      bunch_orders: updatedBunchOrders,
    }));

    // If there are items to delete, make the API call
    if (deletedItemsSoiNames.length > 0) {
      try {
        // Send the DELETE API call to delete the selected sales orders as query params
        const response = await DELETESalesOrders(deletedItemsSoiNames, meltingPlan, token);

        if (response?.status === 200) {
          if (response?.data?.message !== 'Cannot delete the Sales Order as it has already been added to an Operation Card.') {
            toast.success(response?.data?.message);
          } else {
            toast.error(response?.data?.message);
            // Optionally reload the page after showing the error toast
            // setTimeout(() => window.location.reload(), 2000);
            fetchExistingMeltingPlanOrder(meltingPlan);
          }
        }

        // Reset selectedOrders state after deletion
        setSelectedOrders({});
      } catch (error: any) {
        toast.error('Error deleting sales orders:', error);
      }
    } else {
      toast.error('cannot delete selected sales order');
    }
  };

  // View Sales Order
  const handleViewSalesOrderOnProductAndPurity = async (meltingPlanValue: any) => {
    const getMelitngPlanFilters = await GETViewSalesOrderShowFields(token, meltingPlanValue);

    if (getMelitngPlanFilters?.status === 200) {
      setViewSalesOrderFields(getMelitngPlanFilters?.data?.message);
    } else {
      setViewSalesOrderFields({});
    }
  };

  const fetchViewSalesOrderMeltingPlanBasedOnFilters = async () => {
    const getMeltingPlanBasedOnFiltersData = await GETViewSalesOrder(
      viewSalesOrderFields?.product,
      viewSalesOrderFields?.purity,
      token
    );

    if (getMeltingPlanBasedOnFiltersData?.status === 200) {
      setViewSalesOrderData(getMeltingPlanBasedOnFiltersData?.data?.message);
      toast.error(getMeltingPlanBasedOnFiltersData?.data?.message?.message);
    } else {
      setViewSalesOrderData([]);
      toast.error('No Data Found');
    }
  };

  const handleGetViewSalesOrders = () => {
    fetchViewSalesOrderMeltingPlanBasedOnFilters();
    fetchGroupOrderByDesign();
  };

  // view sales order for design and market design name show column
  const fetchGroupOrderByDesign = async () => {
    const fetchNextProductProcessDepartmentData: any = await GETProductFiltersGroupOrdersByDesign(
      viewSalesOrderFields?.product,
      token
    );
    if (fetchNextProductProcessDepartmentData?.status === 200) {
      setGroupOrdersByDesign(fetchNextProductProcessDepartmentData?.data?.data[0]?.group_orders_by_design);
    }
  };

  useEffect(() => {
    if (viewSalesOrderFields?.product !== null) {
      fetchGroupOrderByDesign();
    }
  }, [viewSalesOrderFields?.product]);

  // add sales order for design and market design name show column

  const fetchGroupOrderByDesignMeltingPlan = async () => {
    const fetchNextProductProcessDepartmentData: any = await GETProductFiltersGroupOrdersByDesign(
      meltingPlanFilters?.product,
      token
    );
    if (fetchNextProductProcessDepartmentData?.status === 200) {
      setGroupOrdersByDesign(fetchNextProductProcessDepartmentData?.data?.data[0]?.group_orders_by_design);
    }
  };

  useEffect(() => {
    if (meltingPlanFilters?.product !== null) {
      fetchGroupOrderByDesignMeltingPlan();
    }
  }, [meltingPlanFilters?.product]);

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
    handleViewSalesOrderOnProductAndPurity,
    viewSalesOrderData,
    handleGetViewSalesOrders,
    groupOrdersByDesign,
    viewSalesOrderFields,
  };
};

export default useMeltingLotSalesOrder;
