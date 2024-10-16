import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETProductProcessProductCategory = async (product: any, token: any) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['name', 'name1', 'product', 'product_abbr'];

  const filters: any = [
    ['product', '=', `${encodeURIComponent(product)}`],
    ['disable', '=', 0],
  ];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Product Category?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETProductProcessProductCategory;
