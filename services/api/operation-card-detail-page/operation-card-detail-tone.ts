import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailTone = async (token: string) => {
  const fields: any = ['name'];

  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Tone?fields=${JSON.stringify(fields)}&limit=None`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailTone;
