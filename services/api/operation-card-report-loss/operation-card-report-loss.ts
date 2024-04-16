import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardReportLoss = async (
  financial_year: string | null,
  loss_period_name: string | null,
  factory: string | null,
  username: any,
  token: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.get_loss_by_department_group_api?financial_year=${financial_year}&loss_period=${loss_period_name}&factory=${factory}&username=${username}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardReportLoss;
