import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETNextProcessAsPerTone = async (tone: any, token: string) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_api.get_next_process?tone=${tone}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETNextProcessAsPerTone;
