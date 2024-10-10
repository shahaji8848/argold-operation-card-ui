import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETNextProcessAsPerTone = async (tone: any, product_process_dept: any, token: string) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_api.get_next_process?tone=${tone}&product_process_dept=${product_process_dept}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETNextProcessAsPerTone;
