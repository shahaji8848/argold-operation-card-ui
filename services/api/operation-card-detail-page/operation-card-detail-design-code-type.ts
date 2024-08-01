import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETProductProcessDesignCodeType = async (product: any, token: any) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['name', 'title', 'product', 'product_abbr'];

  const filters: any = [['product', '=', `${encodeURIComponent(product)}`]];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Design Code Type?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETProductProcessDesignCodeType;
