import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETFinancialYear = async (token: any) => {
  const financial_year_fields: any = [['financial_year', 'LIKE', '2023 - 2024']];
  const fields: any = ['name'];

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Financial Year?fields=${JSON.stringify(fields)}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETFinancialYear;
