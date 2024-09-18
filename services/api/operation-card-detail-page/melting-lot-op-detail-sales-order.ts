import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETMeltingLotOPDetailSalesOrder = async (operation_card_name: any, show_orders: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.api.operation_card.show_orders_in_ocid?oc_name=${operation_card_name}&show_orders=${show_orders}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETMeltingLotOPDetailSalesOrder;
