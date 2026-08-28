import { requestClient } from '#/api/request';
import { Base64 } from 'js-base64';

enum Api {
  GetCustomPagerModel = '/flow/form/custom/getCustomPagerModel',
  GetFormInfoDefPagerModel = '/flow/form/custom/getFormInfoDefPagerModel',
  GetFormInfoByDefId = '/flow/form/custom/getFormInfoByDefId',
  UpdateCustomFormInfoDef = '/flow/form/custom/updateCustomFormInfoDef',
  GetById = '/flow/flowable/modelInfo/get',
  GetFormInfoById = '/flow/form/custom/getFormInfoById',
  DeployForm = '/flow/form/custom/deployForm',
  StopForm = '/flow/form/custom/stopForm',
  SaveFormInfo = '/flow/form/custom/saveFormInfo',
  CopyCustForm = '/flow/form/custom/copyCustForm',
  Delete = '/flow/flowable/modelInfo/deleteByIds',
  CheckEntityExist = '/flow/flowable/modelInfo/checkEntityExist',
  GetBpmnByModelKey = '/flow/flowable/bpmn/getBpmnByModelKey',

  GetFormInfoByModelKey = '/flow/api/public/getFormInfoByModelKey',
  GetFormTemplates = '/flow/form/template/getAll',
  UpdateProcessNameByProcInstId = '/flow/form/custom/updateProcessNameByProcInstId',
  GetActivityFormItemDefByFormDefId = '/flow/form/custom/getActivityFormItemDefByFormDefId',
}

export const getCustomPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>( Api.GetCustomPagerModel, params);
};

export const pageList = (params: any) => {
  const { query, entity } = params || {};
  const queryParam = { query: query || {}, entity: entity || {} };
  return requestClient.post(Api.GetCustomPagerModel, queryParam);
};

// 加载自定义 - 表单定义数据
export const getFormInfoDefPagerModel = (params: any) => {
  const { query, entity } = params || {};
  const queryParam = { query: query || {}, entity: entity || {} };
  return requestClient.post(Api.GetFormInfoDefPagerModel, queryParam);
};

// 根据表单定义id获取数据
export const getCustomFormInfoDefByDefId = (params: any) => {
  return requestClient.get(Api.GetFormInfoByDefId + '/' + params.defId);
};

export const updateCustomFormInfoDef = (params: any) => {
  const data = {
    id: params.id,
    content: Base64.encode(params.content),
    formJson: Base64.encode(params.formJson),
  };
  return requestClient.post(Api.UpdateCustomFormInfoDef, data);
};

// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.GetBpmnByModelKey + '/' + params.modelKey, {});
}

export const saveFormInfo = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  params.formJson = Base64.encode(params.formJson);
  params.formModels = Base64.encode(params.formModels);
  return requestClient.post(Api.SaveFormInfo, params);
};

export const deployForm = (params: any) =>
  requestClient.post( Api.DeployForm + '/' + params, {}, { responseReturn: 'body' });

export const stopForm = (params: any) =>
  requestClient.post(Api.StopForm + '/' + params, {}, { responseReturn: 'body' });

export const copyCustForm = (params: any) =>
  requestClient.post(Api.CopyCustForm, params, { responseReturn: 'body' });

export const getById = (params: any) => requestClient.get(Api.GetById + '/' + params);

export const getFormInfoById = (params: any) =>
  requestClient.get(Api.GetFormInfoById + '/' + params);

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const getFormInfoByModelKey = (params: any) =>
  requestClient.post( Api.GetFormInfoByModelKey + '/' + params.modelKey);

export const getFormTemplates = (params: any) => requestClient.post( Api.GetFormTemplates );

export const updateProcessNameByProcInstId = (params: any) =>
  requestClient.post(Api.UpdateProcessNameByProcInstId, params, {isReturnNativeResponse: true});

export const getActivityFormItemDefByFormDefId = (params: any) =>
  requestClient.get(Api.GetActivityFormItemDefByFormDefId, { params });
