import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingLotList = async ({ token, filterOptions, page_limit_start }: any) => {
  const {
    product = '',
    product_category = '',
    machine_size = '',
    design_code = '',
    cutting_process = '',
    status = '',
    purity = '',
    design = '',
    melting_lot = '',
    melting_plan = '',
    factory_design_name,
  } = filterOptions;

  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_lot.melting_lot_api.get_melting_lot_list?product=${product}&product_category=${product_category}&machine_size=${machine_size}&design_code=${design_code}&cutting_process=${cutting_process}&purity=${purity}&status=${status}&design=${design}&page_limit_start=${page_limit_start}&melting_lot=${melting_lot}&melting_plan=${melting_plan}&factory_design_name=${factory_design_name}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingLotList;
