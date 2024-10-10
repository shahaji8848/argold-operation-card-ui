import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingPlanFilters = async (token: any, meltingPlanParams: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.melting_plan_dashboard.get_filters?melting_plan=${meltingPlanParams?.melting_plan}&lot_data=${meltingPlanParams?.lot_data}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingPlanFilters;
