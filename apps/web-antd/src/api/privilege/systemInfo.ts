import { defHttp } from '@/utils/http/axios';

enum Api {
  GetMySystem = '/flow/privilege/userSystem/getAll',
  SaveOrUpdateMySystem = '/flow/privilege/userSystem/saveOrUpdate',
  DeleteMySystemById = '/flow/privilege/userSystem/delete',
  GetAllSystem = '/flow/privilege/systemInfo/getAll',
  SaveUserSystemOrderNo = '/flow/privilege/userSystem/saveUserSystemOrderNo',
}

export const getMySystemList = (params?: any) => {
  return defHttp.post<any>({ url: Api.GetMySystem, params });
};

export const saveOrUpdateMySystem = (params: any) =>
  defHttp.post<any>({ url: Api.SaveOrUpdateMySystem, params }, {isTransformResponse: false});

export const saveUserSystemOrderNo = (params: any) =>
  defHttp.post<any>({ url: Api.SaveUserSystemOrderNo, params }, {isTransformResponse: false});

export const deleteMySystemById = (params: any) =>
  defHttp.post<any>({ url: Api.DeleteMySystemById + '/' + params.id }, {isTransformResponse: false});

export const getAllSystemList = (params: any) => {
  return defHttp.post<any>({ url: Api.GetAllSystem, params });
}
