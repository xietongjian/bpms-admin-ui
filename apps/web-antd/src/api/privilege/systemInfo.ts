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
  requestClient.post<any>(Api.SaveOrUpdateMySystem, params, {isTransformResponse: false});

export const saveUserSystemOrderNo = (params: any) =>
  requestClient.post<any>(Api.SaveUserSystemOrderNo, params, {isTransformResponse: false});

export const deleteMySystemById = (params: any) =>
  requestClient.post<any>(Api.DeleteMySystemById + '/' + params.id }, {isTransformResponse: false});

export const getAllSystemList = (params: any) => {
  return requestClient.post<any>(Api.GetAllSystem, params);
}
