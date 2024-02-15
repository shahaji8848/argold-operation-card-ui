import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETReportLossItem = async (token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.get_balance_report_as_per_item_api`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETReportLossItem;
