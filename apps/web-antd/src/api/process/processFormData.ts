import { requestClient } from '#/api/request';

enum Api {
  GetMyFormList = '/flow/form/custom/formInfoSql/getMyFormList',
  GetById = '/flow/flowable/modelInfo/get',
  GetReportColumnsById = '/flow/form/custom/formInfoSql/getReportColumnsById',
  GetReportDataByPagerModel = '/flow/form/custom/formInfoSql/getReportDataByPagerModel',
}

export const getMyProcessFormList = () => {
  return requestClient.post(Api.GetMyFormList).then((res: any) => {
    const list = res.map((item: any) => {
      return {
        ...item,
        whereJson: JSON.parse(item.whereJson),
        columnJson: JSON.parse(item.columnJson),
      };
    });
    return Promise.resolve(list);
  });
};

export const getById = (params: any) =>
  requestClient.get(Api.GetById + '/' + params);

export const getReportColumnsById = (params: any) =>
  requestClient.get(Api.GetReportColumnsById, { params });

export const getReportDataByPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity: params.queryList };
  return requestClient.post(Api.GetReportDataByPagerModel + '?id=' + params.id, queryParam);
};
