import { useEffect, useRef, useState } from 'react';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';
import { useSearchParams } from 'next/navigation';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import GETOperationCardDetailKarigar from '@/services/api/operation-card-detail-page/operation-card-detail-karigar';
import GETOperationCardDetailProcessThickness from '@/services/api/operation-card-detail-page/operation-card-detail-thickness';
import GETOperationCardDetailProcessVariant from '@/services/api/operation-card-detail-page/operation-card-detail-variant';
import GETOperationCardDetailMachineSize from '@/services/api/operation-card-detail-page/operation-card-detail-machine-size';
import GETProductProcessDesignCodeCategory from '@/services/api/operation-card-detail-page/operation-card-detail-design-code-category';
import GETOperationCardDetailNextKarigar from '@/services/api/operation-card-detail-page/operation-card-detail-next-karigar';
import GETOperationCardDetailProcessConcept from '@/services/api/operation-card-detail-page/operation-card-detail-concept';
import GETOperationCardDetailNextProductProcess from '@/services/api/operation-card-detail-page/operation-card-next-product-process';
import GETOperationCardDetailNextProductProcessDepartment from '@/services/api/operation-card-detail-page/operation-card-next-product-process-dept';
import GETProductProcessDesign from '@/services/api/operation-card-detail-page/operation-card-detail-design';
import GETProductProcessDesignCodeType from '@/services/api/operation-card-detail-page/operation-card-detail-design-code-type';
import POSTOperationCardSave from '@/services/api/operation-card-detail-page/operation-card-save';
import GETProductProcessProductCategory from '@/services/api/operation-card-detail-page/operation-card-detail-product-category';
import GETOperationCardDetailProductData from '@/services/api/operation-card-detail-page/operation-card-detail-product';
import { OCIssueReferenceAPI } from '@/services/api/operation-card-issue-references/oc-issue-references-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slice/login-slice';
import GETOperationCardDetailMachine from '@/services/api/operation-card-detail-page/operation-card-detail-machine';
import GETOperationCardDetailTone from '@/services/api/operation-card-detail-page/operation-card-detail-tone';
import GETProductProcessNextProductCategory from '@/services/api/operation-card-detail-page/operation-card-detail-product-category';
import GETLossPeriodList from '@/services/api/loss-period/loss-period-api';
import GETSellsOrder from '@/services/api/operation-card-detail-page/sales-order-list';
import UpdateSalesOrderAPI from '@/services/api/operation-card-detail-page/update-sales-order-api';
import { toast } from 'react-toastify';
import GETSalesOrderList from '@/services/api/operation-card-detail-page/sales-order-list';
import GETWorkerList from '@/services/api/Worker/worker';
import GETMeltingLotList from '@/services/api/melting-lot-dashboard-page/melting-lot-list';
import GETMeltingFilters from '@/services/api/melting-lot-dashboard-page/melting-filters';
import POSTOperationCardApprove from '@/services/api/operation-card-detail-page/approval-api';
import GETCarryForwardSalesOrder from '@/services/api/operation-card-detail-page/custom-op-sales-order';
import GETMeltingLotOPDetailSalesOrder from '@/services/api/operation-card-detail-page/melting-lot-op-detail-sales-order';
import GETValidationInWeight from '@/services/api/operation-card-detail-page/validation-in-weight';
import GETValidationForDesign from '@/services/api/operation-card-detail-page/validation-for-design';
import GETDesignInputField from '@/services/api/operation-card-detail-page/design-input-field';
import POSTDesignValue from '@/services/api/operation-card-detail-page/post-design-value';
import GETBunchSalesOrder from '@/services/api/operation-card-detail-page/get-bunch-order';
import GETMeltingPlanReferenceFromLot from '@/services/api/operation-card-detail-page/melting-plan-reference';
const useOperationDetailCard = () => {
  const { token } = useSelector(get_access_token);

  const [operationCardKarigarQuantitySettings, setOperationCardKarigarQuantitySettings] = useState({});

  const [headerSave, setHeaderSave] = useState({
    karigar: '',
    quantity: '',
    machine: '',
    tone: '',
    product_category: '',
    description: '',
    loss_period: '',
  });

  const [isBalanceWeightSetAsInWeight, setIsBalanceWeightAsInWeight] = useState<boolean>(false);
  const [balanceWeight, setBalanceWeight] = useState<any>('');
  const [modalFieldsState, setModalFieldsState] = useState<any>({});
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const [operationCardDetailData, setOperationCardDetailData] = useState<any>({});

  const [operationCardKarigar, setOperationCardKarigar] = useState<any>([]);
  const [operationCardNextKarigar, setOperationCardNextKarigar] = useState<any>([]);
  const [operationCardThickness, setOperationCardThickness] = useState<any>([]);
  const [operationCardVariant, setOperationCardVariant] = useState<any>([]);
  const [operationCardConcept, setOperationCardConcept] = useState<any>([]);
  const [operationCardMachineSize, setOperationCardMachineSize] = useState<any>([]);
  const [operationCardDesignCodeCategory, setOperationCardDesignCodeCategory] = useState<any>([]);
  const [operationCardNextProductProcess, setOperationCardNextProductProcess] = useState<any>([]);
  const [operationCardNextProductProcessDepartment, setOperationCardNextProductProcessDepartment] = useState<any>([]);
  const [operationCardProductCategory, setOperationCardProductCategory] = useState<any>([]);
  const [operationCardProduct, setOperationCardProduct] = useState<any>([]);
  const [operationCardNextProductCategory, setOperationCardNextProductCategory] = useState<any>([]);
  const [operationCardNextDesign, setOperationCardNextDesign] = useState<any>([]);
  const [operationCardNextDesignCodeType, setOperationCardNextDesignCodeType] = useState<any>([]);
  const [operationCardWorkerList, setOperationCardWorkerList] = useState<any>([]);

  const [operationCardMachine, setOperationCardMachine] = useState<any>([]);
  const [operationCardTone, setOperationCardTone] = useState<any>([]);
  const [lossReportList, setLossReportList] = useState<any>([]);
  const [salesOrderList, setSalesOrderList] = useState<any>([]);
  const [goldAccessoryTable, setGoldAccessoryTable] = useState<any>([]);
  const [carryForwardSalesOrder, setCarryForwardSalesOrder] = useState<any>([]);
  const [issueReference, setIssueReference] = useState<any>([]);
  const [validateInWeight, setValidateInWeight] = useState<any>('');
  const [validityForDesign, setValidityForDesign] = useState<any>('');
  const [designInputValue, setdesignInputValue] = useState<any>([]);
  // for bunch pop up
  const [bunchSalesOrderList, setbunchSalesOrderList] = useState<any>([]);
  // for Melting plan Reference from lot
  const [mpReferenceList, setMpReferenceList] = useState<any>([]);
  // sales order table according to single and bunch order
  const [selectedSingleOrderItems, setSelectedSingleOrderItems] = useState<string[]>([]);
  const [selectedBunchOrderItems, setSelectedBunchOrderItems] = useState<string[]>([]);
  const [isSingleHeaderChecked, setIsSingleHeaderChecked] = useState(false);
  const [isBunchHeaderChecked, setIsBunchHeaderChecked] = useState(false);
  const searchParams = useSearchParams();
  const search: any = searchParams.get('name');

  const handleHeaderSave = (label: any, selectedValue: any) => {
    if (label === 'karigar') {
      setHeaderSave({
        ...headerSave,
        [label]: selectedValue?.value,
      });
    } else if (label === 'quantity' || label === 'description') {
      setHeaderSave({
        ...headerSave,
        [label]: selectedValue,
      });
    } else {
      setHeaderSave({
        ...headerSave,
        [label]: selectedValue?.name,
      });
    }
  };
  const getCarryForwardSalesOrderList = async () => {
    try {
      const hrefValue = window.location.href;
      const operationCardName = hrefValue.split('=');
      const callCarryForwardSalesOrderAPI = await GETCarryForwardSalesOrder(operationCardName[1], token);

      console.log('API Response:', callCarryForwardSalesOrderAPI);

      if (callCarryForwardSalesOrderAPI?.status === 200) {
        const salesOrderList = callCarryForwardSalesOrderAPI?.data?.message;
        console.log('Sales Order List:', salesOrderList);

        if (Array.isArray(salesOrderList)) {
          setCarryForwardSalesOrder(salesOrderList);
          console.log('Updated State:', salesOrderList);
        } else {
          console.error('Sales order list is not an array:', salesOrderList);
        }
      } else {
        console.error('API call failed with status:', callCarryForwardSalesOrderAPI?.status);
      }
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  useEffect(() => {
    getCarryForwardSalesOrderList();
  }, []);
  // const operationCardDetail = async () => {
  //   const hrefValue = window.location.href;
  //   const splitVal = hrefValue.split('=');
  //   const operationCardDetailVal = await GETOperationCardDetail(splitVal[1], token);
  //   if (operationCardDetailVal?.status === 200 && Object.keys(operationCardDetailVal?.data?.data)?.length > 0) {
  //     setOperationCardDetailData(operationCardDetailVal?.data?.data);

  //     try {
  //       const hrefValue = window.location.href;
  //       const operationCardName = hrefValue.split('=');
  //       const callCarryForwardSalesOrderAPI = await GETCarryForwardSalesOrder(operationCardName[1], token);

  //       console.log('API Response:', callCarryForwardSalesOrderAPI);

  //       if (callCarryForwardSalesOrderAPI?.status === 200) {
  //         const salesOrderList = callCarryForwardSalesOrderAPI?.data?.message;
  //         console.log('Sales Order List:', salesOrderList);

  //         if (Array.isArray(salesOrderList)) {
  //           setCarryForwardSalesOrder(salesOrderList);
  //           setSalesOrderList(carryForwardSalesOrder);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error in API call:', error);
  //     }
  //     // setSalesOrderList(carryForwardSalesOrder);
  //     console.log('Updated States:', salesOrderList);
  //     // setSalesOrderList(carryForwardSalesOrder);
  //     // setSalesOrderList([...operationCardDetailVal?.data?.data?.operation_card_order_details]);
  //   } else {
  //     setOperationCardDetailData({});
  //     setSalesOrderList(carryForwardSalesOrder);
  //   }
  // };

  const handleMeltingLotShowOrder = () => {
    localStorage.setItem('meltingLotShowOrder', '1'); // Store value in localStorage
  };

  const operationCardDetail = async () => {
    const hrefValue = window.location.href;
    const splitVal = hrefValue.split('=');
    const operationCardDetailVal = await GETOperationCardDetail(splitVal[1], token);

    if (operationCardDetailVal?.status === 200 && Object.keys(operationCardDetailVal?.data?.data)?.length > 0) {
      setOperationCardDetailData(operationCardDetailVal?.data?.data);

      try {
        const hrefValue = window.location.href;
        const operationCardName = hrefValue.split('=');
        const callCarryForwardSalesOrderAPI = await GETCarryForwardSalesOrder(operationCardName[1], token);

        console.log('API Response:', callCarryForwardSalesOrderAPI);

        if (callCarryForwardSalesOrderAPI?.status === 200) {
          const salesOrderList = callCarryForwardSalesOrderAPI?.data?.message;
          console.log('Sales Order List:', salesOrderList);

          if (Array.isArray(salesOrderList)) {
            setCarryForwardSalesOrder(salesOrderList);
            setSalesOrderList(salesOrderList); // Use the value directly
          }
        }

        // const meltingLotShowOrder = localStorage.getItem('meltingLotShowOrder') || '';

        // Second API call to get melting lot sales order
        // const callMeltingLotSalesOrderAPI = await GETMeltingLotOPDetailSalesOrder(
        //   operationCardName[1],
        //   // meltingLotValue,
        //   meltingLotShowOrder,
        //   // meltingLotShowOrderRef.current, // Access the value from ref
        //   token
        // );

        // console.log('Melting Lot Sales Order API Response:', callMeltingLotSalesOrderAPI);

        // if (callMeltingLotSalesOrderAPI?.status === 200) {
        //   const meltingLotSalesOrderList = callMeltingLotSalesOrderAPI?.data?.message;

        //   if (Array.isArray(meltingLotSalesOrderList)) {
        //     // Combine the existing sales order list with the new melting lot sales order data
        //     // setSalesOrderList((prevSalesOrderList: any) => [...prevSalesOrderList, ...meltingLotSalesOrderList]);
        //     setSalesOrderList(meltingLotSalesOrderList);
        //   }
        // }
      } catch (error) {
        console.error('Error in API call:', error);
      }
      console.log('Updated States:', carryForwardSalesOrder);
    } else {
      setOperationCardDetailData({});
      setSalesOrderList([]); // Reset to empty array if no data
    }
  };
  console.log('Updated Melting Lot States:', salesOrderList);
  const getOperationCardProcessDepartment = async () => {
    const operationCardProductProcessDepartmentData = await GETOperationCardProductProcessDepartmentData(
      operationCardDetailData?.product_process_department,
      token
    );

    if (
      operationCardProductProcessDepartmentData?.status === 200 &&
      Object.keys(operationCardProductProcessDepartmentData?.data?.data)?.length > 0
    ) {
      setOperationCardProductDept(operationCardProductProcessDepartmentData?.data?.data);
      setHeaderSave({
        ...headerSave,
        karigar: operationCardDetailData?.karigar ?? '',
        quantity: operationCardDetailData?.quantity ?? '',
        machine: operationCardDetailData?.machine ?? '',
        tone: operationCardDetailData?.tone ?? '',
        product_category: operationCardDetailData?.product_category ?? '',
        description: operationCardDetailData?.description ?? '',
        loss_period: operationCardDetailData?.loss_period ?? '',
      });
      setOperationCardKarigarQuantitySettings({
        ...operationCardKarigarQuantitySettings,
        set_quantity: operationCardProductProcessDepartmentData?.data?.data?.set_quantity,
        set_karigar: operationCardProductProcessDepartmentData?.data?.data?.set_karigar,
        set_machine: operationCardProductProcessDepartmentData?.data?.data?.set_machine,
        set_tone: operationCardProductProcessDepartmentData?.data?.data?.set_tone,
        set_product_category: operationCardProductProcessDepartmentData?.data?.data?.set_product_category,
        set_loss_report: operationCardProductProcessDepartmentData?.data?.data?.set_loss_period,
      });
      const getUnrecoverableLossData = operationCardProductProcessDepartmentData?.data?.data?.issue_items?.filter(
        (item: any) => item?.item === 'Unrecoverable Loss'
      );
      const storeValueOfBalanceWeightAsInWeight = getUnrecoverableLossData[0]?.set_operation_card_balance_weight_as_in_weight;
      if (storeValueOfBalanceWeightAsInWeight) {
        setIsBalanceWeightAsInWeight(true);
        setBalanceWeight(operationCardDetailData?.balance_weight?.toFixed(3));
      } else {
        setIsBalanceWeightAsInWeight(false);
        setBalanceWeight('');
      }
    } else {
      setOperationCardProductDept({});
    }
  };

  const createGoldAccessoryTable = () => {
    const receiptSummationItems: any = {};
    const issueSummationItems: any = {};
    operationCardDetailData?.receipt_details
      ?.filter((receipt_data: any) => receipt_data?.item_type === 'Gold Accessory')
      ?.forEach((element: any) => {
        const key = element.item.toLowerCase(); // Convert the item to lowercase for case-insensitive grouping
        if (!receiptSummationItems[key]) {
          // If the key doesn't exist, create a new entry
          receiptSummationItems[key] = { ...element };
        } else {
          // If the key already exists, update the values by summing them
          receiptSummationItems[key].in_weight += element.in_weight;
          receiptSummationItems[key].in_gross_purity += element.in_gross_purity;
          receiptSummationItems[key].in_gross_weight += element.in_gross_weight;
          receiptSummationItems[key].in_fine_purity += element.in_fine_purity;
          receiptSummationItems[key].in_fine_weight += element.in_fine_weight;
        }
      });
    operationCardDetailData?.operation_card_issue_details
      ?.filter((issue_data: any) => issue_data?.item_type === 'Gold Accessory')
      ?.forEach((element: any) => {
        const key = element.item.toLowerCase(); // Convert the item to lowercase for case-insensitive grouping
        if (!issueSummationItems[key]) {
          // If the key doesn't exist, create a new entry
          issueSummationItems[key] = { ...element };
        } else {
          // If the key already exists, update the values by summing them
          issueSummationItems[key].in_weight += element.in_weight;
          issueSummationItems[key].in_gross_purity += element.in_gross_purity;
          issueSummationItems[key].in_gross_weight += element.in_gross_weight;
          issueSummationItems[key].in_fine_purity += element.in_fine_purity;
          issueSummationItems[key].in_fine_weight += element.in_fine_weight;
        }
      });

    const merged_array = Object.keys(receiptSummationItems).map((itemKey) => {
      const receiptItem = receiptSummationItems[itemKey];
      const issueItem = issueSummationItems[itemKey];

      return {
        item: receiptItem?.item,
        in_weight: (receiptItem ? receiptItem.in_weight : 0) - (issueItem ? issueItem.in_weight : 0),
        in_gross_purity: (receiptItem ? receiptItem.in_gross_purity : 0) - (issueItem ? issueItem.in_gross_purity : 0),
        in_gross_weight: (receiptItem ? receiptItem.in_gross_weight : 0) - (issueItem ? issueItem.in_gross_weight : 0),
        in_fine_purity: (receiptItem ? receiptItem.in_fine_purity : 0) - (issueItem ? issueItem.in_fine_purity : 0),
        in_fine_weight: (receiptItem ? receiptItem.in_fine_weight : 0) - (issueItem ? issueItem.in_fine_weight : 0),
      };
    });
    setGoldAccessoryTable([...merged_array]);
  };

  const getIssueReferenceAPICallFunc = async () => {
    const getIssueReferenceData = await OCIssueReferenceAPI(search, token);
    console.log('getIssueReferenceData component', getIssueReferenceData);
    if (getIssueReferenceData?.status === 200 && getIssueReferenceData?.data?.message?.length > 0) {
      setIssueReference([...getIssueReferenceData?.data?.message]);
    } else {
      setIssueReference([]);
    }
  };

  const getOperationCardDetailKarigar = async (next_ppd_data: any) => {
    // const getKarigarData = await GETOperationCardDetailKarigar();
    const getKarigarData = await GETOperationCardDetailKarigar(next_ppd_data, token);
    if (getKarigarData?.status === 200) {
      setOperationCardKarigar(
        getKarigarData?.data?.data?.map((karigar_obj: any) => ({
          name: karigar_obj?.name,
          value: karigar_obj?.karigar,
        }))
      );
    } else {
      setOperationCardKarigar([]);
    }
  };

  const getOperationCardDetailNextKarigarFunc = async (next_product_process_department_value: string) => {
    const getNextKarigarData = await GETOperationCardDetailNextKarigar(next_product_process_department_value, token);
    if (getNextKarigarData?.status === 200) {
      setOperationCardNextKarigar(
        getNextKarigarData?.data?.data?.map((karigar_obj: any) => ({
          name: karigar_obj?.name,
          value: karigar_obj?.karigar,
        }))
      );
    } else {
      setOperationCardNextKarigar([]);
    }
  };
  const getOperationCardDetailThicknessAPICall = async () => {
    const getThickness = await GETOperationCardDetailProcessThickness(operationCardDetailData?.product, token);
    if (getThickness?.status === 200) {
      setOperationCardThickness(
        getThickness?.data?.data?.map((thickness_obj: any) => ({
          name: thickness_obj?.name,
          value: thickness_obj?.thickness,
        }))
      );
    } else {
      setOperationCardThickness([]);
    }
  };

  const getOperationCardDetailVariantAPICall = async () => {
    const getVariantData = await GETOperationCardDetailProcessVariant(operationCardDetailData?.product, token);
    if (getVariantData?.status === 200) {
      setOperationCardVariant(
        getVariantData?.data?.data?.map((variant_data: any) => ({
          name: variant_data?.name,
          value: variant_data?.title,
        }))
      );
    } else {
      setOperationCardVariant([]);
    }
  };
  const getOperationCardDetailConceptAPIFunc = async () => {
    const getConceptData = await GETOperationCardDetailProcessConcept(operationCardDetailData?.product, token);
    if (getConceptData?.status === 200) {
      setOperationCardConcept(
        getConceptData?.data?.data?.map((concept_data: any) => ({
          name: concept_data?.name,
          value: concept_data?.name,
        }))
      );
    } else {
      setOperationCardConcept([]);
    }
  };
  const getOperationCardDetailMachineSizeAPICall = async () => {
    const getMachineSizeData = await GETOperationCardDetailMachineSize(operationCardDetailData?.product, token);
    if (getMachineSizeData?.status === 200) {
      setOperationCardMachineSize(
        getMachineSizeData?.data?.data?.map((machine_size_data: any) => ({
          name: machine_size_data?.name,
          value: machine_size_data?.name1,
        }))
      );
    } else {
      setOperationCardMachineSize([]);
    }
  };

  const getOperationCardDetailMachineAPICall = async () => {
    const getMachineData = await GETOperationCardDetailMachine(
      operationCardDetailData?.operation_department,
      operationCardDetailData?.product_process_department,

      token
    );

    if (getMachineData?.status === 200) {
      setOperationCardMachine(
        getMachineData?.data?.message?.map((machine_data: any) => ({
          name: machine_data?.name,
          value: machine_data?.machine_name,
        }))
      );
    } else {
      setOperationCardMachine([]);
    }
  };

  const getOperationCardDetailToneAPICall = async () => {
    const getToneData = await GETOperationCardDetailTone(token);
    if (getToneData?.status === 200) {
      setOperationCardTone(
        getToneData?.data?.data?.map((tone_data: any) => ({
          name: tone_data?.name,
          value: tone_data?.name,
        }))
      );
    } else {
      setOperationCardTone([]);
    }
  };

  const getOperationCardDetailDesignCodeCategoryAPICall = async () => {
    const getDesignCodeCategory = await GETProductProcessDesignCodeCategory(operationCardDetailData?.product, token);
    if (getDesignCodeCategory?.status === 200) {
      setOperationCardDesignCodeCategory(
        getDesignCodeCategory?.data?.data?.map((design_code_category_data: any) => ({
          name: design_code_category_data?.name,
          value: design_code_category_data?.title,
        }))
      );
    } else {
      setOperationCardDesignCodeCategory([]);
    }
  };
  const getOperationCardDetailDesignAPICall = async () => {
    const getDesign = await GETProductProcessDesign(operationCardDetailData?.product, token);
    if (getDesign?.status === 200) {
      setOperationCardNextDesign(
        getDesign?.data?.data?.map((design: any) => ({
          name: design?.name,
          value: design?.name,
        }))
      );
    } else {
      setOperationCardNextDesign([]);
    }
  };
  console.log('OperationCardNextDesigns', operationCardNextDesign);
  const getOperationCardDetailDesignCodeTypeAPICall = async () => {
    const getDesignCodeType = await GETProductProcessDesignCodeType(operationCardDetailData?.product, token);
    if (getDesignCodeType?.status === 200) {
      setOperationCardNextDesignCodeType(
        getDesignCodeType?.data?.data?.map((design: any) => ({
          name: design?.name,
          value: design?.title,
        }))
      );
    } else {
      setOperationCardNextDesignCodeType([]);
    }
  };

  const getOperationCardDetailNextProductProcessAPICallFunc = async () => {
    let getNextProductProcess: any;
    if (operationCardDetailData?.product === 'KA Chain' && operationCardDetailData?.operation_department === 'Copper') {
      getNextProductProcess = await GETOperationCardDetailNextProductProcess(
        operationCardDetailData?.product,
        operationCardDetailData?.process_sequence,
        token
      );
    } else {
      getNextProductProcess = await GETOperationCardDetailNextProductProcess(
        operationCardDetailData?.product,
        operationCardDetailData?.process_sequence + 1,
        token
      );
    }

    if (getNextProductProcess?.status === 200) {
      setOperationCardNextProductProcess(
        getNextProductProcess?.data?.data?.map((nextProductProcess: any) => ({
          name: nextProductProcess?.name,
          value: nextProductProcess?.title,
        }))
      );
    } else {
      setOperationCardNextProductProcess([]);
    }
  };

  const onChangeOfProductFetchNextProductProcess = async (product: any) => {
    const getNextProductProcess = await GETOperationCardDetailNextProductProcess(product, 1, token);
    if (getNextProductProcess?.status === 200) {
      setOperationCardNextProductProcess(
        getNextProductProcess?.data?.data?.map((nextProductProcess: any) => ({
          name: nextProductProcess?.name,
          value: nextProductProcess?.title,
        }))
      );
    } else {
      setOperationCardNextProductProcess([]);
    }
  };

  const getOperationCardDetailNextProductProcessDepartmentAPICallFunc = async () => {
    const getNextProductProcessDepartment = await GETOperationCardDetailNextProductProcessDepartment(
      operationCardDetailData?.product_process,
      token
    );
    if (getNextProductProcessDepartment?.status === 200) {
      setOperationCardNextProductProcessDepartment(
        getNextProductProcessDepartment?.data?.data?.map((machine_size_data: any) => ({
          name: machine_size_data?.name,
          value: machine_size_data?.title,
        }))
      );
    } else {
      setOperationCardNextProductProcessDepartment([]);
    }
  };

  const getOperationCardDetailProductAPICallFunc = async () => {
    const getProductDropDown = await GETOperationCardDetailProductData(token);
    if (getProductDropDown?.status === 200) {
      setOperationCardProduct(
        getProductDropDown?.data?.data?.map((product_data: any) => ({
          name: product_data?.name,
          value: product_data?.title,
        }))
      );
    } else {
      setOperationCardProduct([]);
    }
  };

  const getOperationCardProductCategory = async (product: any) => {
    const getNextProductCategory = await GETProductProcessProductCategory(product, token);
    if (getNextProductCategory?.status === 200) {
      setOperationCardProductCategory(
        getNextProductCategory?.data?.data?.map((product_category: any) => ({
          name: product_category?.name,
          value: product_category?.name,
        }))
      );
    } else {
      setOperationCardProductCategory([]);
    }
  };

  const getOperationCardDetailNextProductCategoryAPICallFunc = async () => {
    const getNextProductCategory = await GETProductProcessProductCategory(operationCardDetailData?.product, token);
    if (getNextProductCategory?.status === 200) {
      setOperationCardNextProductCategory(
        getNextProductCategory?.data?.data?.map((product_category: any) => ({
          name: product_category?.name,
          value: product_category?.name,
        }))
      );
    } else {
      setOperationCardNextProductCategory([]);
    }
  };

  const getOperationCardDetailWorkerAPICallFunc = async () => {
    const getWorkerList = await GETWorkerList(token, operationCardDetailData?.product_process_department);

    if (getWorkerList?.status === 200) {
      setOperationCardWorkerList(
        getWorkerList?.data?.data?.map((product_category: any) => ({
          name: product_category?.worker,
          value: product_category?.worker,
        }))
      );
    } else {
      setOperationCardWorkerList([]);
    }
  };

  const getOperationCardDetailLossReportList = async () => {
    const getLossReportListDataFromAPI = await GETLossPeriodList(token);
    if (getLossReportListDataFromAPI?.status === 200) {
      setLossReportList(
        getLossReportListDataFromAPI?.data?.data?.map((product_category: any) => ({
          name: product_category?.name,
          value: product_category?.name,
        }))
      );
    } else {
      setLossReportList([]);
    }
  };

  const handleOperationCardApproval = async () => {
    try {
      const ApproveOP = await POSTOperationCardApprove(search, token);
      if (ApproveOP.status === 200) {
        toast.success('Operation card approved ');
      } else {
        toast.error('Error approving operation card ');
      }
    } catch (error) {
      toast.error('Error approving operation card');
    }
  };

  // const getCarryForwardSalesOrderList = async () => {
  //   const hrefValue = window.location.href;
  //   const operationCardName = hrefValue.split('=');
  //   const callCarryForwardSalesOrderAPI = await GETCarryForwardSalesOrder(operationCardName[1], token);

  //   if (callCarryForwardSalesOrderAPI?.status === 200) {
  //     setCarryForwardSalesOrder([...callCarryForwardSalesOrderAPI?.data?.message]);

  //   }
  // };

  const getSalesOrder = async () => {
    const hrefValue = window.location.href;
    const operationCardName = hrefValue.split('=');
    const callSalesOrderAPI = await GETSalesOrderList(operationCardName[1], token);

    if (callSalesOrderAPI?.status === 200 && callSalesOrderAPI?.data?.message?.data?.length > 0) {
      setSalesOrderList([...callSalesOrderAPI?.data?.message?.data]);
      console.log('salesOrderList', salesOrderList);
    } else if (
      // operationCardDetailData?.opertion_card_order_details &&
      // operationCardDetailData?.opertion_card_order_details?.length > 0
      carryForwardSalesOrder?.length > 0
    ) {
      // setSalesOrderList([...operationCardDetailData?.opertion_card_order_details]);
      // const callCarryForwardSalesOrderAPI = await GETCarryForwardSalesOrder(operationCardName[1], token);

      // if (callCarryForwardSalesOrderAPI?.status === 200) {
      setSalesOrderList([...carryForwardSalesOrder]);

      // }
    } else {
      setSalesOrderList([]);
      toast.error('No data found');
    }
  };

  // Handle changes in customer field
  const handleCustomerChange = (order_id: any, value: any) => {
    const updatedList = salesOrderList?.map((order: any) => {
      if (order?.order_id === order_id) {
        return { ...order, customer: value };
      }
      return order;
    });
    setSalesOrderList(updatedList);
  };

  // const HandleSalesOrderSave = async () => {
  //   console.log('updated sales order list', salesOrderList);
  //   let transformedDataList: any[] = [];

  //   salesOrderList.forEach((order: any) => {
  //     if (order.qty_size_list && order.qty_size_list.length > 0) {
  //       order.qty_size_list.forEach((qtyItem: any) => {
  //         let newOrder = {
  //           order_id: order.order_id,
  //           sales_order: order.sales_order,
  //           customer: order.customer ?? '',
  //           item: order.item,
  //           item_name: order.item_name,
  //           size: qtyItem.size,
  //           production_qty: qtyItem.production_qty,
  //           ready_qty: qtyItem.production_qty,
  //           soisd_item: qtyItem.soisd_item,
  //           is_bunch: qtyItem.is_bunch,
  //           order_weight: qtyItem.order_weight,
  //           estimate_bunch_weight: qtyItem.estimate_bunch_weight,
  //         };
  //         transformedDataList.push(newOrder);
  //       });
  //     } else {
  //       let newOrder = {
  //         order_id: order.order_id,
  //         sales_order: order.sales_order,
  //         customer: order.customer ?? '',
  //         item: order.item,
  //         item_name: order.item_name,
  //         size: null,
  //         production_qty: null,
  //         ready_qty: null,
  //         soisd_item: null,
  //       };
  //       transformedDataList.push(newOrder);
  //     }
  //   });

  //   console.log(transformedDataList);

  //   try {
  //     const updatedData = await UpdateSalesOrderAPI(transformedDataList, operationCardDetailData?.name, token);
  //     if (updatedData?.status === 200) {
  //       toast.success('Sales order updated successfully');
  //     }
  //   } catch (error) {
  //     toast.error('Failed to update sales order');
  //   }
  // };

  const singleOrdersWithItems = salesOrderList
    .map((order: any) => ({
      ...order,
      qty_size_list: order.qty_size_list.filter((sizeItem: any) => sizeItem.is_bunch === 0),
    }))
    .filter((order: any) => order.qty_size_list.length > 0); // Ensure at least one item is included

  // Log the filtered bunch orders with items
  console.log('singleOrdersWithItems', singleOrdersWithItems);

  const bunchOrdersWithItems = salesOrderList
    .map((order: any) => ({
      ...order,
      qty_size_list: order.qty_size_list.filter((sizeItem: any) => sizeItem.is_bunch === 1),
    }))
    .filter((order: any) => order.qty_size_list.length > 0); // Ensure at least one item is included

  // Log the filtered bunch orders with items
  console.log('bunchOrdersWithItems', bunchOrdersWithItems);

  const handleSalesOrderHeaderCheckboxChange = (type: any, checked: any) => {
    if (type === 'single') {
      const newSelectedSingleOrders = checked ? singleOrdersWithItems?.map((order: any) => order.order_id) : [];
      setSelectedSingleOrderItems(newSelectedSingleOrders);
      setIsSingleHeaderChecked(checked);
    } else if (type === 'bunch') {
      const newSelectedBunchOrders = checked ? bunchOrdersWithItems?.map((order: any) => order.order_id) : [];
      setSelectedBunchOrderItems(newSelectedBunchOrders);
      setIsBunchHeaderChecked(checked);
    }
  };

  const handleSalesOrderCheckboxChange = (itemId: string, isBunchTable: boolean) => {
    if (isBunchTable) {
      const isChecked = selectedBunchOrderItems.includes(itemId);
      if (isChecked) {
        setSelectedBunchOrderItems(selectedBunchOrderItems.filter((item) => item !== itemId));
      } else {
        setSelectedBunchOrderItems([...selectedBunchOrderItems, itemId]);
      }
    } else {
      const isChecked = selectedSingleOrderItems.includes(itemId);
      if (isChecked) {
        setSelectedSingleOrderItems(selectedSingleOrderItems.filter((item) => item !== itemId && isBunchTable));
      } else {
        setSelectedSingleOrderItems([...selectedSingleOrderItems, itemId]);
      }
    }
  };

  const handleSalesOrderDeleteSelectedItems = () => {
    const updatedData = salesOrderList.filter(
      (item: any) => !selectedSingleOrderItems.includes(item.order_id) && !selectedBunchOrderItems.includes(item.order_id)
    );

    setSalesOrderList(updatedData);
    setSelectedSingleOrderItems([]);
    setSelectedBunchOrderItems([]);
    // setIsHeaderCheckboxChecked(false);
  };

  const HandleSalesOrderSave = async () => {
    // Combine the selected single and bunch order items
    const selectedOrderIds = [...selectedSingleOrderItems, ...selectedBunchOrderItems];
    console.log('selectedOrderIds', selectedOrderIds);

    // Filter the salesOrderList to include only the selected orders
    const filteredSalesOrderList = salesOrderList.filter((order: any) => selectedOrderIds.includes(order.order_id));

    console.log('filteredSalesOrderList', filteredSalesOrderList);

    let transformedDataList: any[] = [];

    filteredSalesOrderList?.forEach((order: any) => {
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
            ready_qty: qtyItem.ready_qty, // Ensure you are sending the correct ready_qty
            soisd_item: qtyItem.soisd_item,
            is_bunch: qtyItem.is_bunch,
          };
          transformedDataList.push(newOrder);
        });
      }
    });

    console.log('Data to be sent in POST API:', transformedDataList);

    try {
      const updatedData = await UpdateSalesOrderAPI(transformedDataList, operationCardDetailData?.name, token);
      if (updatedData?.status === 200) {
        toast.success('Sales order updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update sales order');
    }
  };

  const handleOperationCardSave = async () => {
    const filteredData = Object.fromEntries(Object.entries(headerSave).filter(([key, value]) => value !== ''));
    const saveOP = await POSTOperationCardSave(search, filteredData, token);
  };

  // Validation for in_weight input filed in modal
  const GETValidationInWeightField = async () => {
    const hrefValue = window.location.href;
    const operationCardName = hrefValue.split('=');
    const fetchValidationInWeight = await GETValidationInWeight(operationCardName[1], token);
    if (fetchValidationInWeight?.status === 200) {
      setValidateInWeight(fetchValidationInWeight?.data?.message);
    } else {
      setValidateInWeight('');
    }
  };

  const getValidationForDesign = async () => {
    const fetchValidationForDesign = await GETValidationForDesign(
      operationCardDetailData?.name,
      operationCardDetailData?.product_process_department,
      operationCardDetailData?.design || '',
      operationCardDetailData?.melting_lot,
      token
    );
    console.log('fetchValidationForDesign', fetchValidationForDesign);
    if (fetchValidationForDesign?.status === 200) {
      setValidityForDesign(fetchValidationForDesign?.data?.message?.message);
    } else {
      setValidityForDesign('');
    }
  };

  const getDesignInputField = async () => {
    const fetchDesignInputField = await GETDesignInputField(
      operationCardDetailData?.melting_lot,
      operationCardDetailData?.product_process_department,
      token
    );

    if (fetchDesignInputField?.status === 200) {
      setdesignInputValue(fetchDesignInputField?.data?.message);
    } else {
      setdesignInputValue([]);
    }
  };

  // for bunch pop up
  const getBunchSalesOrderList = async () => {
    const fetchBunchSalesOrder = await GETBunchSalesOrder(search, token);
    if (fetchBunchSalesOrder?.status === 200) {
      setbunchSalesOrderList(fetchBunchSalesOrder?.data?.message);
    } else {
      setbunchSalesOrderList([]);
    }
  };

  // MPReference Modal Data
  const getMPReferenceList = async () => {
    const fetchMPReferenceList = await GETMeltingPlanReferenceFromLot(operationCardDetailData?.melting_lot, token);
    if (fetchMPReferenceList?.status === 200) {
      setMpReferenceList(fetchMPReferenceList?.data?.message);
    } else {
      setMpReferenceList([]);
    }
  };

  useEffect(() => {
    getDesignInputField;
  }, [designInputValue]);

  const postSaveDesignInOP = async () => {
    try {
      const saveDesignInOP = await POSTDesignValue(search, designInputValue?.design, token);

      if (saveDesignInOP?.status === 200) {
        // window.location.reload();
      } else {
        // toast.error('Error approving operation card ');
      }
    } catch (error) {
      // toast.error('Error approving operation card');
    }
  };

  useEffect(() => {
    GETValidationInWeightField();
  }, []);

  useEffect(() => {
    if (balanceWeight !== '') {
      setModalFieldsState({ in_weight: balanceWeight });
    } else {
      setModalFieldsState({});
    }
  }, [balanceWeight]);

  useEffect(() => {
    operationCardDetail();
    getCarryForwardSalesOrderList();
  }, [search]);
  useEffect(() => {
    if (Object.keys(operationCardDetailData).length > 0) {
      getOperationCardProcessDepartment();
      getOperationCardDetailKarigar(operationCardDetailData?.product_process_department ?? '');
      getOperationCardDetailThicknessAPICall();
      getOperationCardDetailMachineSizeAPICall();
      getOperationCardDetailVariantAPICall();
      getOperationCardDetailConceptAPIFunc();
      getOperationCardDetailLossReportList();

      getOperationCardDetailNextKarigarFunc(operationCardDetailData?.next_product_process_department);
      getOperationCardDetailNextProductProcessAPICallFunc();

      getOperationCardDetailNextProductProcessDepartmentAPICallFunc();

      getOperationCardDetailDesignCodeCategoryAPICall();

      getOperationCardDetailDesignAPICall();

      getOperationCardDetailProductAPICallFunc();

      getOperationCardDetailDesignCodeTypeAPICall();

      getOperationCardProductCategory(operationCardDetailData?.product);
      getOperationCardDetailNextProductCategoryAPICallFunc();
      getOperationCardDetailWorkerAPICallFunc();

      getOperationCardDetailMachineAPICall();
      getOperationCardDetailToneAPICall();
      createGoldAccessoryTable();

      getIssueReferenceAPICallFunc();
      GETValidationInWeightField();
      getDesignInputField();
      getBunchSalesOrderList();
      getMPReferenceList();
    }
  }, [operationCardDetailData]);

  return {
    search,
    headerSave,
    handleHeaderSave,
    goldAccessoryTable,
    issueReference,
    handleOperationCardSave,
    operationCardDetail,
    getOperationCardDetailNextKarigarFunc,
    operationCardProductDept,
    operationCardDetailData,
    operationCardKarigar,
    operationCardNextKarigar,
    operationCardThickness,
    operationCardConcept,
    operationCardVariant,
    operationCardMachineSize,
    operationCardProduct,
    operationCardDesignCodeCategory,
    operationCardNextProductProcess,
    operationCardWorkerList,
    operationCardNextProductProcessDepartment,
    operationCardProductCategory,
    getOperationCardProductCategory,
    operationCardNextProductCategory,
    operationCardNextDesign,
    operationCardNextDesignCodeType,
    getOperationCardDetailNextProductProcessAPICallFunc,
    getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
    getOperationCardDetailDesignCodeCategoryAPICall,
    getOperationCardDetailDesignAPICall,
    getOperationCardDetailDesignCodeTypeAPICall,
    getOperationCardDetailNextProductCategoryAPICallFunc,
    operationCardKarigarQuantitySettings,
    getOperationCardDetailProductAPICallFunc,
    operationCardMachine,
    operationCardTone,
    lossReportList,
    isBalanceWeightSetAsInWeight,
    balanceWeight,
    modalFieldsState,
    onChangeOfProductFetchNextProductProcess,

    // Below variables are of Sales Order List
    salesOrderList,
    setSalesOrderList,
    getSalesOrder,
    HandleSalesOrderSave,
    handleOperationCardApproval,
    handleCustomerChange,
    handleMeltingLotShowOrder,
    validateInWeight,
    getValidationForDesign,
    validityForDesign,
    designInputValue,
    postSaveDesignInOP,
    bunchSalesOrderList,
    mpReferenceList,
    selectedSingleOrderItems,
    selectedBunchOrderItems,
    isSingleHeaderChecked,
    isBunchHeaderChecked,
    handleSalesOrderCheckboxChange,
    handleSalesOrderHeaderCheckboxChange,
    handleSalesOrderDeleteSelectedItems,
    // getOperationCardSellsOrder,
    // sellsOrderData,
    // setSellsOrderData,
    // handleSaveButtonClickSalesOrder,
  };
};

export default useOperationDetailCard;
