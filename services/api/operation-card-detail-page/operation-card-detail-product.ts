import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailProductData = async () => {
  const fields: any = ['name', 'title'];

  const filters: any = [['is_chain', '=', 1]];
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Product?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getResponse: any = await callGetAPI(url);
  return getResponse;
};

export default GETOperationCardDetailProductData;
