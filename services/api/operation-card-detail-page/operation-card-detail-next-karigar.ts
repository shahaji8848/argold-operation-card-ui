import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailNextKarigar = async (product_process_department_value: any, token: any) => {
  const fields: any = ['name', 'karigar', 'product', 'product_process_department'];

  const filters: any = [['product_process_department', '=', `${encodeURIComponent(product_process_department_value)}`]];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Product Process Department Karigar?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);

  return getResponse;
};

export default GETOperationCardDetailNextKarigar;
