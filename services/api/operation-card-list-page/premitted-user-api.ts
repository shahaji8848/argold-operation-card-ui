import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETPremittedUserAPI = async (token: any, username?: any) => {
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_PATH}/custom_app.api.login.get_user_permmited_products?user=${username}`;

  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETPremittedUserAPI;
