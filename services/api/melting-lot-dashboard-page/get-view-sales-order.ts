import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingPlan = async ({ token, filterOptions }: any) => {
  const { product = '', purity = '', machine_size = '', design = '', cust_name = '', product_category = '' } = filterOptions;
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_plan.melting_plan_api.view_sales_order_filters?product=${product}&product_category=${product_category}&machine_size=${machine_size}&cust_name=${cust_name}&design=${design}&purity=${purity}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingPlan;
