import { requestClient } from '#/api/request';

enum Api {
  FindHisProcessinstancesPagerModel = '/flow/flowoperation/processinst/findHisProcessinstancesPagerModel',
  GetPagerModelRunProcessInstance = '/flow/flowoperation/processinst/getPagerModelRunProcessInstance',
  GetCommentsByProcessInstanceId = '/flow/flowoperation/processinst/getCommentsByProcessInstanceId',
  GetVariablesByProcessInstanceId = '/flow/flowoperation/processinst/getVariablesByProcessInstanceId',
  GetProcessStatusEnums = '/flow/flowoperation/processinst/getProcessStatusEnums',
  ActivateProcessInstanceById = '/flow/flowoperation/processinst/activateProcessInstanceById',
  SuspendProcessInstanceById = '/flow/flowoperation/processinst/suspendProcessInstanceById',
  GetStartHeadInfoVoByProcessInstanceId = '/flow/query/getStartHeadInfoVoByProcessInstanceId',

  GetProcessInstanceVersions = '/flow/operate/getDefinitionVersionsByProcessInstanceId', // 获取流程版本
  ChangeProcessInstanceVersion = '/flow/operate/setProcessDefinitionVersionCmd', // 更新流程版本
  ExecuteProcessInstance = '/flow/flowoperation/processinst/execute', // 执行实例
  GetProcessInstanceVariables = '/flow/flowable/processVariable/getVariablesByProcessInstanceId', // 变量获取
  CompensateProcessInstanceVariables = '/flow/flowable/processVariable/addVariablesByProcessInstanceId', // 变量补偿
}

// 获取流程版本
export function getProcessInstanceVersions(processInstanceId: string) {
  return requestClient.post(Api.GetProcessInstanceVersions + '/' + processInstanceId);
}
// 切换流程版本
export function changeProcessInstanceVersion(processInstanceId: string, versionId: string, params) {
  return requestClient.post(`${Api.ChangeProcessInstanceVersion}/${processInstanceId}/${versionId}`,
      params, { successMessageMode: 'message', errorMessageMode: 'message' });
}
// 执行流程实例
export function executeProcessInstance(processInstanceId) {
  return requestClient.post(Api.ExecuteProcessInstance + '/' + processInstanceId,{},
    { successMessageMode: 'message', errorMessageMode: 'message' }
  );
}
// 获取流程变量
export function getProcessInstanceVariables(processInstanceId: string) {
  return requestClient.get(Api.GetProcessInstanceVariables + '/' + processInstanceId);
}
// 执行变量补偿
export function compensateProcessInstanceVariables(processInstanceId: string, params) {
  return requestClient.post(
      `${Api.CompensateProcessInstanceVariables}/${processInstanceId}`, params,
    { successMessageMode: 'message', errorMessageMode: 'message' },
  );
}

/**
 * 查询分页
 * @param params
 */
export const findProcessinstancesPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  if (params.field) {
    if (params.field === 'startTime') {
      query['sqlOrderBy'] = { 't1.START_TIME_': params['order'] === 'ascend' ? 'ASC' : 'DESC' };
    }
    delete entity['field'];
    delete entity['order'];
  } else {
    query['sqlOrderBy'] = { 't1.START_TIME_': 'DESC' };
  }
  const queryParam = { query, entity };
  // 获取运行时/所有的流程实例列表
  const url =
    params.procInstDataType === 'running'
      ? Api.GetPagerModelRunProcessInstance
      : Api.FindHisProcessinstancesPagerModel;

  return requestClient.post(url, params);
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
 * 通过流程实例id获取流程的头信息
 * @param params
 * /getStartHeadInfoVoByProcessInstanceId/{procInstId}
 */
export const getStartHeadInfoVoByProcessInstanceId = (params: any) => {
  return requestClient.get<any>(Api.GetStartHeadInfoVoByProcessInstanceId + '/' + params.procInstId);
};

/**
 * 获取所有流程审批状态
 */
export const getProcessStatusEnums = () => {
  return requestClient.get<any>(Api.GetProcessStatusEnums);
};

/**
 * 获取流程变量
 * @param params
 * /getVariablesByProcessInstanceId/{processInstanceId}
 */
export const getVariablesByProcessInstanceId = (params: any) => {
  return requestClient.get<any>(Api.GetVariablesByProcessInstanceId + '/' + params.processInstanceId);
};

/**
 * 挂起/激活流程实例
 * @param params
 */
export const changeProcInstActive = (params: any) => {
  // params.suspensionState = 1激活 2挂起
  const url =
    (params.suspensionState === 1
      ? Api.SuspendProcessInstanceById
      : Api.ActivateProcessInstanceById) +
    '/' +
    params.procInstId;
  return requestClient.post<any>(url, {}, { isReturnNativeResponse: true });
};
