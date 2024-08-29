import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETBunchSalesOrder = async (operation_card_name: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.operation_card.operation_card_api.get_bunch_orders?operation_card_name=${operation_card_name}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETBunchSalesOrder;
