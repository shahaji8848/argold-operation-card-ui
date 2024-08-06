import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETMeltingLotList = async ({
  token,
  productOption,
  categoryOption,
  machineSizeOption,
  designOption,
  cuttingProcessOption,
  purityOption,
  statusOption,
}: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_lot.melting_lot_api.get_melting_lot_list?product=${productOption}&product_category=${categoryOption}&machine_size=${machineSizeOption}&design=${designOption}&cutting_process=${cuttingProcessOption}&purity=${purityOption}&status=${statusOption}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETMeltingLotList;
