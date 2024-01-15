import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailProcessVariant = async (product?: any) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['name', 'product', 'title', 'product_abbr'];

  const filters: any = [['product', '=', `${product}`]];
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Variant?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getResponse: any = await callGetAPI(url);
  return getResponse;
};

export default GETOperationCardDetailProcessVariant;
