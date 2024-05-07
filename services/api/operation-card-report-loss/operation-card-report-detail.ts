import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardReportLossDetail = async (
  token: any,
  department_group: any,
  financial_year: any,
  loss_period: any,
  factory: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.get_loss_details_by_department_group_api?department_group=${department_group}&financial_year=${financial_year}&loss_period=${loss_period}&factory=${factory}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardReportLossDetail;
