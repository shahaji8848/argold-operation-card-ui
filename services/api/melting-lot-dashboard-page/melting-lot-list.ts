import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingLotList = async ({ token, filterOptions }: any) => {
  const {
    productOption = '',
    categoryOption = '',
    machineSizeOption = '',
    designCodeOption = '',
    cuttingProcessOption = '',
    purityOption = '',
    statusOption = '',
    designOption = '',
  } = filterOptions;

  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_lot.melting_lot_api.get_melting_lot_list?product=${productOption}&product_category=${categoryOption}&machine_size=${machineSizeOption}&design_code=${designCodeOption}&cutting_process=${cuttingProcessOption}&purity=${purityOption}&status=${statusOption}&design=${designOption}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingLotList;
