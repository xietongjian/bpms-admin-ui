import { requestClient } from '#/api/request';

enum Api {
  GetAll = '/flow/flowable/flowListener/getList',
  PageList = '/flow/flowable/flowListener/getPagerModel',
  SaveOrUpdate = '/flow/flowable/flowListener/saveOrUpdate',

  SaveOrUpdateProperties = '/flow/flowable/flowListenerParam/saveOrUpdate',
  Delete = '/flow/flowable/flowListener/deleteById',
  DeleteListenerParam = '/flow/flowable/flowListenerParam/deleteById',
  CheckEntityExist = '/flow/flowable/flowListener/checkEntityExist',
  CheckParamEntityExist = '/flow/flowable/flowListenerParam/checkEntityExist',
  GetListenerParamList = '/flow/flowable/flowListenerParam/getList', // /flow/flowable/flowListenerParam/getList/{listenerId}
}

export const getAll = (params?: any) => {
  return requestClient.post<any>(Api.GetAll, params).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getListenerParamList = (params: any) => {
  return requestClient.get(Api.GetListenerParamList + '/' + params.listenerId);
};

export const getExpressionTypes = () => {
  const expressionTypes = [
    { value: 'delegateExpression', label: '代理表达式' },
    { value: 'expression', label: '表达式' },
    { value: 'class', label: 'java类' },
  ];
  return Promise.resolve(expressionTypes);
};

export const getListenerTypes = () => {
  const listenerTypes = [
    { value: 'taskListener', label: '任务监听' },
    { value: 'executionListener', label: '执行监听' },
  ];
  return Promise.resolve(listenerTypes);
};

export const getListByPage = (params?: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.PageList, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const saveOrUpdateProperties = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateProperties, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const checkParamEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckParamEntityExist, params);

export const deleteById = (id: string) => requestClient.post<any>(Api.Delete + '/' + id);

export const deleteParamById = (id: string) =>
  requestClient.post<any>(Api.DeleteListenerParam + '/' + id);
