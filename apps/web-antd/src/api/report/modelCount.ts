import { requestClient } from '#/api/request';

enum Api {
  GetModelPagerModel = '/flow/report/model/getModelPagerModel',
}

export const getModelPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    if (entity.deptId && entity.deptId.length > 0) {
      entity.deptId = entity.deptId[0].id;
    }
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetModelPagerModel, params);
};
