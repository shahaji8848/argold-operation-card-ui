import axios from 'axios';

export const CONSTANTS = {
  API_BASE_URL: 'https://staging1-arg-manufacturing.8848digitalerp.com/',
  // API_BASE_URL: 'https://erp.ar-gold.in',
  STANDARD_API_PATH: '/api/resource',
};

// live site token
// const TOKEN = 'token adf3e7caf953f16:bc1c3e88ad9f41d';

// staging site token
const TOKEN = 'token adf3e7caf953f16:b9df520620fca99';

export const callGetAPI = async (url: string) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      Authorization: TOKEN,
    },
  };
  await axios
    .get(`${url}`, {
      ...API_CONFIG,
      timeout: 5000,
    })
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
