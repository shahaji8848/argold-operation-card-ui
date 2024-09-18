import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETValidationInWeight = async (operation_card_name: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}api/method/custom_app.api.operation_card.validation_to_add_orders_in_ml?oc_name=${operation_card_name}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETValidationInWeight;
