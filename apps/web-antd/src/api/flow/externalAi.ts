import { requestClient } from '#/api/request';

enum Api {
  PageListFlowNodeType = '/flow/ai/flowNodeType/page',
  SaveOrUpdateFlowNodeType = '/flow/ai/flowNodeType/saveOrUpdate',
  DeleteFlowNodeType = '/flow/ai/flowNodeType/deleteById',
  DetailFlowNodeType = '/flow/ai/flowNodeType/getById',

  PageListFlowNode = '/flow/ai/flowNode/page',
  SaveOrUpdateFlowNode = '/flow/ai/flowNode/saveOrUpdate',
  DeleteFlowNode = '/flow/ai/flowNode/deleteById',
  DetailFlowNode = '/flow/ai/flowNode/getById',

  PageListFlowNodeDetail = '/flow/ai/flowNodeDetail/page',
  SaveOrUpdateFlowNodeDetail = '/flow/ai/flowNodeDetail/saveOrUpdate',
  DeleteFlowNodeDetail = '/flow/ai/flowNodeDetail/deleteById',
  DetailFlowNodeDetail = '/flow/ai/flowNodeDetail/getById',
  FlowNodeTree = '/flow/ai/flowNode/nodeTree',
}

export const pageListFlowNodeType = (params: any) => {
  const { pageSize, pageNum, ...rest } = params || {};
  const query = pageSize && pageNum ? { pageNum, pageSize } : null;
  const entity = rest || {};
  const queryParam = { query, entity };
  return requestClient.post(Api.PageListFlowNodeType, queryParam);
};

export const saveOrUpdateFlowNodeType = (params: any) => {
  return requestClient.post(Api.SaveOrUpdateFlowNodeType, params);
};

export const deleteFlowNodeType = (params: any) => {
  return requestClient.post(`${Api.DeleteFlowNodeType}/${params.id}`);
};

export const detailFlowNodeType = (params: any) => {
  return requestClient.get(`${Api.DetailFlowNodeType}/${params.id}`);
};

export const pageListFlowNode = (params: any) => {
  const { pageSize, pageNum, ...rest } = params || {};
  const query = pageSize && pageNum ? { pageNum, pageSize } : null;
  const entity = rest || {};
  const queryParam = { query, entity };
  return requestClient.post(Api.PageListFlowNode, queryParam);
};

export const saveOrUpdateFlowNode = (params: any) => {
  return requestClient.post(Api.SaveOrUpdateFlowNode, params);
};

export const deleteFlowNode = (params: any) => {
  return requestClient.post(`${Api.DeleteFlowNode}/${params.id}`);
};

export const detailFlowNode = (params: any) => {
  return requestClient.get(`${Api.DetailFlowNode}/${params.id}`);
};

export const pageListFlowNodeDetail = (params: any) => {
  const { pageSize, pageNum, ...rest } = params || {};
  const query = pageSize && pageNum ? { pageNum, pageSize } : null;
  const entity = rest || {};
  const queryParam = { query, entity };
  return requestClient.post(Api.PageListFlowNodeDetail, queryParam);
};

export const saveOrUpdateFlowNodeDetail = (params: any) => {
  return requestClient.post(Api.SaveOrUpdateFlowNodeDetail, params);
};

export const deleteFlowNodeDetail = (params: any) => {
  return requestClient.post(`${Api.DeleteFlowNodeDetail}/${params.id}`);
};

export const detailFlowNodeDetail = (params: any) => {
  return requestClient.get(`${Api.DetailFlowNodeDetail}/${params.id}`);
};

export const flowNodeTree = () => {
  return requestClient.get(Api.FlowNodeTree);
};
