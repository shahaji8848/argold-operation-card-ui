import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETDepartmentFilters = async (product: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.operation_card.get_department_filters?product=${product}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export const GETProcessFilters = async (product: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.operation_card.get_process_filters?product=${product}`;

  const getAPIResponse: any = await callGetAPI(url, token);
  return getAPIResponse;
};

export default GETDepartmentFilters;
