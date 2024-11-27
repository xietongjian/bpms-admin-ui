import { requestClient } from '#/api/request';


enum Api {
  PageList = '/flow/log/sysOperRecord/getPagerModel',
  Delete = '/flow/log/sysOperRecord/delete',
}

export const getListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }

  return requestClient.post(Api.PageList, params);
};

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
