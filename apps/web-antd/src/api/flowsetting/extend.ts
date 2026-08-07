import { requestClient } from '#/api/request';

enum Api {
  SaveOrUpdate = '/flow/flowable/activityMarker/saveOrUpdate',
  Delete = '/flow/flowable/activityMarker/deleteByIds',
  CheckEntityExist = '/flow/flowable/activityMarker/checkEntityExist',
  GetAllActivityMarker = '/flow/flowable/activityMarker/getAll',
  UpdateOrder = '/flow/flowable/activityMarker/updateOrder',
}

export const getActivityMarkerList = (params?: any) => {
  return requestClient.post(Api.GetAllActivityMarker, params || {});
};

export const saveActivityMarker = (params: any) => {
  return requestClient.post(Api.SaveOrUpdate, params);
};

export const deleteActivityMarker = (params: any) => {
  return requestClient.post(Api.Delete, Array.isArray(params?.id) ? params.id : [params?.id]);
};

export const updateActivityMarkerSort = (params: any) => {
  return requestClient.post(Api.UpdateOrder, params);
};

export const checkEntityExist = (params: any) => {
  return requestClient.post(Api.CheckEntityExist, params);
};
