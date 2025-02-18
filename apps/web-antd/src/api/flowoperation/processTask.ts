import { requestClient } from '#/api/request';

enum Api {
  GetPagerModelRunTasks = '/flow/flowoperation/task/getPagerModelRunTasks',
  GetCommentsByProcessInstanceId = '/flow/flowoperation/processinst/getCommentsByProcessInstanceId',
  CompleteBackStage = '/flow/flowoperation/task/completeBackStage', // /{taskId}/{processInstanceId}
  StopProcess = '/flow/flowoperation/task/stopProcess', // /{taskId}/{processInstanceId}
  UpdateAssignee = '/flow/flowoperation/task/updateAssignee', // /updateAssignee
  GetVariablesByProcessInstanceId = '/flow/flowoperation/processinst/getVariablesByProcessInstanceId',

  GetProdModelInfoByModelKeyAndProcInstId = '/flow/flowoperation/task/getProdModelInfoByModelKeyAndProcInstId',
  GetCustomFormInfoVoByModelKeyAndBusinessKey = '/flow/form/custom/getCustomFormInfoVoByModelKeyAndBusinessKey',
  GetBizInfoVoByModelKey = '/flow/form/biz/getBizInfoByModelKey',
  BackToSubmitter = '/flow/operate/backToSubmitter', // 驳回到提交人

  GetBackToStepNodes = '/flow/query/findBackNodesByTaskId',
  TurnTask = '/flow/operate/turnTask', // 转办
  AfterAddSign = '/flow/operate/afterAddSign', // 后加签
  BeforeAddSign = '/flow/operate/beforeAddSign', // 前加签
  DelegateTask = '/flow/operate/delegateTask', // 委派
  ReviewTask = '/flow/operate/transferTask', // 转阅
  Complete = '/flow/operate/complete', // 审批
  UnClaimTask = '/flow/operate/unClaimTask', // 反签收
  ClaimTask = '/flow/operate/claimTask', // 签收
  HoldTask = '/flow/operate/holdTask', // 暂存
  GetCustomApproveSettings = '/flow/query/getUserTaskNextSequenceUser',

  BackToStep = '/flow/operate/backToStep', // 驳回 => 流程干预
  RestartProcessInstance = '/flow/operate/restartProcessInstance', // 流程复活
  GetCurrTaskApplyersByProcessInstanceId = '/flow/query/getCurrTaskApplyersByProcessInstanceId',
  SaveOrUpdateReadInfo = '/flow/flowoperation/task/saveOrUpdateReadInfo',
}

/**
 * 查询分页
 * @param params
 */
export const getPagerModelRunTasks = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };

  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  if (params.field) {
    if (params.field === 'createTime') {
      query['sqlOrderBy'] = { 't1.CREATE_TIME_': params['order'] === 'ascend' ? 'ASC' : 'DESC' };
    } else if (params.field === 'processStartTime') {
      query['sqlOrderBy'] = { 't2.START_TIME_': params['order'] === 'ascend' ? 'ASC' : 'DESC' };
    }
    delete entity['field'];
    delete entity['order'];
  } else {
    query['sqlOrderBy'] = { 't1.CREATE_TIME_': 'DESC' };
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPagerModelRunTasks, params);
};

/**
 * 获取流程的审批记录
 * @param params
 * /getCommentsByProcessInstanceId/{processInstanceId}
 */
export const getCommentsByProcessInstanceId = (params: any) => {
  return requestClient.get<any>(Api.GetCommentsByProcessInstanceId + '/' + params.processInstanceId);
};

/**
 * 设置审批任务是否已读
 * @param params
 * /getCommentsByProcessInstanceId/{processInstanceId}
 */
export const saveOrUpdateReadInfo = (params: any) => {
  return requestClient.post<any>(Api.SaveOrUpdateReadInfo, params);
};

/**
 * 后台执行任务
 * @param params
 */
export const completeBackStage = (params: any) => {
  return requestClient.post<any>(Api.CompleteBackStage + '/' + params.taskId + '/' + params.processInstanceId, { },
    { responseReturn: 'body' },
  );
};

/**
 * 变更审批人
 * @param params
 */
export const updateAssignee = (params: any) => {
  return requestClient.post<any>(Api.UpdateAssignee, params, { isReturnNativeResponse: true });
};

/**
 * 后台终止任务
 * @param params
 */
export const stopProcess = (params: any) => {
  // /stopProcess/{taskId}/{processInstanceId}
  return requestClient.post<any>(Api.StopProcess, params, { responseReturn: 'body' });
};

/**
 * 获取流程变量
 * @param params
 * /getVariablesByProcessInstanceId/{processInstanceId}
 */
export const getVariablesByProcessInstanceId = (params: any) => {
  return requestClient.get<any>(Api.GetVariablesByProcessInstanceId + '/' + params.processInstanceId);
};

// #############################################################################
// 获取流程基本信息
export function getProdModelInfoByModelKeyAndProcInstId(params: any) {
  return requestClient.get(Api.GetProdModelInfoByModelKeyAndProcInstId +
      '/' +
      params.modelKey +
      '?procInstId=' +
      params.procInstId +
      '&taskId=' +
      (params.taskId || '')
  );
}

// 通过业务单据ID获取当前审批人
export function getCurrTaskApplyersByProcessInstanceId(params: any) {
  return requestClient.get(Api.GetCurrTaskApplyersByProcessInstanceId + "/" + params.procInstId);
}

export function getCustomFormInfoVoByModelKeyAndBusinessKey(params: any) {
  const url = Api.GetCustomFormInfoVoByModelKeyAndBusinessKey;
  return requestClient.post<any>(
      url,
      params,
    { responseReturn: 'body' },
  );
}

export function getBizInfoVoByModelKey(params) {
  const url = Api.GetBizInfoVoByModelKey;
  return requestClient.get<any>(
        url +
        '/' +
        params.modelKey +
        '?businessKey=' +
        params.bizId +
        '&procInstId=' +
        params.procInstId,
    { isReturnNativeResponse: true },
  );
}
// 驳回 => 流程干预
export function backToStep(params: any) {
  return requestClient.post(Api.BackToStep, params, { responseReturn: 'body'});
}
// 流程复活
export function restartProcessInstance(processInstanceId: string, activityIds: string[]) {
  return requestClient.post(
     Api.RestartProcessInstance + '/' + processInstanceId,
      activityIds,
    { successMessageMode: 'message', errorMessageMode: 'message' },
  );
}
// 驳回到提交人
export function backToSubmitter(params: any) {
  return requestClient.post(Api.BackToSubmitter, params, { isReturnNativeResponse: true });
}
// 获取可驳回的节点
export function getBackToStepNodes(params: any) {
  return requestClient.get(Api.GetBackToStepNodes + '/' + params.taskId);
}
// 委派
export function delegateTask(params: any) {
  return requestClient.post(Api.DelegateTask, params, { isReturnNativeResponse: true });
}
// 转办
export function turnTask(params: any) {
  return requestClient.post(Api.TurnTask, params, { isReturnNativeResponse: true });
}
// 前加签
export function afterAddSign(params: any) {
  return requestClient.post(Api.AfterAddSign, params, { isReturnNativeResponse: true });
}
// 后加签
export function beforeAddSign(params: any) {
  return requestClient.post(Api.BeforeAddSign, params, { isReturnNativeResponse: true });
}
// 转阅
export function reviewTask(params: any) {
  return requestClient.post(Api.ReviewTask, params, { isReturnNativeResponse: true });
}

// 审批
export function complete(params: any) {
  return requestClient.post(Api.Complete, params, { responseReturn: 'body' });
}

// 通过任务ID查询自定义审批配置项
export function getCustomApproveSettings(params: any) {
  return requestClient.get(Api.GetCustomApproveSettings + '/' + params.taskId,
      { responseReturn: 'body' });
}
// 反签收
export function unClaimTask(params: any) {
  return requestClient.post(Api.UnClaimTask, params, { responseReturn: 'body' });
}
// 签收
export function claimTask(params: any) {
  return requestClient.post(Api.ClaimTask, params, { responseReturn: 'body' });
}
// 暂存
export function holdTask(params: any) {
  return requestClient.post(Api.HoldTask, params, { responseReturn: 'body' });
}
