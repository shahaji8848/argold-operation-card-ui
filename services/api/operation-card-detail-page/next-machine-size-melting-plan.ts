import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailNextMachineSizeMeltingPlan = async (melting_plan: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_fields_api.get_next_machine_size_list_based_on_melting_plan?melting_plan=${melting_plan}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailNextMachineSizeMeltingPlan;
