import { requestClient } from '#/api/request';
import {Base64} from 'js-base64';
import {listToTree} from "#/utils/helper/treeHelper";

enum Api {
  GetFormCategoryListData = '/flow/form/category/getCategories',
  GetFormTemplateList = '/flow/form/template/getPagerModel',
  SaveOrUpdate = '/flow/form/template/saveOrUpdate',
  Delete = '/flow/form/template/delete',
  CheckEntityExist = '/flow/form/template/checkEntityExist',
  CheckTemplateCategoryEntityExist = '/flow/form/category/checkEntityExist',
  UpdateStatusById = '/flow/form/template/updateStatusById',
  GetFormTemplateById = '/flow/form/template/getById',

  SaveOrUpdateFormCategory = '/flow/form/category/saveOrUpdate',
  DeleteFormCategoryById = '/flow/form/category/delete',
}

export const getFormCategoryListData = () => {
  return requestClient.post(Api.GetFormCategoryListData, {});
};

export const getFormCategoryTreeData = () => {
  return getFormCategoryListData().then(res => {
    const treeData = listToTree(res);
    return Promise.resolve(treeData);
  });
}

export const getFormTemplateList = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  const result = requestClient.post<any>(Api.GetFormTemplateList, params);
  return result;
};

export const saveOrUpdate = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.formJson = Base64.encode(params.formJson);
  return requestClient.post<any>( Api.SaveOrUpdate, params, {responseReturn: 'body'});
};

export const checkEntityExist = (params: CheckExistParams) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);


export const checkTemplateCategoryEntityExist = (params: CheckExistParams) =>
  requestClient.post<boolean>(Api.CheckTemplateCategoryEntityExist, params);

export const deleteById = (params: Array<string>) => requestClient.post<any>(Api.Delete, params);

export const updateStatusById = (id: string, status: string) =>
  requestClient.post( Api.UpdateStatusById, { id: id, status: status });

export const getFormTemplateById = (id: string) =>
  requestClient.get(Api.GetFormTemplateById + '/' + id );


export const saveOrUpdateFormCategory = (params: any) => requestClient.post( Api.SaveOrUpdateFormCategory, params ,{responseReturn: 'body'});

export const deleteFormCategoryById = (id: any) => requestClient.post(Api.DeleteFormCategoryById, [id], {responseReturn: 'body'});
