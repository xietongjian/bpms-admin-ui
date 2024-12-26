import { requestClient } from '#/api/request';
import { Base64 } from 'js-base64';

enum Api {
  GetPagerModel = '/flow/form/biz/getPagerModel',
  GetById = '/flow/flowable/modelInfo/get',
  GetFormInfoById = '/flow/form/custom/getFormInfoById',
  DeployForm = '/flow/form/biz/deployForm',
  StopForm = '/flow/form/biz/stopForm',
  SaveFormInfo = '/flow/form/custom/saveFormInfo',
  CopyForm = '/flow/form/biz/copyBizForm',
  Delete = '/flow/flowable/modelInfo/deleteByIds',
  CheckEntityExist = '/flow/form/biz/checkEntityExist',
  GetBizDataInfoByBusinessKeyAndModelKey = '/flow/form/biz/getBizDataInfoByBusinessKeyAndModelKey',
  GetBpmnByModelKey = '/flow/flowable/bpmn/getBpmnByModelKey',

  GetBizInfoByModelKey = '/flow/form/biz/getBizInfoByModelKey',
  SaveBizInfo = '/flow/form/biz/saveBizInfo',
}

export const getPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPagerModel, params);
};
// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.GetBpmnByModelKey + '/' + params.modelKey, {});
}

// 根据流程模板Key和业务表单Key获取业务流程数据
export function getBizDataInfoByBusinessKeyAndModelKey(params: any) {
  return requestClient.get(
      Api.GetBizDataInfoByBusinessKeyAndModelKey + '/' + params.modelKey + '/' + params.businessKey
  );
}

export const saveFormInfo = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  params.formJson = Base64.encode(params.formJson);
  return requestClient.post(Api.SaveFormInfo, params);
};

export const deployForm = (params: any) =>
  requestClient.post(Api.DeployForm + '/' + params, {},{ isReturnNativeResponse: true });

export const stopForm = (params: any) =>
  requestClient.post(Api.StopForm + '/' + params , {}, { isReturnNativeResponse: true });

export const copyBizForm = (params: any) =>
  requestClient.post(Api.CopyForm, params, { isReturnNativeResponse: true });

export const getById = (params: any) => requestClient.get(Api.GetById + '/' + params);

export const getFormInfoById = (params: any) =>
  requestClient.get(Api.GetFormInfoById + '/' + params);

export const deleteByIds = (params: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: CheckExistParams) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const getBizInfoByModelKey = (params: any) => {
  return requestClient.get(Api.GetBizInfoByModelKey + '/' + params.modelKey + '?formType=biz&formId=' + params.formId);
};

export const saveBizInfo = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  params.formJson = Base64.encode(params.formJson);
  return requestClient.post(Api.SaveBizInfo, params);
};
