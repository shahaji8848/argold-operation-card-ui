import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETValidationForDesign = async (
  operation_card_name: any,
  product_process_department: any,
  design: any,
  melting_lot: any,
  token: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}api/method/custom_app.api.operation_card.validation_for_design?oc_name=${operation_card_name}&product_process_department=${product_process_department}&design=${design}&melting_lot=${melting_lot}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETValidationForDesign;
