import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailMachine = async (product_process_department: string, token: string) => {
  const fields: any = ['name', 'machine_name'];

  const filters: any = [['product_process_department', '=', `${encodeURIComponent(product_process_department)}`]];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Machine?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailMachine;
