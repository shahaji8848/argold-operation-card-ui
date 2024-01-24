import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailNextProductProcessDepartment = async (
  product_process: any,
  token: any
) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['name', 'product_process', 'title', 'sequence'];

  const filters: any = [['product_process', '=', `${product_process}`]];
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Product Process Department?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailNextProductProcessDepartment;
