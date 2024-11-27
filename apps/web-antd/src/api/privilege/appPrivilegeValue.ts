import { requestClient } from '#/api/request';
enum Api {
  getAppPrivilegeValues = '/flow/privilege/pvalue/getAppPrivilegeValues',
  SaveOrUpdate = '/flow/privilege/pvalue/saveOrUpdate',
  Delete = '/flow/privilege/pvalue/delete',
  CheckEntityExist = '/flow/privilege/pvalue/checkEntityExist',
}

export const getAppPrivilegeValues = () => {
  const result = requestClient.post<any>(Api.getAppPrivilegeValues);
  return result;
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
