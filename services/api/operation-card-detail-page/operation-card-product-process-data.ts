import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardProductProcessDepartmentData = async (product_process_department_data: string, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.STANDARD_API_PATH}/Product Process Department/${product_process_department_data}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETOperationCardProductProcessDepartmentData;
