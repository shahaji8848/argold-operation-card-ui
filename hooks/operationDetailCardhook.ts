import React, { useEffect, useState } from 'react';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';
import { useSearchParams } from 'next/navigation';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import GETOperationCardDetailKarigar from '@/services/api/operation-card-detail-page/operation-card-detail-karigar';
import GETOperationCardDetailProcessThickness from '@/services/api/operation-card-detail-page/operation-card-detail-thickness';
import GETOperationCardDetailProcessVariant from '@/services/api/operation-card-detail-page/operation-card-detail-variant';
import GETOperationCardDetailMachineSize from '@/services/api/operation-card-detail-page/operation-card-detail-machine-size copy';
import GETProductProcessDesignCodeCategory from '@/services/api/operation-card-detail-page/operation-card-detail-design-code-category';
const useOperationDetailCard = () => {
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const [operationCardDetailData, setOperationCardDetailData] = useState<any>(
    {}
  );

  const [operationCardKarigar, setOperationCardKarigar] = useState<any>([]);
  const [operationCardThickness, setOperationCardThickness] = useState<any>([]);
  const [operationCardVariant, setOperationCardVariant] = useState<any>([]);
  const [operationCardMachineSize, setOperationCardMachineSize] = useState<any>(
    []
  );
  const [operationCardDesignCodeCategory, setOperationCardDesignCodeCategory] =
    useState<any>([]);

  const searchParams = useSearchParams();
  const search: any = searchParams.get('name');

  const operationCardDetail = async () => {
    const operationCardDetailVal = await GETOperationCardDetail(search);
    console.log(operationCardDetailData, 'data');
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
    const opeartionCardData =
      await GETOperationCardProductProcessDepartmentData(
        operationCardDetailData?.product_process_department
      );

    if (
      opeartionCardData?.status === 200 &&
      Object.keys(opeartionCardData?.data?.data)?.length > 0
    ) {
      setOperationCardProductDept(opeartionCardData?.data?.data);
    } else {
      setOperationCardProductDept({});
    }
  };

  const getOperationCardDetailKarigar = async () => {
    // const getKarigarData = await GETOperationCardDetailKarigar();
    const getKarigarData = await GETOperationCardDetailKarigar(
      operationCardDetailData?.product
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
      setOperationCardKarigar([]);
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
      setOperationCardVariant(getVariantData?.data?.data);
    } else {
      setOperationCardKarigar([]);
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
      setOperationCardKarigar([]);
    }
  };
  const getOperationCardDetailDesignCodeCategoryAPICall = async () => {
    const getKarigarData = await GETProductProcessDesignCodeCategory(
      operationCardDetailData?.product
    );
    if (getKarigarData?.status === 200) {
      setOperationCardDesignCodeCategory(getKarigarData?.data?.data);
    } else {
      setOperationCardKarigar([]);
    }
  };

  GETProductProcessDesignCodeCategory;

  useEffect(() => {
    operationCardDetail();
  }, []);
  useEffect(() => {
    if (Object.keys(operationCardDetailData).length > 0) {
      getOperationCardProcessDepartment();
      getOperationCardDetailKarigar();
      getOperationCardDetailThicknessAPICall();
      getOperationCardDetailMachineSizeAPICall();
      // getOperationCardDetailVariantAPICall();
      // getOperationCardDetailDesignCodeCategoryAPICall();
    }
  }, [operationCardDetailData]);

  // useEffect(() => {
  //   getOperationCardDetailKarigar();
  // }, []);

  return {
    search,
    operationCardProductDept,
    operationCardDetailData,
    operationCardKarigar,
    operationCardThickness,
    operationCardVariant,
    operationCardMachineSize,
    operationCardDesignCodeCategory,
  };
};

export default useOperationDetailCard;
