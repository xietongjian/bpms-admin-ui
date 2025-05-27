import { requestClient } from '#/api/request';

enum Api {
  CompanyTypeList = '/flow/org/companyType/getList',
  SaveOrUpdate = '/flow/org/companyType/saveOrUpdate',
  Delete = '/flow/org/companyType/delete',
  CheckEntityExist = '/flow/org/companyType/checkEntityExist',
}

export const getCompanyTypes = (params: any) => {
  return requestClient.post<any>(Api.CompanyTypeList, params);
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const deleteById = (params: any) =>
  requestClient.post<any>(Api.Delete + '/' + params.id, {}, {responseReturn: 'body'} );

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
