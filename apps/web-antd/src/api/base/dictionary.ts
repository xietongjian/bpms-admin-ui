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
  return requestClient.post<any>(Api.DictionaryPageList, params);
};

export const dictionaryItemPageList = (params: any) => {
  return requestClient.post<any>(Api.DictionaryItemPageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: "body"});

export const saveOrUpdateItem = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateItem, params, {responseReturn: 'body'});

export const deleteByIds = (id: string) =>
  requestClient.post<any>(Api.Delete + '/' + id, {}, {responseReturn: "body"});

export const deleteItemByIds = (id: string) =>
  requestClient.post<any>(Api.DeleteItem + '/' + id, {}, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const checkDictItemEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckDictItemEntityExist, params);
