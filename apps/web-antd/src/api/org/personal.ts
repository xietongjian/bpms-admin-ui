import { requestClient } from '#/api/request';

// import qs from 'qs';
import { doDownload } from '#/utils/domUtils';

enum Api {
  PersonalPageList = '/flow/org/personal/getPagerModel',
  PersonalPageListShowRows = '/flow/org/prodPersonal/getPagerModelShowRoles',
  AllocationRoles = '/flow/org/personalRole/allocationRoles',
  SaveOrUpdate = '/flow/org/personal/saveOrUpdate',
  Delete = '/flow/org/personal/delete',
  SetLeaderCode = '/flow/org/personal/setLeaderCode',
  CheckEntityExist = '/flow/org/personal/checkEntityExist',
  GetByCodes = '/flow/org/personal/getByCodes',
  DeletePersonalRole = '/flow/org/personalRole/deletePersonalRole',
  SyncPersonalById = '/flow/sync/personal/syncPersonalById',
  SyncAllPersonal = '/flow/sync/personal/syncAllPersonal',
  DownSystemDataImportTemplate = '/flow/base/systemDataImport/downSystemDataImportTemplate',
  ImportPersonalExcelByData = '/flow/org/personal/importPersonalExcelByData',
}

export const getPersonalPageList = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  const showRoles = params.showRoles;
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['showRoles'];
  }
  const url = showRoles
    ? Api.PersonalPageListShowRows + `?showRoles=${showRoles}`
    : Api.PersonalPageList;
  const queryParam = { query, entity };
  return requestClient.post<any>(url, params);
};

export const saveOrUpdate = (params?: any) => requestClient.post({ url: Api.SaveOrUpdate, params });

export const importPersonalExcelByData = (params: any) =>
  requestClient.post(Api.ImportPersonalExcelByData, params );

// 下载Excel - 人员导入模板
export const downloadPersonalExcelTemplate = (params: any) => {
  //FIXME
  const comValue = {};//qs.stringify(params);

  const downUrl =
    import.meta.env.VITE_GLOB_API_URL + Api.DownSystemDataImportTemplate + '?' + comValue;

  doDownload(downUrl);

  return Promise.resolve('success');
};

export const allocationRoles = (params: any) =>
  requestClient.post(Api.AllocationRoles + '/' + params.personalId, params.roles );

export const deleteByIds = (params?: Array<string>) => requestClient.post({ url: Api.Delete, params });

export const deletePersonalRole = (params: any) =>
  requestClient.post( Api.DeletePersonalRole, params );

export const setLeaderCode = (params: any) =>
  requestClient.post(Api.SetLeaderCode + `/${params.leaderCode}/${params.id}` );

export const checkEntityExist = (params?: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params );

export const getByCodes = (params: Array<string>) => requestClient.post(Api.GetByCodes, params );

export const syncPersonalById = (params: any) =>
  requestClient.post(Api.SyncPersonalById + '/' + params.id,{}, { isReturnNativeResponse: true });

export const syncAllPersonal = () =>
  requestClient.post( Api.SyncAllPersonal ,{}, { isReturnNativeResponse: true });
