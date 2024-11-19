import axios from 'axios';

export const CONSTANTS = {
  // API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  API_BASE_URL: 'https://staging1-arg-manufacturing.8848digitalerp.com/',
  STANDARD_API_PATH: 'api/resource',
  CUSTOM_API_PATH: 'api/method',
};

export const callGetAPI = async (url: string, token: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  await axios
    .get(`${url}`, {
      ...API_CONFIG,
      // timeout: 5000, this is commented because api take some good time in certain cases to return the response. So timeout wont work here.
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
export const callFormDataPOSTAPI = async (url: string, body: any, token: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  };
  await axios
    .post(`${url}`, body, {
      ...API_CONFIG,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = err;
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });

  return response;
};
