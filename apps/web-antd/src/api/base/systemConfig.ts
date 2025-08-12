import { requestClient } from '#/api/request';

enum Api {
  SystemConfigPageList = '/flow/base/systemConfig/getPagerModel',
  GetAll = '/flow/base/systemConfig/getAll',
  SaveOrUpdate = '/flow/base/systemConfig/saveOrUpdate',
  Delete = '/flow/base/systemConfig/delete',
  GetSysConfigBySn = '/flow/base/systemConfig/getSysConfigBySn',
  CheckEntityExist = '/flow/base/systemConfig/checkEntityExist',
}

export const getSystemConfigListByPage = (params?: any) => {
  return requestClient.post<any>(Api.SystemConfigPageList, params);
};

export const getAll = (params?: any) => {
  return requestClient.get<any>(Api.GetAll, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);


export const getSysConfigBySn = (params: any) =>
    requestClient.get<any>(Api.GetSysConfigBySn, params);
