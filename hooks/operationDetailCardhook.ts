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
const useOperationDetailCard = () => {
  const { token } = useSelector(get_access_token);

  const [
    operationCardKarigarQuantitySettings,
    setOperationCardKarigarQuantitySettings,
  ] = useState({});

  const [headerSave, setHeaderSave] = useState({
    karigar: '',
    quantity: '',
    machine: '',
    tone: '',
    product_category: '',
    description: '',
  });
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const [operationCardDetailData, setOperationCardDetailData] = useState<any>(
    {}
  );

  const [operationCardKarigar, setOperationCardKarigar] = useState<any>([]);
  const [operationCardNextKarigar, setOperationCardNextKarigar] = useState<any>(
    []
  );
  const [operationCardThickness, setOperationCardThickness] = useState<any>([]);
  const [operationCardVariant, setOperationCardVariant] = useState<any>([]);
  const [operationCardConcept, setOperationCardConcept] = useState<any>([]);
  const [operationCardMachineSize, setOperationCardMachineSize] = useState<any>(
    []
  );
  const [operationCardDesignCodeCategory, setOperationCardDesignCodeCategory] =
    useState<any>([]);
  const [operationCardNextProductProcess, setOperationCardNextProductProcess] =
    useState<any>([]);
  const [
    operationCardNextProductProcessDepartment,
    setOperationCardNextProductProcessDepartment,
  ] = useState<any>([]);
  const [operationCardProductCategory, setOperationCardProductCategory] =
    useState<any>([]);
  const [operationCardProduct, setOperationCardProduct] = useState<any>([]);
  const [
    operationCardNextProductCategory,
    setOperationCardNextProductCategory,
  ] = useState<any>([]);
  const [operationCardNextDesign, setOperationCardNextDesign] = useState<any>(
    []
  );
  const [operationCardNextDesignCodeType, setOperationCardNextDesignCodeType] =
    useState<any>([]);

  const [operationCardMachine, setOperationCardMachine] = useState<any>([]);
  const [operationCardTone, setOperationCardTone] = useState<any>([]);

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
    } else if (label === 'quantity') {
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
    console.log('search +', encodeURI(search));
    console.log('search +', window.location.href);
    const hrefValue = window.location.href;
    const splitVal = hrefValue.split('=');
    console.log('search + split', splitVal);
    const operationCardDetailVal = await GETOperationCardDetail(
      splitVal[1],
      token
    );
    if (
      operationCardDetailVal?.status === 200 &&
      Object.keys(operationCardDetailVal?.data?.data)?.length > 0
    ) {
      setOperationCardDetailData(operationCardDetailVal?.data?.data);
    } else {
      setOperationCardDetailData({});
    }
  };

  const getOperationCardProcessDepartment = async () => {
    const operationCardProductProcessDepartmentData =
      await GETOperationCardProductProcessDepartmentData(
        operationCardDetailData?.product_process_department,
        token
      );

    if (
      operationCardProductProcessDepartmentData?.status === 200 &&
      Object.keys(operationCardProductProcessDepartmentData?.data?.data)
        ?.length > 0
    ) {
      setOperationCardProductDept(
        operationCardProductProcessDepartmentData?.data?.data
      );
      setHeaderSave({
        ...headerSave,
        karigar: operationCardDetailData?.karigar ?? '',
        quantity: operationCardDetailData?.quantity ?? '',
        machine: operationCardDetailData?.machine ?? '',
        tone: operationCardDetailData?.tone ?? '',
        product_category: operationCardDetailData?.product_category ?? '',
      });
      setOperationCardKarigarQuantitySettings({
        ...operationCardKarigarQuantitySettings,
        set_quantity:
          operationCardProductProcessDepartmentData?.data?.data?.set_quantity,
        set_karigar:
          operationCardProductProcessDepartmentData?.data?.data?.set_karigar,
        set_machine:
          operationCardProductProcessDepartmentData?.data?.data?.set_machine,
        set_tone:
          operationCardProductProcessDepartmentData?.data?.data?.set_tone,
        set_product_category:
          operationCardProductProcessDepartmentData?.data?.data
            ?.set_product_category,
      });
    } else {
      setOperationCardProductDept({});
    }
  };

  const createGoldAccessoryTable = () => {
    const receiptSummationItems: any = {};
    const issueSummationItems: any = {};
    operationCardDetailData?.receipt_details
      ?.filter(
        (receipt_data: any) => receipt_data?.item_type === 'Gold Accessory'
      )
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
        in_weight:
          (receiptItem ? receiptItem.in_weight : 0) -
          (issueItem ? issueItem.in_weight : 0),
        in_gross_purity:
          (receiptItem ? receiptItem.in_gross_purity : 0) -
          (issueItem ? issueItem.in_gross_purity : 0),
        in_gross_weight:
          (receiptItem ? receiptItem.in_gross_weight : 0) -
          (issueItem ? issueItem.in_gross_weight : 0),
        in_fine_purity:
          (receiptItem ? receiptItem.in_fine_purity : 0) -
          (issueItem ? issueItem.in_fine_purity : 0),
        in_fine_weight:
          (receiptItem ? receiptItem.in_fine_weight : 0) -
          (issueItem ? issueItem.in_fine_weight : 0),
      };
    });
    setGoldAccessoryTable([...merged_array]);
  };

  const getIssueReferenceAPICallFunc = async () => {
    const getIssueReferenceData = await OCIssueReferenceAPI(search, token);
    console.log('getIssueReferenceData component', getIssueReferenceData);
    if (
      getIssueReferenceData?.status === 200 &&
      getIssueReferenceData?.data?.message?.length > 0
    ) {
      setIssueReference([...getIssueReferenceData?.data?.message]);
    } else {
      setIssueReference([]);
    }
  };

  const getOperationCardDetailKarigar = async (next_ppd_data: any) => {
    // const getKarigarData = await GETOperationCardDetailKarigar();
    const getKarigarData = await GETOperationCardDetailKarigar(
      next_ppd_data,
      token
    );
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

  const getOperationCardDetailNextKarigarFunc = async (
    next_product_process_department_value: string
  ) => {
    const getNextKarigarData = await GETOperationCardDetailNextKarigar(
      next_product_process_department_value,
      token
    );
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
    const getThickness = await GETOperationCardDetailProcessThickness(
      operationCardDetailData?.product,
      token
    );
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
    const getVariantData = await GETOperationCardDetailProcessVariant(
      operationCardDetailData?.product,
      token
    );
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
    const getConceptData = await GETOperationCardDetailProcessConcept(
      operationCardDetailData?.product,
      token
    );
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
    const getMachineSizeData = await GETOperationCardDetailMachineSize(
      operationCardDetailData?.product,
      token
    );
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
      operationCardDetailData?.product_process_department,
      token
    );
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
    const getDesignCodeCategory = await GETProductProcessDesignCodeCategory(
      operationCardDetailData?.product,
      token
    );
    if (getDesignCodeCategory?.status === 200) {
      setOperationCardDesignCodeCategory(
        getDesignCodeCategory?.data?.data?.map(
          (design_code_category_data: any) => ({
            name: design_code_category_data?.name,
            value: design_code_category_data?.title,
          })
        )
      );
    } else {
      setOperationCardDesignCodeCategory([]);
    }
  };
  const getOperationCardDetailDesignAPICall = async () => {
    const getDesign = await GETProductProcessDesign(
      operationCardDetailData?.product,
      token
    );
    if (getDesign?.status === 200) {
      setOperationCardNextDesign(
        getDesign?.data?.data?.map((design: any) => ({
          name: design?.name,
          value: design?.name1,
        }))
      );
    } else {
      setOperationCardNextDesign([]);
    }
  };
  const getOperationCardDetailDesignCodeTypeAPICall = async () => {
    const getDesignCodeType = await GETProductProcessDesignCodeType(
      operationCardDetailData?.product,
      token
    );
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
    const getNextProductProcess =
      await GETOperationCardDetailNextProductProcess(
        operationCardDetailData?.product,
        operationCardDetailData?.process_sequence + 1,
        token
      );
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

  const getOperationCardDetailNextProductProcessDepartmentAPICallFunc =
    async () => {
      const getNextProductProcessDepartment =
        await GETOperationCardDetailNextProductProcessDepartment(
          operationCardDetailData?.product_process,
          token
        );
      if (getNextProductProcessDepartment?.status === 200) {
        setOperationCardNextProductProcessDepartment(
          getNextProductProcessDepartment?.data?.data?.map(
            (machine_size_data: any) => ({
              name: machine_size_data?.name,
              value: machine_size_data?.title,
            })
          )
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

  const getOperationCardDetailNextProductCategoryAPICallFunc = async () => {
    const getNextProductCategory = await GETProductProcessProductCategory(
      operationCardDetailData?.product,
      token
    );
    if (getNextProductCategory?.status === 200) {
      setOperationCardNextProductCategory(
        getNextProductCategory?.data?.data?.map((product_category: any) => ({
          name: product_category?.name,
          value: product_category?.name1,
        }))
      );
    } else {
      setOperationCardNextProductCategory([]);
    }
  };

  const handleOperationCardSave = async () => {
    const filteredData = Object.fromEntries(
      Object.entries(headerSave).filter(([key, value]) => value !== '')
    );

    console.log('save', filteredData);
    const saveOP = await POSTOperationCardSave(search, filteredData, token);
  };

  useEffect(() => {
    operationCardDetail();
  }, [search]);
  useEffect(() => {
    if (Object.keys(operationCardDetailData).length > 0) {
      getOperationCardProcessDepartment();
      getOperationCardDetailKarigar(
        operationCardDetailData?.product_process_department ?? ''
      );
      getOperationCardDetailThicknessAPICall();
      getOperationCardDetailMachineSizeAPICall();
      getOperationCardDetailVariantAPICall();
      getOperationCardDetailConceptAPIFunc();

      getOperationCardDetailNextKarigarFunc(
        operationCardDetailData?.next_product_process_department
      );
      getOperationCardDetailNextProductProcessAPICallFunc();

      getOperationCardDetailNextProductProcessDepartmentAPICallFunc();

      getOperationCardDetailDesignCodeCategoryAPICall();

      getOperationCardDetailDesignAPICall();

      getOperationCardDetailProductAPICallFunc();

      getOperationCardDetailDesignCodeTypeAPICall();

      getOperationCardDetailNextProductCategoryAPICallFunc();

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
    operationCardNextProductProcessDepartment,
    operationCardProductCategory,
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
  };
};

export default useOperationDetailCard;
