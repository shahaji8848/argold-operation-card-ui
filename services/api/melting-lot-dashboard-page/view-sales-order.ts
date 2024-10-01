import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETViewSalesOrder = async (product: any, purity: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_plan.melting_plan_api.show_pending_sales_orders_base_on_product_and_purity?product=${product}&purity=${purity}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETViewSalesOrder;
