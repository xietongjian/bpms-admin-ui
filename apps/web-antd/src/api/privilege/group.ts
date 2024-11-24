import {requestClient} from '#/api/request';


enum Api {
  PageList = '/flow/privilege/group/getPagerModel',
  GetAllList = '/flow/privilege/group/getAll',
  SaveOrUpdate = '/flow/privilege/group/saveOrUpdate',
  AddUserGroups = '/flow/privilege/group/addUserGroups',
  Delete = '/flow/privilege/group/delete',
  CheckEntityExist = '/flow/privilege/group/checkEntityExist',
}

export const getGroupListByPage = (params: any) => {
  return requestClient.post<any>(Api.PageList, params);
};

export const getAllList = (params?: any) => {
  return requestClient.post<any>(Api.GetAllList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const addUserGroups = (params: any) => {
  return requestClient.post<any>(Api.AddUserGroups + '/' + params.groupId, params.users);
};

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
