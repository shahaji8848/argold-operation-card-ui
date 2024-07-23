import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETOperationCardDetailMachine = async (product_process_department: string, operation_department: string, token: string) => {
  const fields: any = ['name', 'machine_name'];

  const filters: any = [['product_process_department', '=', `${product_process_department}`]];
  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Machine?fields=${JSON.stringify(
  //   fields
  // )}&filters=${JSON.stringify(filters)}&limit=None`;
  const encodedOperationDepartment = encodeURIComponent(operation_department);
  const encodedProductProcessDepartment = encodeURIComponent(product_process_department);
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.operation_card.get_machines?operation_department=${encodedProductProcessDepartment}&product_process_department=${encodedOperationDepartment}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETOperationCardDetailMachine;
