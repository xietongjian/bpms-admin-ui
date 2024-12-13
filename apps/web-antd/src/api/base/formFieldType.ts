import { requestClient } from '#/api/request';

enum Api {
  GetAll = '/flow/form/fieldtype/getApps',
  PageList = '/flow/form/fieldtype/getPagerModel',
  SaveOrUpdate = '/flow/form/fieldtype/saveOrUpdate',
}

export const getAll = (params: any) => {
  return requestClient.post(Api.GetAll, params).then((res: any) => {
    res.forEach((item) => {
      item.label = item.name;
      item.value = item.sn;
    });
    return Promise.resolve(res);
  });
};

export const getListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.PageList, params: queryParam);
};

export const saveOrUpdate = (params: any) => requestClient.post(Api.SaveOrUpdate, params);
