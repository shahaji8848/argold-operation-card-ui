import { CONSTANTS, callFormDataPOSTAPI } from '../../config/api-config';

const POSTOperationCardApprove = async (operation_card_number: string, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_domestic_functions.set_weight_in_ocid_on_approve?doc_name=${operation_card_number}`;
  const getAPIResponse: any = await callFormDataPOSTAPI(url, {}, token);
  return getAPIResponse;
};

export default POSTOperationCardApprove;
