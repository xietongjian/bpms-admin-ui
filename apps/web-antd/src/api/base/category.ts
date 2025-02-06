import { requestClient } from '#/api/request';
import {listToTree} from "#/utils/helper/treeHelper";

enum Api {
  GetFlowCategories = '/flow/base/category/getCategories',
  SaveOrUpdate = '/flow/base/category/saveOrUpdate',
  Delete = '/flow/base/category/delete',
  CheckEntityExist = '/flow/base/category/checkEntityExist',
}

export async function getFlowCategories (params = {}){
  return requestClient.post<any>(Api.GetFlowCategories, params);
}

export async function getFlowCategoryTreeData (params?: any){
  const categories = await getFlowCategories(params);
  categories.forEach(item => {
    item.label = item.name;
    item.value = item.code;
  });
  return listToTree(categories);
}

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});
