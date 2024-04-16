import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETLossPeriodList = async (token: any) => {
  const financial_year_fields: any = [['financial_year', 'LIKE', '2023 - 2024']];
  const fields: any = ['name'];
  console.log('fields', fields);

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Loss Period??filters=${JSON.stringify(
    financial_year_fields
  )}&fields=${JSON.stringify(fields)}`;

  // const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.STANDARD_API_PATH}/Loss%20Period?filters=[["financial_year","LIKE","2023%20-%202024"]]&fields=["name"]`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETLossPeriodList;
