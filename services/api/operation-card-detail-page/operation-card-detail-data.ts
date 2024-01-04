import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardDetail = async (operation_card_number: string) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.STANDARD_API_PATH}/Operation Card/${operation_card_number}`;

  const getAPIResponse: any = await callGetAPI(url);
  return getAPIResponse;
};

export default GETOperationCardDetail;
