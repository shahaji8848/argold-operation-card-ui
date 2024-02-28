import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardReportLossDetail = async (
  token: any,
  department_group: any,
  loss_period: any
) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card.get_loss_details_by_department_group_api?department_group=${department_group}&loss_period=${loss_period}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardReportLossDetail;
