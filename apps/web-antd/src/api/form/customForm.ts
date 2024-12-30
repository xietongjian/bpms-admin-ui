import { requestClient } from '#/api/request';
import { Base64 } from 'js-base64';

enum Api {
  GetCustomPagerModel = '/flow/form/custom/getCustomPagerModel',
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
// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.GetBpmnByModelKey + '/' + params.modelKey, {});
}

export const saveFormInfo = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  params.formJson = Base64.encode(params.formJson);
  return requestClient.post(Api.SaveFormInfo, params);
};

export const deployForm = (params: any) =>
  requestClient.post( Api.DeployForm + '/' + params, {}, { isTransformResponse: false });

export const stopForm = (params: any) =>
  requestClient.post(Api.StopForm + '/' + params, {}, { isTransformResponse: false });

export const copyCustForm = (params: any) =>
  requestClient.post(Api.CopyCustForm, params, { isTransformResponse: false });

export const getById = (params: any) => requestClient.get(Api.GetById + '/' + params);

export const getFormInfoById = (params: any) =>
  requestClient.get(Api.GetFormInfoById + '/' + params);

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: CheckExistParams) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const getFormInfoByModelKey = (params: any) =>
  requestClient.post( Api.GetFormInfoByModelKey + '/' + params.modelKey);

export const getFormTemplates = (params: any) => requestClient.post( Api.GetFormTemplates );
