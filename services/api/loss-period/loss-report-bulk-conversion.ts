import { CONSTANTS, callFormDataPOSTAPI } from "@/services/config/api-config";

const POSTBulkConversion = async (loss_period: any, op_list: any, token: any) => {
  let url: string;

  url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.operation_card.operation_card_unrecoverable_loss.on_click_convert_to_unrecoverable_loss`;


  const formData: any = new FormData();
  formData.append('op_list', JSON.stringify(op_list));
  formData.append('loss_period', loss_period);
  const getAPIResponse: any = await callFormDataPOSTAPI(url, formData, token);
  return getAPIResponse;
};

export default POSTBulkConversion;
