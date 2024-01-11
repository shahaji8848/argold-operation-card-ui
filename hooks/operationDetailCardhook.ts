import React, { useEffect, useState } from 'react';
import GETOperationCardDetail from '@/services/api/operation-card-detail-page/operation-card-detail-data';
import { useSearchParams } from 'next/navigation';
import GETOperationCardProductProcessDepartmentData from '@/services/api/operation-card-detail-page/operation-card-product-process-data';
import GETOperationCardDetailKarigar from '@/services/api/operation-card-detail-page/operation-card-detail-karigar';
const useOperationDetailCard = () => {
  const [operationCardProductDept, setOperationCardProductDept] = useState({});
  const [operationCardDetailData, setOperationCardDetailData] = useState<any>(
    {}
  );

  const [operationCardKarigar, setOperationCardKarigar] = useState<any>([]);

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
      setOperationCardKarigar(getKarigarData?.data?.data);
    } else {
      setOperationCardKarigar([]);
    }
  };

  useEffect(() => {
    operationCardDetail();
  }, []);
  useEffect(() => {
    if (Object.keys(operationCardDetailData).length > 0) {
      getOperationCardProcessDepartment();
      getOperationCardDetailKarigar();
    }
  }, [operationCardDetailData]);

  // useEffect(() => {
  //   getOperationCardDetailKarigar();
  // }, []);

  return {
    operationCardProductDept,
    operationCardDetailData,
    operationCardKarigar,
  };
};

export default useOperationDetailCard;
