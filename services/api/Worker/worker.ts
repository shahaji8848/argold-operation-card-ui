import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETWorkerList = async (token: string, product_process_department: string) => {
  const fields: any = ['name', 'worker'];
  const encodedProductProcessDepartment = encodeURIComponent(product_process_department);
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker?fields=${JSON.stringify(fields)}&limit=None`;
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker?filters=[["product_process_department", "=", "${encodedProductProcessDepartment}"]]`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETWorkerList;
