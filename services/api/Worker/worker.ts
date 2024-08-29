import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETWorkerList = async (token: string, product_process_department: string) => {
  const fields: any = ['name', 'worker'];
  const encodedProductProcessDepartment = encodeURIComponent(product_process_department);
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Product%20Process%20Department%20Worker?filters=[["product_process_department", "=", "${encodedProductProcessDepartment}"]]&fields=${JSON.stringify(
    fields
  )}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETWorkerList;
