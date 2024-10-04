import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailCustomer = async (token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Customer Name?limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailCustomer;
