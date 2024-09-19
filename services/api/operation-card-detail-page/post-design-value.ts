import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const POSTDesignValue = async (operation_card_number: any, design: any, token: any) => {
  //   const params = {
  //     design: design,
  //   };
  const formData: any = new FormData();
  formData.append('design', design);

  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  await axios
    .put(`${CONSTANTS.API_BASE_URL}/api/resource/Operation Card/${operation_card_number}`, formData, config)
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

export default POSTDesignValue;
