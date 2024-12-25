import { requestClient } from '#/api/request';

enum Api {
  GetFlowCategories = '/flow/base/category/getCategories',
  SaveOrUpdate = '/flow/base/category/saveOrUpdate',
  Delete = '/flow/base/category/delete',
  CheckEntityExist = '/flow/base/category/checkEntityExist',
}

export async function getFlowCategories (params?: any){
  return requestClient.post<any>(Api.GetFlowCategories, { ...params });
}

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
