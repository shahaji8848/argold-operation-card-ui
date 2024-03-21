import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETSellsOrder = async (
  metinglot: any,
  design: any,
  operation_card_name: any,
  operation_department: any,
  token: any
) => {
  const fields: any = ['name'];

  const url = `${CONSTANTS.API_BASE_URL}api/method/custom_app.custom_app.doctype.operation_card.operation_card_utils.get_melting_lot_order_details?melting_lot=${metinglot}&design=${design}&operation_card_name=${operation_card_name}&operation_department=${operation_department}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETSellsOrder;
