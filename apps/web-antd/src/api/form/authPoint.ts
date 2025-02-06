import { requestClient } from '#/api/request';

enum Api {
  GetAll = '/flow/auth/authPoint/getAll',
  SaveOrUpdate = '/flow/base/app/saveOrUpdate',
  Delete = '/flow/base/app/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
}

export const getAll = (params?: any) => {
  return requestClient.get<any>(Api.GetAll, params).then((res: any) => {
    res.forEach((item) => {
      item.label = item.name;
      item.value = item.sn;
    });
    return Promise.resolve(res);
  });
};

export const saveOrUpdate = (params: any) => requestClient.post(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) => requestClient.post( Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
