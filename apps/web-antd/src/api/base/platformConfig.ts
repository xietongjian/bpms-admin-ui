import { requestClient } from '#/api/request';


enum Api {
  GetPlatformConfigListByPage = '/flow/platform/config/getPagerModel',
  SaveOrUpdate = '/flow/platform/config/saveOrUpdate',
  Delete = '/flow/platform/config/delete',
  CheckEntityExist = '/flow/platform/config/checkEntityExist',
}

export const getPlatformConfigListByPage = (params?: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPlatformConfigListByPage, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {isTransformResponse: false});
