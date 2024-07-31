import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailProcessThickness = async (product: any, token: any) => {
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const fields: any = ['name', 'thickness', 'product', 'product_abbr'];

  const filters: any = [['product', '=', `${encodeURIComponent(product)}`]];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Thickness?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailProcessThickness;
