import { requestClient } from '#/api/request';

enum Api {
  GetReportDesignerPagerModel = '/flow/form/custom/formInfoSql/reportDesigner/getPagerModel',
}

export const getReportDesignerPagerModel = (params: any) => {
  const query = params
    ? { pageNum: params.pageNum, pageSize: params.pageSize }
    : {};
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  return requestClient.post<any>(Api.GetReportDesignerPagerModel, {
    query,
    entity,
  });
};
