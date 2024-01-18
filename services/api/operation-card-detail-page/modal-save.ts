import { CONSTANTS, callFormDataPOSTAPI } from '../../config/api-config';

const POSTModalData = async (operation_card_number: string, data: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.www.operation_card_entry.index.update_issue_operation_card`;

  const formData: any = new FormData();
  formData.append('doc_name', operation_card_number);
  formData.append('data_dict', JSON.stringify(data));
  const getAPIResponse: any = await callFormDataPOSTAPI(url, formData);
  console.log('next karigar api res', getAPIResponse);
  return getAPIResponse;
};

export default POSTModalData;
