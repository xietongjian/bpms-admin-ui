import { requestClient } from '#/api/request';

enum Api {
  AccountPageList = '/flow/privilege/user/getPagerModel',
  GetAllList = '/flow/privilege/user/getAll',
  SaveOrUpdate = '/flow/privilege/user/saveOrUpdate',
  AllocationRoles = '/flow/privilege/user/allocationRoles',
  Delete = '/flow/privilege/user/delete',
  SetPassword = '/flow/privilege/user/setPassword',
  CheckEntityExist = '/flow/privilege/user/checkEntityExist',
}

export const getAccountPageList = (params: any) => {
  return requestClient.post<any>(Api.AccountPageList, params );
};

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>( Api.CheckEntityExist, params );

export const getAllList = (params?: any) => {
  return requestClient.post<any>(Api.GetAllList, params );
};

export const saveOrUpdate = (params?: any) =>
  requestClient.post<any>( Api.SaveOrUpdate, params, { responseReturn: 'body' });

export const allocationRoles = (params: any) => {
  const userId = params.userId;
  delete params['userId'];
  return requestClient.post<any>(Api.AllocationRoles + '/' + userId, params.groups, {responseReturn: 'body'});
};

export const setPassword = (params: any) =>
  requestClient.post<any>(Api.SetPassword, params, { responseReturn: 'body' });

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params );
