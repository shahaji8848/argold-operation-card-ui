import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETReportLossFactory = (token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Factory`;
  const getResponse = callGetAPI(url, token);
  return getResponse;
};

export default GETReportLossFactory;
