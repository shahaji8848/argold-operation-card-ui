import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailKarigar = async (
  product_process_department_value?: any
) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = [
    'name',
    'karigar',
    'product',
    'product_process_department',
  ];

  const filters: any = [
    ['is_chain', '=', `${product_process_department_value}`],
  ];
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Product?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getResponse: any = await callGetAPI(url);
  return getResponse;
};

export default GETOperationCardDetailKarigar;
