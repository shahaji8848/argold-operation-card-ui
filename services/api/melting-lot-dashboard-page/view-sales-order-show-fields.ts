import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETViewSalesOrderShowFields = async (token: any, melting_plan: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.melting_plan_dashboard.view_sales_orders_show_fields?melting_plan=${melting_plan}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETViewSalesOrderShowFields;
