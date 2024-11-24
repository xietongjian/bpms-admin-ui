import { defHttp } from '@/utils/http/axios';
import { BasicPageSearchParams } from '@/api/model/baseModel';

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

  const queryParam = { query, entity } as BasicPageSearchParams<any>;
  return defHttp.post<any>({ url: Api.LoginLogPageList, params: queryParam });
};

export const saveOrUpdate = (params: any) => defHttp.post<any>({ url: Api.SaveOrUpdate, params });

export const deleteByIds = (params: Array<string>) =>
  defHttp.post<any>({ url: Api.Delete, params });
