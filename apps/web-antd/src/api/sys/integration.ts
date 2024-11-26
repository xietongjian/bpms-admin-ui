import axios from 'axios';


/**
 * @description: user login api
 */
export function getIntegrationDoc(params: any) {
  return axios.get<any>(
      params.url,
      {
        method: 'get',
      }
  );
}
