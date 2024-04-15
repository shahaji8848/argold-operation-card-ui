import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETLossPeriodList = async (token: any) => {
  const fields: any = ['name'];
  console.log('fields', fields);

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Loss Period?fields=${JSON.stringify(fields)}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETLossPeriodList;
