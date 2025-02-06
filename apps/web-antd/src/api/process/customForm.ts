import { requestClient } from '#/api/request';

enum Api {
  GetCustomPagerModel = '/flow/form/custom/getCustomPagerModel',
  GetById = '/flow/flowable/modelInfo/get',
  GetFormInfoById = '/flow/form/custom/getFormInfoById',
  CheckEntityExist = '/flow/flowable/modelInfo/checkEntityExist',
  GetBpmnByModelKey = '/flow/flowable/bpmn/getBpmnByModelKey',

  UpdateCustomFormData = '/flow/form/custom/updateCustomFormData',
}

export const getCustomPagerModel = (params: any) =>{
 return requestClient.post<any>(Api.GetCustomPagerModel,  params);
}
// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.GetBpmnByModelKey + '/' + params.modelKey, {});
}

export const getById = (params: any) =>
  requestClient.get(Api.GetById + "/" + params);

export const getFormInfoById = (params: any) =>
  requestClient.get(Api.GetFormInfoById + "/" + params);

export const updateCustomFormData = (params: any) =>
  requestClient.post(Api.UpdateCustomFormData, params, {isReturnNativeResponse: true});
