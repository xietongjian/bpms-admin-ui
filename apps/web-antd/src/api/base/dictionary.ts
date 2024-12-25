import { requestClient } from '#/api/request';

enum Api {
  DictionaryPageList = '/flow/base/dictionary/getPagerModel',
  DictionaryItemPageList = '/flow/base/dicItem/getPagerModel',
  SaveOrUpdate = '/flow/base/dictionary/saveOrUpdate',
  SaveOrUpdateItem = '/flow/base/dicItem/saveOrUpdate',
  Delete = '/flow/base/dictionary/delete',
  DeleteItem = '/flow/base/dicItem/delete',
  CheckEntityExist = '/flow/base/dictionary/checkEntityExist',
  CheckDictItemEntityExist = '/flow/base/dicItem/checkEntityExist',
}

export const dictionaryPageList = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.DictionaryPageList, params);
};
export const dictionaryItemPageList = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.DictionaryItemPageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const saveOrUpdateItem = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateItem, params);

export const deleteByIds = (params: string) => requestClient.post<any>(Api.Delete + '/', params);

export const deleteItemByIds = (params: string) =>
  requestClient.post<any>(Api.DeleteItem + '/', params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const checkDictItemEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckDictItemEntityExist, params);
