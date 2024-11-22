import { defHttp } from '@/utils/http/axios';
import { DeptInfo } from './model/deptModel';
import {
  PersonalLeaderParam,
  PersonalListGetResultModel,
  PersonalRoleDeleteParam,
} from './model/personalModel';
import { BasicPageSearchParams, CheckExistParams } from '#/api/model/baseModel';
import qs from 'qs';
import { doDownload } from '@/utils/domUtils';

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
  const queryParam = { query, entity } as BasicPageSearchParams<any>;
  return defHttp.post<PersonalListGetResultModel>({ url, params: queryParam });
};

export const saveOrUpdate = (params?: DeptInfo) => defHttp.post({ url: Api.SaveOrUpdate, params });

export const importPersonalExcelByData = (params: any) =>
  defHttp.post({ url: Api.ImportPersonalExcelByData, params });

// 下载Excel - 人员导入模板
export const downloadPersonalExcelTemplate = (params: any) => {
  const comValue = qs.stringify(params);

  const downUrl =
    import.meta.env.VITE_GLOB_API_URL + Api.DownSystemDataImportTemplate + '?' + comValue;

  doDownload(downUrl);

  return Promise.resolve('success');
};

export const allocationRoles = (params: any) =>
  defHttp.post({ url: Api.AllocationRoles + '/' + params.personalId, params: params.roles });

export const deleteByIds = (params?: Array<string>) => defHttp.post({ url: Api.Delete, params });

export const deletePersonalRole = (params: PersonalRoleDeleteParam) =>
  defHttp.post({ url: Api.DeletePersonalRole, params });

export const setLeaderCode = (params: PersonalLeaderParam) =>
  defHttp.post({ url: Api.SetLeaderCode + `/${params.leaderCode}/${params.id}` });

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

export const getByCodes = (params: Array<string>) => defHttp.post({ url: Api.GetByCodes, params });

export const syncPersonalById = (params: any) =>
  defHttp.post({ url: Api.SyncPersonalById + '/' + params.id }, { isReturnNativeResponse: true });

export const syncAllPersonal = () =>
  defHttp.post({ url: Api.SyncAllPersonal }, { isReturnNativeResponse: true });
