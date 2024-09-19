import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const UpdateSalesOrderAPI = async (data_list: any, doc_name: any, token: any) => {
  const params = {
    data_list: data_list,
    doc_name: doc_name,
  };

  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  await axios
    .put(
      `${CONSTANTS.API_BASE_URL}api/method/custom_app.www.operation_card_entry.index.update_orders_operation_card`,
      params,
      config
    )
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};

export default UpdateSalesOrderAPI;
