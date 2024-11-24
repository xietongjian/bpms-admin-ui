import { defHttp } from '@/utils/http/axios';

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

  return defHttp.post({ url: Api.PageList, params: { query, entity } });
};

export const deleteByIds = (params: Array<string>) =>
  defHttp.post<any>({ url: Api.Delete, params });
