import { requestClient } from '#/api/request';
enum Api {
  GetPlatformConfigListByPage = '/flow/platform/config/getPagerModel',
  SaveOrUpdate = '/flow/platform/config/saveOrUpdate',
  Delete = '/flow/platform/config/delete',
  CheckEntityExist = '/flow/platform/config/checkEntityExist',
  GetPlatformConfigById = '/flow/platform/config/get',
}

export const getPlatformConfigListByPage = (params?: any) => {
  return requestClient.post<any>(Api.GetPlatformConfigListByPage, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});

export const getPlatformConfigById = (params: string) =>
  requestClient.post<any>(Api.GetPlatformConfigById, params);
