import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingButton = async (token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingButton;
