// import axios from 'axios';
import { baseRequestClient } from '#/api/request';

/**
 * @description: user login api
 */
export function getIntegrationDoc(params: any) {
  return baseRequestClient.get(params.url, {withCredentials: true});
  /*return axios.get<any>(
      params.url,
      {
        method: 'get',
      }
  );*/
}
