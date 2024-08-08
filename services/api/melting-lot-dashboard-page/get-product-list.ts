import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETProductList = async (token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_lot.melting_lot_api.get_product_list`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETProductList;
