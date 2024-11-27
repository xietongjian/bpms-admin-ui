import {requestClient} from '#/api/request';

enum Api {
  LoginLogPageList = '/flow/privilege/loginLog/getPagerModel',
  SaveOrUpdate = '/flow/privilege/loginLog/saveOrUpdate',
  Delete = '/flow/privilege/loginLog/delete',
}

export const getLoginLogListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }

  const queryParam = { query, entity };
  return requestClient.post<any>(Api.LoginLogPageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
