import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETWorkerList = async (token: string) => {
  const fields: any = ['name', 'worker'];

  //staging1-arg-manufacturing.8848digitalerp.com/api/resource/Worker
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker?fields=${JSON.stringify(fields)}&limit=None`;
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Worker`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETWorkerList;
