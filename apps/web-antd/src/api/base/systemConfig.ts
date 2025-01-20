import { requestClient } from '#/api/request';

enum Api {
  SystemConfigPageList = '/flow/base/systemConfig/getPagerModel',
  SaveOrUpdate = '/flow/base/systemConfig/saveOrUpdate',
  Delete = '/flow/base/systemConfig/delete',
  CheckEntityExist = '/flow/base/systemConfig/checkEntityExist',
}

export const getSystemConfigListByPage = (params?: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.SystemConfigPageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
