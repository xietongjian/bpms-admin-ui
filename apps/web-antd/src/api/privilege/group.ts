import {requestClient} from '#/api/request';
enum Api {
  PageList = '/flow/privilege/group/getPagerModel',
  GetAllList = '/flow/privilege/group/getAll',
  SaveOrUpdate = '/flow/privilege/group/saveOrUpdate',
  AddUserGroups = '/flow/privilege/group/addUserGroups',
  DelGroupUsers = '/flow/privilege/group/delGroupUsers',
  AddGroupUsers = '/flow/privilege/group/addGroupUsers',
  GetUserGroupVoListByPager = '/flow/privilege/group/getUserGroupVoListByPager',
  GetUserGroupByGroupIdAndUserIdList = '/flow/privilege/group/getUserGroupByGroupIdAndUserIdList',
  Delete = '/flow/privilege/group/delete',
  CheckEntityExist = '/flow/privilege/group/checkEntityExist',
}

export const getGroupListByPage = (params: any) => {
  return requestClient.post<any>(Api.PageList, params);
};

export const getAllList = (params?: any) => {
  return requestClient.post<any>(Api.GetAllList, params);
};

export const saveOrUpdate = (params: any) =>
    requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const addUserGroups = (params: any) => {
  return requestClient.post<any>(Api.AddUserGroups + '/' + params.groupId, params.users, {responseReturn: 'body'});
};

export const addGroupUsers = (params: any) => {
  return requestClient.post<any>(Api.AddGroupUsers + '/' + params.groupId, params.users, {responseReturn: 'body'});
};

export const delGroupUsers = (params: any) => {
  return requestClient.post<any>(Api.DelGroupUsers + '/' + params.groupId, params.idList);
};

export const getUserGroupVoListByPager = (params: any) => {
  return requestClient.post<any>(Api.GetUserGroupVoListByPager, params);
};

export const getUserGroupByGroupIdAndUserIdList = (params: any) => {
  return requestClient.post<any>(Api.GetUserGroupByGroupIdAndUserIdList + '/' + params.groupId, params.userIdList);
};

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: "body"});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
