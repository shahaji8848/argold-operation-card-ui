import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardReportLoss = async (
  loss_period_name: string,
  token: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.get_loss_by_department_group_api?loss_period=${loss_period_name}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardReportLoss;
