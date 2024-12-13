import { requestClient } from '#/api/request';

enum Api {
  GetMySystem = '/flow/privilege/userSystem/getAll',
  GetPagerModel = '/flow/privilege/systemInfo/getPagerModel',
  DeleteSystemById = '/flow/privilege/systemInfo/delete',
  SaveOrUpdateSystemInfo = '/flow/privilege/systemInfo/saveOrUpdate',
  SaveOrUpdateMySystem = '/flow/privilege/userSystem/saveOrUpdate',
  DeleteMySystemById = '/flow/privilege/userSystem/delete',
  GetAllSystem = '/flow/privilege/systemInfo/getAll',
  SaveUserSystemOrderNo = '/flow/privilege/userSystem/saveUserSystemOrderNo',
}

export const getMySystemList = (params?: any) => {
  return requestClient.post<any>(Api.GetMySystem, params);
};

export const getPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPagerModel, params);
};

export const saveOrUpdateMySystem = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateMySystem, params, {isTransformResponse: false});

export const saveOrUpdateSystemInfo = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateSystemInfo, params, {isTransformResponse: false});

export const saveUserSystemOrderNo = (params: any) =>
  requestClient.post<any>(Api.SaveUserSystemOrderNo, params, {isTransformResponse: false});

export const deleteMySystemById = (params: any) =>
  requestClient.post<any>(Api.DeleteMySystemById + '/' + params.id, {isTransformResponse: false});

export const deleteSystemById = (ids: any) =>
  requestClient.post<any>(Api.DeleteSystemById , ids, {isTransformResponse: false});

export const getAllSystemList = (params: any) => {
  return requestClient.post<any>(Api.GetAllSystem, params);
}
