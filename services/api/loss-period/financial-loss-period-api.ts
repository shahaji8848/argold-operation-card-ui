import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETAfterFinancialYear = async (token: any, selectedFinancialYear: any) => {
  const financial_year_fields: any = [['financial_year', 'LIKE', '2023 - 2024']];
  const fields: any = ['name'];
  console.log('fields', fields);
  console.log('selectedFinancialYear', selectedFinancialYear);
  //   const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Loss Period??filters=${JSON.stringify(
  //     selectedFinancialYear
  //   )}&fields=${JSON.stringify(fields)}`;
  const url = `${CONSTANTS.API_BASE_URL}${
    CONSTANTS.STANDARD_API_PATH
  }/Loss%20Period?filters=[["financial_year","LIKE",${JSON.stringify(selectedFinancialYear)}]]&fields=["name"]`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETAfterFinancialYear;
