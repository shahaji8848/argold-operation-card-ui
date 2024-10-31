import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const POSTAddOrders = async (data_list: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  await axios
    .put(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.melting_plan_dashboard.add_pending_sales_orders_in_mp_ml_and_oc`,
      data_list,
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

export default POSTAddOrders;
