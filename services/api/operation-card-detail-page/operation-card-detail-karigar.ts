import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailKarigar = async () => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Karigar`;
  const getResponse: any = await callGetAPI(url);
  return getResponse;
};

export default GETOperationCardDetailKarigar;
