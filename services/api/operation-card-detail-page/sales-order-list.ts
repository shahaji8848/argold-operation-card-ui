import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETSalesOrderList = async (operation_card_name: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}api/method/custom_app.custom_app.doctype.operation_card.operation_card_api.get_melting_lot_order_details_from_op_details?operation_card_name=${operation_card_name}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETSalesOrderList;
