import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

export const OCIssueReferenceAPI = async (oc_name: string, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.operation_card.operation_card_issue_references?operation_card=${oc_name}`;

  const api_response = await callGetAPI(url, token);
  return api_response;
};
