import { requestClient } from '#/api/request';

import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  CompanyTypeList = '/flow/org/companyType/getList',
  SaveOrUpdate = '/flow/org/companyType/saveOrUpdate',
  Delete = '/flow/org/companyType/delete',
  CheckEntityExist = '/flow/org/companyType/checkEntityExist',
}

export const getCompanyTypes = (params?: any) => {
  return requestClient.post<any>({ url: Api.CompanyTypeList, params });
};

export const saveOrUpdate = (params?: CompanyTypeInfo) =>
  requestClient.post<CompanyTypeInfo>({ url: Api.SaveOrUpdate, params });

export const deleteByIds = (params?: Array<string>) =>
  requestClient.post<CompanyTypeInfo>({ url: Api.Delete, params });

export const deleteById = (params: any) =>
  requestClient.post<CompanyTypeInfo>({ url: Api.Delete + '/' + params.id });

export const checkEntityExist = (params?: CheckExistParams) =>
  requestClient.post<boolean>({ url: Api.CheckEntityExist, params });
