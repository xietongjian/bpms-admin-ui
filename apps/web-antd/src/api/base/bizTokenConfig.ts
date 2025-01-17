import { requestClient } from '#/api/request';

enum Api {
  GetAll = '/flow/bpmnDesigner/prod/api/getBusinessTokenByQuery',
  SaveOrUpdate = '/flow/bpmnDesigner/prod/api/saveOrUpdateBusinessToken',
  DeleteBusinessTokenById = '/flow/bpmnDesigner/prod/api/deleteBusinessTokenById',
}
export const getAll = (params?: any) => {
  return requestClient.post( Api.GetAll, params).then((res: any) => {
    res.forEach((item) => {
      item.label = item.name;
      item.value = item.sn;
    });
    return Promise.resolve(res);
  });
};

export const saveOrUpdate = (params: any) => requestClient.post(Api.SaveOrUpdate, params);

export const deleteBusinessTokenById = (params: any) => requestClient.post(Api.DeleteBusinessTokenById + "/" + params.id, {}, {isTransformResponse: false});
