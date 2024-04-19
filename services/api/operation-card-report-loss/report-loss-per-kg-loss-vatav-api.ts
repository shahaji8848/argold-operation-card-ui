import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETReportPerKgLossVatav = async (
  financial_year: string | null,
  loss_period_name: string | null,
  factory: string | null,
  //   username: any,
  token: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.total_per_kg_loss_for_vatav_api?financial_year=${financial_year}&loss_period=${loss_period_name}&factory=${factory}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETReportPerKgLossVatav;
