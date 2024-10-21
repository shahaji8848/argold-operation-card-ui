import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const DELETESalesOrders = async (deletedItemsSoiNames: any, melting_plan: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
    params: {
      soi_names: JSON.stringify(deletedItemsSoiNames), // Sending the soi_name array as a query parameter
      melting_plan: melting_plan,
    },
  };
  await axios
    .delete(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.CUSTOM_API_PATH}/custom_app.custom_app.doctype.melting_plan.melting_plan_api.delete_sales_orders_from_melting_plan`,

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

export default DELETESalesOrders;
