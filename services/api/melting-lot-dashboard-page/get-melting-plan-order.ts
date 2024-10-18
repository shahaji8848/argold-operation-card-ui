import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingPlanOrders = async (melting_plan: any, combinationNameValue: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_plan.melting_plan_api.get_melting_plan_orders?melting_plan_name=${melting_plan}&combination_name=${combinationNameValue}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingPlanOrders;
