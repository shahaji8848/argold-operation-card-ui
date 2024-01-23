import React, { useEffect, useState } from 'react';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';
import { useSearchParams } from 'next/navigation';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import GETOperationCardDetailKarigar from '@/services/api/operation-card-detail-page/operation-card-detail-karigar';
import GETOperationCardDetailProcessThickness from '@/services/api/operation-card-detail-page/operation-card-detail-thickness';
import GETOperationCardDetailProcessVariant from '@/services/api/operation-card-detail-page/operation-card-detail-variant';
import GETOperationCardDetailMachineSize from '@/services/api/operation-card-detail-page/operation-card-detail-machine-size copy';
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
const useOperationDetailCard = () => {
  const [
    operationCardKarigarQuantitySettings,
    setOperationCardKarigarQuantitySettings,
  ] = useState({});

  const [headerSave, setHeaderSave] = useState({ karigar: '', quantity: '' });
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

  const [goldAccessoryTable, setGoldAccessoryTable] = useState<any>([]);
  const [issueReference, setIssueReference] = useState<any>([]);

  const searchParams = useSearchParams();
  const search: any = searchParams.get('name');

  const handleHeaderSave = (label: any, value: any) => {
    console.log('handleHeaderSave', label, value);
    setHeaderSave({
      ...headerSave,
      [label]: value,
    });
  };

  const operationCardDetail = async () => {
    const operationCardDetailVal = await GETOperationCardDetail(search);
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
    const operationCardData =
      await GETOperationCardProductProcessDepartmentData(
        operationCardDetailData?.product_process_department
      );

    if (
      operationCardData?.status === 200 &&
      Object.keys(operationCardData?.data?.data)?.length > 0
    ) {
      setOperationCardProductDept(operationCardData?.data?.data);
      setOperationCardKarigarQuantitySettings({
        ...operationCardKarigarQuantitySettings,
        set_quantity: operationCardData?.data?.data?.set_quantity,
        set_karigar: operationCardData?.data?.data?.set_karigar,
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
    const getIssueReferenceData = await OCIssueReferenceAPI(search);
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
    const getKarigarData = await GETOperationCardDetailKarigar(next_ppd_data);
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
      next_product_process_department_value
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
      operationCardDetailData?.product
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
      operationCardDetailData?.product
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
      operationCardDetailData?.product
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
      operationCardDetailData?.product
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
  const getOperationCardDetailDesignCodeCategoryAPICall = async () => {
    const getDesignCodeCategory = await GETProductProcessDesignCodeCategory(
      operationCardDetailData?.product
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
      operationCardDetailData?.product
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
      operationCardDetailData?.product
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
        operationCardDetailData?.process_sequence + 1
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
          operationCardDetailData?.product_process
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
    const getProductDropDown = await GETOperationCardDetailProductData();
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
      operationCardDetailData?.product
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

    const saveOP = await POSTOperationCardSave(search, filteredData);
  };

  useEffect(() => {
    operationCardDetail();
  }, []);
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

      createGoldAccessoryTable();

      getIssueReferenceAPICallFunc();
    }
  }, [operationCardDetailData]);

  // useEffect(() => {
  //   getOperationCardDetailKarigar();
  // }, []);

  return {
    search,
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
  };
};

export default useOperationDetailCard;
