import { requestClient } from '#/api/request';


enum Api {
  GetMySystem = '/flow/privilege/userSystem/getAll',
  SaveOrUpdateMySystem = '/flow/privilege/userSystem/saveOrUpdate',
  DeleteMySystemById = '/flow/privilege/userSystem/delete',
  GetAllSystem = '/flow/privilege/systemInfo/getAll',
  SaveUserSystemOrderNo = '/flow/privilege/userSystem/saveUserSystemOrderNo',
}

export const getMySystemList = (params?: any) => {
  return requestClient.post<any>(Api.GetMySystem, params);
};

export const saveOrUpdateMySystem = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateMySystem, params, {responseReturn: 'body'});

export const saveUserSystemOrderNo = (params: any) =>
  requestClient.post<any>(Api.SaveUserSystemOrderNo, params, {responseReturn: 'body'});

export const deleteMySystemById = (params: any) =>
  requestClient.post<any>(Api.DeleteMySystemById + '/' + params.id }, {responseReturn: 'body'});

export const getAllSystemList = (params: any) => {
  return requestClient.post<any>(Api.GetAllSystem, params);
}
