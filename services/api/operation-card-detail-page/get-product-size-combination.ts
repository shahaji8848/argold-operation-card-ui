import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETProductCategoryAndMachineSizeCombination = async (melting_lot: any, combination_id: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.operation_card.operation_card_utils.get_product_and_size_combination?melting_lot=${melting_lot}&combination_id=${combination_id}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETProductCategoryAndMachineSizeCombination;
