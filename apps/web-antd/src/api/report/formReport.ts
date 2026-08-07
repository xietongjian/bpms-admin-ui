import { requestClient } from '#/api/request';

enum Api {
  PageList = '/flow/report/formReportDesigner/page',
  SaveOrUpdate = '/flow/report/formReportDesigner/saveOrUpdate',
  Delete = '/flow/report/formReportDesigner/delete',
  GetById = '/flow/report/formReportDesigner/getById',
}

export const getFormReportList = (params: any) => {
  return requestClient.post(Api.PageList, params);
};

export const saveOrUpdateFormReport = (params: any) => {
  return requestClient.post(Api.SaveOrUpdate, params);
};

export const deleteFormReport = (params: any) => {
  return requestClient.post(Api.Delete, params);
};

export const getFormReportById = (params: any) => {
  return requestClient.get(`${Api.GetById}/${params.id}`);
};
