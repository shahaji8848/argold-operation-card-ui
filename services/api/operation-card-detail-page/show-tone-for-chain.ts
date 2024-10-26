import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETToneShowToneForChain = async (token: string) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_api.show_tone_for_chain`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETToneShowToneForChain;
