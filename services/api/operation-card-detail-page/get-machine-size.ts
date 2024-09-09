import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMachineSizeBasedOnDesignValue = async (design: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.machine_size.machine_size_api.get_machine_size?design=${design}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMachineSizeBasedOnDesignValue;
