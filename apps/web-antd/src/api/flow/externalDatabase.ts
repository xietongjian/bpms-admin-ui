import { requestClient } from '#/api/request';

enum Api {
  GetAllExternalDatabase = '/flow/external/dbInfo/getAll',
  PagerExternalDatabase = '/flow/external/dbInfo/getPagerModel',
  SaveOrUpdateExternalDatabase = '/flow/external/dbInfo/saveOrUpdate',
  DeleteExternalDatabaseById = '/flow/external/dbInfo/deleteById/',
}

export function getAllExternalDatabase() {
  return requestClient.post(Api.GetAllExternalDatabase);
}

export function pagerExternalDatabase(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity.pageNum;
    delete entity.pageSize;
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.PagerExternalDatabase, queryParam);
}

export function deleteExternalDatabaseById(id: number) {
  return requestClient.post(Api.DeleteExternalDatabaseById + id, {});
}

export function saveOrUpdateExternalDatabase(params: any) {
  return requestClient.post(Api.SaveOrUpdateExternalDatabase, params);
}
