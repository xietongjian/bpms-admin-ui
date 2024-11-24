import { defHttp } from '@/utils/http/axios';
import { BasicPageSearchParams } from '@/api/model/baseModel';

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
  const queryParam = { query, entity } as BasicPageSearchParams<any>;
  return defHttp.post<any>({ url: Api.GetModelPagerModel, params: queryParam });
};
