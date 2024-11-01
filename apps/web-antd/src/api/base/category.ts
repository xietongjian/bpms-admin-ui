import { requestClient } from '#/api/request';

enum Api {
  GetCategories = '/flow/base/category/getCategories',
  SaveOrUpdate = '/flow/base/category/saveOrUpdate',
  Delete = '/flow/base/category/delete',
  CheckEntityExist = '/flow/base/category/checkEntityExist',
}

export async function getCategories (params?: any){
  return requestClient.post<any>(Api.GetCategories, { ...params });
}
/*

export const saveOrUpdate = (params: any) => defHttp.post<any>({ url: Api.SaveOrUpdate, params });

export const checkEntityExist = (params: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

export const deleteByIds = (params: Array<string>) =>
  defHttp.post<any>({ url: Api.Delete, params });
*/
