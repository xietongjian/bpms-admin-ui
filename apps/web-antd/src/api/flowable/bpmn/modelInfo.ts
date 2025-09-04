import { requestClient } from '#/api/request';

import { Base64 } from 'js-base64';

enum Api {
  ModelInfoPageList = '/flow/flowable/modelInfo/getPagerModel',
  GetById = '/flow/flowable/modelInfo/get',
  GetByModelId = '/flow/flowable/modelInfo/getByModelId',
  PublishBpmn = '/flow/flowable/bpmn/publishBpmn',
  StopBpmn = '/flow/flowable/bpmn/stopBpmn',
  SaveOrUpdate = '/flow/form/modelInfo/saveOrUpdateModelInfo',
  Delete = '/flow/flowable/modelInfo/deleteByIds',
  CheckEntityExist = '/flow/flowable/modelInfo/checkEntityExist',
  GetBpmnByModelKey = '/flow/flowable/bpmn/getBpmnByModelKey',
  GetHighLightedNodeVoByProcessInstanceId = '/flow/query/getHighLightedNodeVoByProcessInstanceId',
  // /getOneActivityVoByProcessInstanceIdAndActivityId/{processInstanceId}/{activityId}
  GetOneActivityVoByProcessInstanceIdAndActivityId = '/flow/flowable/bpmn/getOneActivityVoByProcessInstanceIdAndActivityId',
  // /getCommentInfosByProcessInstanceId/{processInstanceId}
  GetCommentInfosByProcessInstanceId = '/flow/flowable/commentInfo/getCommentInfosByProcessInstanceId',
  GetModelInfoByModelKey = '/flow/form/modelInfo/getModelInfoByModelKey',
  GetCategoryIdsByAppSn = '/flow/form/modelInfo/getCategoryIdsByAppSn',
  DeployCustomForm = '/flow/form/custom/deployForm',
  DeployBizForm = '/flow/form/biz/deployForm',

  ValidateBpmnModel = '/flow/bpmnDesigner/prod/api/validateBpmnModel',
  SaveBpmnModel = '/flow/bpmnDesigner/prod/api/saveBpmnModel',
  GetCustomFormStatusVoByModelId = '/flow/form/status/getCustomFormStatusVoByModelId',
  GetBizFormStatusVoByModelId = '/flow/form/status/getBizFormStatusVoByModelId',
  GetBpmnByModelId = '/flow/bpmnDesigner/prod/api/getBpmnByModelId',
  GetProcessVariableByModelKey = '/flow/bpmnDesigner/prod/api/getProcessVariableByModelKey',
  SaveOrUpdateProcessVariable = '/flow/flowable/processVariable/saveOrUpdate',
  DownloadVariableTemplate = '/flow/flowable/processVariable/download',
  UploadVariableTemplate = '/flow/flowable/processVariable/upload',
}

/**
 * 通过AppSn得到该系统所有的流程分类ID
 * @param params
 */
export const getCategoryIdsByAppSn = (params: any) =>
  requestClient.get<any>(Api.GetCategoryIdsByAppSn + '/' + params.appSn);

/**
 * 加载表单/流程设计器的保存状态
 * @param params
 */
export const loadFormBpmnStatus = (params: any) => {
  const statusUrl =
    params.formType === 'custom'
      ? Api.GetCustomFormStatusVoByModelId
      : Api.GetBizFormStatusVoByModelId;
  return requestClient.get<any>(statusUrl,{ modelId: params.modelId }).then((res) => {
    const { formStatus, processStatus, extendStatus, minStatus, minStatusName } = res;
    return Promise.resolve({
      formDesignerStatus: formStatus,
      bpmnDesignerStatus: processStatus,
      settingInfoStatus: extendStatus,
      finallyStatus: minStatus,
      finallyStatusName: minStatusName,
    });
  });
};

// 获取高亮
export function getHighLightedNodeVoByProcessInstanceId(params: any) {
  return requestClient.get(Api.GetHighLightedNodeVoByProcessInstanceId + '/' + params.procInstId,
    {}
  );
}

// 通过流程modelKey获取流程变量设置
export function getProcessVariableByModelKey(params: any) {
  return requestClient.get( Api.GetProcessVariableByModelKey + '/' + params.modelKey,
   {}
  );
}

// 保存流程变量
export function saveOrUpdateProcessVariable(params: any) {
  return requestClient.post(
    Api.SaveOrUpdateProcessVariable,
      params,
    { responseReturn: 'body' },
  );
}

// 下载流程变量模板
export function downloadVariableTemplate() {
  return requestClient.post(
    Api.DownloadVariableTemplate,
    {},
    { responseType: 'blob', isReturnNativeResponse: true },
  );
}

// 上传流程变量文件
export function uploadVariableTemplate(data: any) {
  return requestClient.upload(
    Api.UploadVariableTemplate,
    data,{responseReturn: 'body'}
  );
}

// 获取高亮
export function getOneActivityVoByProcessInstanceIdAndActivityId(params: any) {
  return requestClient.get(Api.GetOneActivityVoByProcessInstanceIdAndActivityId +
      '/' +
      params.procInstId +
      '/' +
      params.elementId,{});
}
// 获取审批记录
export function getCommentInfosByProcessInstanceId(params: any) {
  return requestClient.get(Api.GetCommentInfosByProcessInstanceId + '/' + params.procInstId,{});
}
export const getModelInfoPageList = (params: any) => {
  return requestClient.post<any>(Api.ModelInfoPageList, params);
};
// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.GetBpmnByModelKey + '/' + params.modelKey, {});
}

export const saveOrUpdate = (params: any) =>
  requestClient.post(Api.SaveOrUpdate, params, { responseReturn: 'body' });

export const publishBpmn = (params: any) => requestClient.post( Api.PublishBpmn + '/' + params);

export const stopBpmn = (params: any) => requestClient.post( Api.StopBpmn + '/' + params, {}, {responseReturn: 'body'});

export const getById = (params: any) => requestClient.get( Api.GetById + '/' + params );

export const getByModelId = (params: any) => requestClient.get(Api.GetByModelId + '/' + params);

export const deleteByIds = (params: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>( Api.CheckEntityExist, params);

export const validateBpmnModel = (params: Object) =>
  requestClient.post<any>(Api.ValidateBpmnModel, params, { responseReturn: 'body' });

export const saveBpmnModel = (params: any) => {
  params.modelXml = Base64.encode(params.modelXml);
  return requestClient.post<any>(Api.SaveBpmnModel, params, { responseReturn: 'body' });
};

export const getModelInfoByModelKey = (params: any) =>
  requestClient.get(Api.GetModelInfoByModelKey + '/' + params.modelKey);

// 加载流程设计器xml
export const getBpmnByModelId = (params: any) =>
  requestClient.get(Api.GetBpmnByModelId + '/' + params.modelId);

export const deployForm = (params: any) =>
  requestClient.post(
    (params.formType === 'custom' ? Api.DeployCustomForm : Api.DeployBizForm) +
        '/' +
        params.modelKey,{},
    { responseReturn: 'body' }
  );

/**
 * 获取流程模板的所有状态
 * CG(1, "草稿"), DFB(2, "待发布"), YFB(3, "已发布"), TY(4, "停用");
 */
export const getModelStatusList = () => {
  const modelStatusList = [
    {name: '草稿', value: 1},
    {name: '待发布', value: 2},
    {name: '已发布', value: 3},
    {name: '停用', value: 4},
  ];
  return Promise.resolve(modelStatusList);
};
