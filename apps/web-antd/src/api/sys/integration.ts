import { baseRequestClient } from '#/api/request';

/**
 * @description: user login api
 */
export function getIntegrationDoc(params: any) {
  return baseRequestClient.get(params.url, {baseURL: '', withCredentials: true});
}
