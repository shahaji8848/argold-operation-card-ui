import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

interface UserCredentials {
  usr: string;
  pwd: string;
}

export const GETLoginAPI = async (values: UserCredentials) => {
  let response;

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/argold_bom.sdk.api?version=v1&method=get_access_token&entity=access_token&usr=${values.usr}&pwd=${values.pwd}`
    )
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = err;
    });
  return response;
};
