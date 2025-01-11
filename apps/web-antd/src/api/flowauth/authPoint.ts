import { requestClient } from '#/api/request';

enum Api {
  AuthPointPageList = '/flow/auth/authPoint/getPagerModel',
  SaveOrUpdate = '/flow/auth/authPoint/saveOrUpdate',
  Delete = '/flow/auth/authPoint/deleteById',
  CheckEntityExist = '/flow/auth/authPoint/checkEntityExist',
}

export const getAuthPointListByPage = (params: any) => {
  return requestClient.post<any>(Api.AuthPointPageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {isTransformResponse: false});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: any) =>
  requestClient.get(Api.Delete + '/' + params.id, {isTransformResponse: false});
