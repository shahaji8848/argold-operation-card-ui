import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETProductFiltersForDesign = async (product: any, token: any) => {
  const fields: any = ['allow_multiple_designs_in_orders'];

  const filters: any = [['name', '=', product]];
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Product?fields=${JSON.stringify(
    fields
  )}&filters=${JSON.stringify(filters)}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETProductFiltersForDesign;
