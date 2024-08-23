import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETDesignInputField = async (melting_lot: any, product_process_department: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}api/method/custom_app.api.operation_card.auto_fill_design?melting_lot=${melting_lot}&product_process_department=${product_process_department}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETDesignInputField;
