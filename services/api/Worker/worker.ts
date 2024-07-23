import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETWorkerList = async (token: string, product_process_department: string) => {
  const fields: any = ['name', 'worker'];

  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker?fields=${JSON.stringify(fields)}&limit=None`;
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker?filters=[["product_process_department", "=", "${product_process_department}"]]`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETWorkerList;
