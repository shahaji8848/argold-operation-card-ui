import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardListData = async (
  searchparams: any,
  token: any,
  username?: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.operation_card.search_operation_card_details?${searchparams}&username=${username}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardListData;
