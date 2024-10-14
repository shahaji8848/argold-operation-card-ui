import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingPlanBasedOnFilters = async (
  product: any,
  product_category: any,
  machine_size: any,
  design: any,
  purity: any,
  token: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.melting_plan_dashboard.get_data_base_on_filters?design=${design}&product=${product}&product_category=${product_category}&machine_size=${machine_size}&purity=${purity}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingPlanBasedOnFilters;
