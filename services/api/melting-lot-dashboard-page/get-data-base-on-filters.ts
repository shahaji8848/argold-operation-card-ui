import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingPlanBasedOnFilters = async (design: any, product: any, machine_size: any, product_category: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.melting_plan_dashboard.get_data_base_on_filters?design=${design}&product=${product}&product_category=${product_category}&machine_size=${machine_size}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingPlanBasedOnFilters;
