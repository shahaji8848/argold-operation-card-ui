import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETProductProcessDesignCodeCategory = async (product?: any) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['title', 'product', 'product_abbr'];

  const filters: any = [['product', '=', `${product}`]];
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Machine Size?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getResponse: any = await callGetAPI(url);
  return getResponse;
};

export default GETProductProcessDesignCodeCategory;
