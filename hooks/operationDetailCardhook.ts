import { useEffect, useState } from 'react';
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
import POSTOperationCardApprove from '@/services/api/operation-card-detail-page/approval-api';
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
  const [issueReference, setIssueReference] = useState<any>([]);
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

  const operationCardDetail = async () => {
    const hrefValue = window.location.href;
    const splitVal = hrefValue.split('=');
    const operationCardDetailVal = await GETOperationCardDetail(splitVal[1], token);
    if (operationCardDetailVal?.status === 200 && Object.keys(operationCardDetailVal?.data?.data)?.length > 0) {
      setOperationCardDetailData(operationCardDetailVal?.data?.data);
      setSalesOrderList([...operationCardDetailVal?.data?.data?.operation_card_order_details]);
    } else {
      setOperationCardDetailData({});
    }
  };

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
    const getMachineData = await GETOperationCardDetailMachine(operationCardDetailData?.product_process_department, token);
    if (getMachineData?.status === 200) {
      setOperationCardMachine(
        getMachineData?.data?.data?.map((machine_data: any) => ({
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
    const getWorkerList = await GETWorkerList(token);
    if (getWorkerList?.status === 200) {
      setOperationCardWorkerList(
        getWorkerList?.data?.data?.map((product_category: any) => ({
          name: product_category?.name,
          value: product_category?.name,
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

  const getSalesOrder = async () => {
    const hrefValue = window.location.href;
    const operationCardName = hrefValue.split('=');
    const callSalesOrderAPI = await GETSalesOrderList(operationCardName[1], token);
    console.log('list sales ord', callSalesOrderAPI);
    if (callSalesOrderAPI?.status === 200 && callSalesOrderAPI?.data?.message?.data?.length > 0) {
      setSalesOrderList([...callSalesOrderAPI?.data?.message?.data]);
      console.log('salesOrderList', salesOrderList);
    } else if (
      operationCardDetailData?.opertion_card_order_details &&
      operationCardDetailData?.opertion_card_order_details?.length > 0
    ) {
      setSalesOrderList([...operationCardDetailData?.opertion_card_order_details]);
    } else {
      setSalesOrderList([]);
      toast.error('No data found');
    }
  };

  // Handle changes in customer field
  const handleCustomerChange = (soisd_item: any, value: any) => {
    const updatedList = salesOrderList?.map((order: any) => {
      if (order?.soisd_item === soisd_item) {
        return { ...order, customer: value };
      }
      return order;
    });
    setSalesOrderList(updatedList);
  };

  const handleUpdateSalesOrderListWithReadyQty = async () => {
    console.log('updated sales order list', salesOrderList);
    const dataToSend = salesOrderList.map((order: any) => ({
      ...order,
      customer: order.customer ?? '', // Ensure customer name is included
    }));
    try {
      const updatedData = await UpdateSalesOrderAPI(dataToSend, operationCardDetailData?.name, token);
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

  useEffect(() => {
    if (balanceWeight !== '') {
      setModalFieldsState({ in_weight: balanceWeight });
    } else {
      setModalFieldsState({});
    }
  }, [balanceWeight]);

  useEffect(() => {
    operationCardDetail();
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

    // Below variables are of Sales Order List
    salesOrderList,
    setSalesOrderList,
    getSalesOrder,
    handleUpdateSalesOrderListWithReadyQty,
    handleOperationCardApproval,
    handleCustomerChange,
    // getOperationCardSellsOrder,
    // sellsOrderData,
    // setSellsOrderData,
    // handleSaveButtonClickSalesOrder,
  };
};

export default useOperationDetailCard;
