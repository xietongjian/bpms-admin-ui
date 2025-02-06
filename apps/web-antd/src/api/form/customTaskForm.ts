import { requestClient } from '#/api/request';

enum Api {
  GetCustomTaskPagerModel = '/flow/form/task/custom/getCustomPagerModel',
  GetTaskFormInfoByModelKey = '/flow/form/task/custom/getTaskFormInfoByModelKey', // /getTaskFormInfoByModelKey/{modelKey}
  CreateTaskProcess = '/flow/form/task/custom/createTaskProcess',

  GetCustomPagerModel = '/flow/form/custom/getCustomPagerModel',
  GetById = '/flow/flowable/modelInfo/get',
  DeployFlow = '/flow/form/task/custom/deployTaskFormInfo',
  StopFlow = '/flow/form/task/custom/stopTaskForm',
  Delete = '/flow/flowable/modelInfo/deleteByIds',
  DeleteFormById = '/flow/form/task/custom/deleteTaskFormById',
  CheckEntityExist = '/flow/flowable/modelInfo/checkEntityExist',

  SaveTaskFormInfo = '/flow/form/task/custom/saveTaskFormInfo', //保存自定义任务表单
  GetTaskFormMakInfoById = '/flow/form/task/custom/getTaskFormInfoById', //获取自定义任务表单数据  ? formType,formId
}

export const getCustomTaskPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetCustomTaskPagerModel, params);
};
export const getCustomPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetCustomPagerModel, params);
};

// 通过ModelKey获取表单列表
export function getTaskFormInfoByModelKey(params: any) {
  return requestClient.get(Api.GetTaskFormInfoByModelKey + '/' + params.modelKey);
}

export const createTaskProcess = (params: any) =>
  requestClient.post(Api.CreateTaskProcess, params);

export const deployFlow = (params: any) =>
  requestClient.post( Api.DeployFlow + '/' + params,{}, { isReturnNativeResponse: true });

export const stopFlow = (params: any) =>
  requestClient.post( Api.StopFlow + '/' + params ,{}, { isReturnNativeResponse: true });

export const getById = (params: any) => requestClient.get(Api.GetById + '/' + params);

export const deleteFormById = (params: any) =>
  requestClient.post( Api.DeleteFormById + '/' + params.id, {}, { isReturnNativeResponse: true });

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>( Api.CheckEntityExist, params );

export const saveTaskFormInfo = (params: any) =>
  requestClient.post(Api.SaveTaskFormInfo, params);

export const getTaskFormMakInfoById = (params: any) =>
  requestClient.get(Api.GetTaskFormMakInfoById + '/' + params.formId);
