import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingFilters = async ({ token, filterOptions }: any) => {
  const {
    product = '',
    product_category = '',
    machine_size = '',
    design_code = '',
    cutting_process = '',
    status = '',
    purity = '',
    design = '',
  } = filterOptions;
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_lot.melting_lot_api.get_melting_filters?product=${product}&product_category=${product_category}&machine_size=${machine_size}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingFilters;
