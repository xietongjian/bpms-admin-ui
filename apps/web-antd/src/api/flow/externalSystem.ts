import { requestClient } from '#/api/request';

enum Api {
  GetAllExternalSystem = '/flow/external/system/getAll',
  PagerExternalSystem = '/flow/external/system/getPagerModel',
  DeleteExternalSystemById = '/flow/external/system/deleteById/',
  SaveOrUpdateExternalSystem = '/flow/external/system/saveOrUpdate',
  GetSystemDetailsById = '/flow/external/system/getById/',
}

export function getAllExternalSystem() {
  return requestClient.post(Api.GetAllExternalSystem);
}

export function pagerExternalSystem(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity.pageNum;
    delete entity.pageSize;
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.PagerExternalSystem, queryParam);
}

export function deleteExternalSystemById(id: number) {
  return requestClient.post(Api.DeleteExternalSystemById + id, {});
}

export function saveOrUpdateExternalSystem(params: any) {
  return requestClient.post(Api.SaveOrUpdateExternalSystem, params);
}

export function getSystemDetailsById(id: number) {
  return requestClient.post(Api.GetSystemDetailsById + id);
}
