import { requestClient } from '#/api/request';

enum Api {
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  Delete = '/flow/base/app/delete',
  GetAll = '/flow/base/app/getApps',
  PageList = '/flow/base/app/getPagerModel',
  RefreshSecretKey = '/flow/base/app/refreshSecretKey',
  SaveOrUpdate = '/flow/base/app/saveOrUpdate',
}

/**
 * 查询所有应用
 * @param params
 */
export async function getAll(params?: any) {
  return requestClient.post<any>(Api.GetAll, { ...params });
}

/**
 * 批量删除应用
 * @param data
 */
export async function deleteByIds(data: Array<string>) {
  return requestClient.post<any>(Api.Delete, data, { responseReturn: 'body' });
}

/**
 * 查询应用分页
 * @param params
 */
export async function getAppListByPage(params: any) {
  return requestClient.post<any>(Api.PageList, params);
}

export async function saveOrUpdate(params: any) {
  return requestClient.post<any>(Api.SaveOrUpdate, params, {
    responseReturn: 'body'
  });
}
export async function checkEntityExist(params: any) {
  return requestClient.post<any>(Api.CheckEntityExist, params);
}

/**
 * 更新应用密钥
 * @param params
 */
export async function refreshSecretKey (params: string) {
  return requestClient.post<string>(Api.RefreshSecretKey + '/' + params, {}, {responseReturn: 'body'});
}
