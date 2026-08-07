import { requestClient } from '#/api/request';

enum Api {
  GetAllExternalApi = '/flow/external/api/getAll',
  PagerExternalApi = '/flow/external/api/getPagerModel',
  DeleteExternalApiById = '/flow/external/api/deleteById/',
  SaveOrUpdateExternalApi = '/flow/external/api/saveOrUpdate',
  GetApiById = '/flow/external/api/getById/',
}

export const getAllExternalApi = () => {
  return requestClient.post(Api.GetAllExternalApi);
};

export const pagerExternalApi = (params: any) => {
  return requestClient.post(Api.PagerExternalApi, params);
};

export const deleteExternalApi = (id: number) => {
  return requestClient.post(Api.DeleteExternalApiById + id, {});
};

export const saveOrUpdateExternalApi = (params: any) => {
  return requestClient.post(Api.SaveOrUpdateExternalApi, params);
};

export const getApiById = (id: number) => {
  return requestClient.post(Api.GetApiById + id);
};
