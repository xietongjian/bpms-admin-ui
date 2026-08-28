import { requestClient } from '#/api/request';

enum Api {
  FindMyProcessinstancesPagerModel = '/flow/query/findMyProcessinstancesPagerModel',
  GetApplyedTasksPagerModel = '/flow/query/getApplyedTasksPagerModel',
  GetAppingTasksPagerModel = '/flow/query/getAppingTasksPagerModel',
  GetApps = '/flow/base/app/getApps',
  Complete = '/flow/front/operate/complete',  // 审批
  StopProcess = '/flow/front/operate/stopProcess',  // 终止
  UnClaimTask = '/flow/front/operate/unClaimTask',  // 反签收
  ClaimTask = '/flow/front/operate/claimTask',  // 签收
  HoldTask = '/flow/front/operate/holdTask',  // 暂存
  DelegateTask = '/flow/front/operate/delegateTask',  // 委派
  TurnTask = '/flow/front/operate/turnTask',  // 转办
  AfterAddSign = '/flow/front/operate/afterAddSign',  // 后加签
  BeforeAddSign = '/flow/front/operate/beforeAddSign',  // 前加签
  BackToStep = '/flow/front/operate/backToStep',  // 驳回
  RevokeProcess = '/flow/operate/revokeProcess',    // 撤回
  BackToSubmitter = '/flow/front/operate/backToSubmitter',  // 驳回到提交人
  ReviewTask = '/flow/front/operate/transferTask',  // 转阅
  // /getOneActivityVoByProcessInstanceIdAndActivityId/{processInstanceId}/{activityId}
  GetOneActivityVoByProcessInstanceIdAndActivityId = '/flow/front/query/getOneActivityVoByProcessInstanceIdAndActivityId',
  // /getCommentInfosByProcessInstanceId/{processInstanceId}
  GetCommentInfosByProcessInstanceId = '/flow/flowable/commentInfo/getCommentInfosByProcessInstanceId',
  GetHighLightedNodeVoByProcessInstanceId = '/flow/query/getHighLightedNodeVoByProcessInstanceId',
  // /loadBpmnXmlByModelKey/{modelKey}
  LoadBpmnXmlByModelKey = '/flow/query/loadBpmnXmlByModelKey',
  GetAppingTaskCount = '/flow/query/getAppingTaskCount',
  GetPagerModelModelInfo = '/flow/query/getPagerModelModelInfo',
  GetBackToStepNodes = '/flow/front/query/findBackNodesByTaskId',
  StartCustomFormProcess = '/flow/api/public/startCustomFormProcess',
  GetProdModelInfoByModelKeyAndProcInstId = '/flow/flowoperation/task/getProdModelInfoByModelKeyAndProcInstId',
  // /flow/front/form/process/startCustomFormProcess
  GetCustomFormInfoVoByModelKeyAndBusinessKey = '/flow/form/custom/getCustomFormInfoVoByModelKeyAndBusinessKey',
  GetBizInfoVoByModelKey = '/flow/form/biz/getBizInfoByModelKey',
  ///flow/form/biz/getBizInfoByModelKey
  GetDraftPageList = '/flow/query/getFormDraftPagerModelByQuery',
  GetMyCommonlyList = '/flow/query/getMyCommonlyProcess',
  DelFormDraftById = '/flow/front/form/process/delFormDraftById',
  GetCustomApproveSettings = '/flow/front/query/getUserTaskNextSequenceUser',
  CheckFetchBack = '/flow/front/query/checkFetchBack',
  GetCommentInfoByTaskId = '/flow/front/query/getCommentInfoByTaskId',
  GetCurrTaskApplyersByBusinessKey = '/flow/front/query/getCurrTaskApplyersByBusinessKey',
  UpdateCommentInfo = '/flow/front/operate/updateCommentInfo',
  CheckRevokeProcess = '/flow/query/checkRevokeProcess',
  ReminderTask = '/flow/operate/reminderTask',
  SaveCommonlyProcess = '/flow/commonlyProcess/saveCommonlyProcess',
  CancelCommonlyProcess = '/flow/commonlyProcess/deleteCommonlyProcessByModelKey/',
  GetCustomFlowSequenceFlows = '/flow/api/public/getCustomFlowSequenceFlows',
  GetPlusActivityInfosByStartFormProcessVo = '/flow/api/public/getPlusActivityInfosByStartFormProcessVo',
  CheckCancelProcess = '/flow/query/checkCancelProcess',
  CountUserTask = '/flow/mongo/count/task/countUserTask',
  CountUserTaskEfficiency = '/flow/mongo/count/task/countUserTaskEfficiency',
  GetApprovalMessageListByLoginUser = '/flow/base/approvalMessage/getListByLoginUser',
  SaveOrUpdateApprovalMessage = '/flow/base/approvalMessage/saveOrUpdate',
  DeleteApprovalMessageById = '/flow/base/approvalMessage/deleteById',
  QueryApplyedModelInfoList = '/flow/query/queryApplyedModelInfoList',
  QueryMyProcessinstancesModelInfoList = '/flow/query/queryMyProcessinstancesModelInfoList',
  QueryAppingModelInfoList = '/flow/query/queryAppingModelInfoList',
  QueryApplyedAppList = '/flow/query/queryApplyedAppList',
  GetActivitySignPermission = '/flow/query/getActivitySignPermission',
  GetSequenceFlowsByTaskId = '/flow/query/getSequenceFlowsByTaskId',
  GetSequenceFlowsByProcInstId = '/flow/query/getSequenceFlowsByProcInstId',
  GetWspActivityPersonalsByProcInstId = '/flow/query/getWspActivityPersonalsByProcInstId',
  ExportMyProcessinstancesList = '/flow/form/record/exportMyProcessinstancesList',
  ExportMyProcessinstancesFormDataList = '/flow/form/record/exportMyProcessinstancesFormDataList',
  ExportApprovedTaskInstVoList = '/flow/form/record/exportApprovedTaskInstVoList',
  ExportApprovedTaskInstVoFormDataList = '/flow/form/record/exportApprovedTaskInstVoFormDataList',
  ProcessHistoryDeleteById = '/flow/flowable/commentInfo/deleteById',
  DeleteCommentAttachmentById = '/flow/flowable/commentInfo/deleteCommentAttachmentById',
  UpdateCommentNoteById = '/flow/flowable/commentInfo/updateCommentNoteById',
  RemoveFileByFileId = '/flow/api/public/removeFileByFileId',
  FindAllBackNodesByProcessInstanceId = '/flow/query/findAllBackNodesByProcessInstanceId',
  GetProductAndProjList = '/flow/query/getProductAndProjList',
}

// 发起流程
export function startCustomFormProcess(params: any) {
  return requestClient.post(Api.StartCustomFormProcess, params, {responseReturn: 'body'});
}

// 通过表单信息获取模拟流程的节点信息
export function getCustomFlowSequenceFlows(params: any) {
  return requestClient.post(Api.GetCustomFlowSequenceFlows, params);
}

// 审批
export function complete(params: any) {
  return requestClient.post(Api.Complete, params, { responseReturn: 'raw' });
}

// 催办
export function reminderTask(params: any) {
  return requestClient.post(Api.ReminderTask, params, {responseReturn: 'body'});
}

// 通过任务ID查询自定义审批配置项
export function getCustomApproveSettings(params: any) {
  return requestClient.get(Api.GetCustomApproveSettings + "/" + params.taskId ,{}, { responseReturn: 'raw' });
}

// 通过业务单据ID获取当前审批人
export function getCurrTaskApplyersByBusinessKey(params: any) {
  return requestClient.get(Api.GetCurrTaskApplyersByBusinessKey + "/" + params.bizId );
}

// 获取待办数量
export function getAppingTaskCount(params: any) {
  return requestClient.post(Api.GetAppingTaskCount, params);
}

// 终止
export function stopProcess(params: any) {
  return requestClient.post( Api.StopProcess, params );
}
// 反签收
export function unClaimTask(params: any) {
  return requestClient.post(Api.UnClaimTask, params , { responseReturn: 'raw' });
}
// 签收
export function claimTask(params: any) {
  return requestClient.post(Api.ClaimTask, params , { responseReturn: 'raw' });
}
// 委派
export function delegateTask(params: any) {
  return requestClient.post(Api.DelegateTask, params , { responseReturn: 'raw' });
}
// 暂存
export function holdTask(params: any) {
  return requestClient.post(Api.HoldTask, params , { responseReturn: 'raw' });
}
// 转办
export function turnTask(params: any) {
  return requestClient.post(Api.TurnTask, params, { responseReturn: 'raw' });
}
// 前加签
export function afterAddSign(params: any) {
  return requestClient.post(Api.AfterAddSign, params, { responseReturn: 'raw' });
}
// 后加签
export function beforeAddSign(params: any) {
  return requestClient.post(Api.BeforeAddSign, params, { responseReturn: 'raw' });
}
// 驳回
export function backToStep(params: any) {
  return requestClient.post(Api.BackToStep, params, { responseReturn: 'raw' });
}
// 驳回到提交人
export function backToSubmitter(params: any) {
  return requestClient.post(Api.BackToSubmitter, params, { responseReturn: 'raw' });
}
// 撤回接口
export function revokeProcess(params: any) {
  return requestClient.post(Api.RevokeProcess, params, { responseReturn: 'body' });
}
// 转阅
export function reviewTask(params: any) {
  return requestClient.post(Api.ReviewTask, params , { responseReturn: 'raw' });
}
// 加载XML
export function getBpmnByModelKey(params: any) {
  return requestClient.get(Api.LoadBpmnXmlByModelKey + '/' + params.modelKey,{});
}

// 获取审批记录
export function getCommentInfosByProcessInstanceId(params: any) {
  return requestClient.get(Api.GetCommentInfosByProcessInstanceId + '/' + params.procInstId, { });
}

// 获取高亮
export function getHighLightedNodeVoByProcessInstanceId(params: any) {
  return requestClient.get(Api.GetHighLightedNodeVoByProcessInstanceId + '/' + params.procInstId, {});
}
// 获取高亮
export function getOneActivityVoByProcessInstanceIdAndActivityId(params: any) {
  return requestClient.get(Api.GetOneActivityVoByProcessInstanceIdAndActivityId + '/' + params.procInstId + '/' + params.elementId, {});
}
// 获取流程基本信息
export function getProdModelInfoByModelKeyAndProcInstId(params: any) {
  return requestClient.get(Api.GetProdModelInfoByModelKeyAndProcInstId + '/' + params.modelKey + '?procInstId=' + params.procInstId + '&taskId=' + (params.taskId||'') );
}

// 获取可驳回的节点
export function getBackToStepNodes(params: any) {
  return requestClient.get(Api.GetBackToStepNodes + '/' + params.taskId );
}

// 获取所有系统
export const getApps = (params?: any) => {
  return requestClient.post<any>( Api.GetApps, params).then((res: any)=>{
    res.forEach(item=>{
      item.label = item.name;
      item.value = item.sn;
    });
    return Promise.resolve(res);
  })
}

// 我发起的
export function findMyProcessinstancesPagerModel(params: any) {
  // const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  // let entity = params||{};
  // if(entity.dateRange){
  //   entity['startTime'] = params.dateRange[0].substring(0, 10);
  //   entity['endTime'] = params.dateRange[1].substring(0, 10);
  // }
  // if(entity){
  //   delete entity['pageNum'];
  //   delete entity['pageSize'];
  //   delete entity['dateRange'];
  // }
  // const queryParam = {query, entity};
  return requestClient.post<any>( Api.FindMyProcessinstancesPagerModel, params);
}

// 我的待办
export function getAppingTasksPagerModel(params: any) {
  /*const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  let entity = params||{};
  if(entity.dateRange){
    entity['startTime'] = params.dateRange[0].substring(0, 10);
    entity['endTime'] = params.dateRange[1].substring(0, 10);
  }
  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }*/
  // const queryParam = {query, entity} as any;
  return requestClient.post<any>(Api.GetAppingTasksPagerModel, params );
}

// 已办
export function getApplyedTasksPagerModel(params: any) {
  const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  let entity = params||{};
  if(entity.dateRange){
    entity['startTime'] = params.dateRange[0].substring(0, 10);
    entity['endTime'] = params.dateRange[1].substring(0, 10);
  }
  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }
  const queryParam = {query, entity};
  return requestClient.post<any>(Api.GetApplyedTasksPagerModel, params);
}

// 分页查询流程模板
export function getPagerModelModelInfo(params: any) {
  return requestClient.post<any>(Api.GetPagerModelModelInfo, params );
}

export function getCustomFormInfoVoByModelKeyAndBusinessKey(params: any) {
  const url = Api.GetCustomFormInfoVoByModelKeyAndBusinessKey;
  //  + '/' + params.modelKey+'?businessKey='+params.bizId+'&procInstId='+params.procInstId
  return requestClient.post<any>(Api.GetCustomFormInfoVoByModelKeyAndBusinessKey, params,{responseReturn: 'body'});
}
export function getBizInfoVoByModelKey(params: any) {
  const url = Api.GetBizInfoVoByModelKey;
  return requestClient.get<any>(url + '/' + params.modelKey+'?businessKey='+params.bizId+'&procInstId='+params.procInstId,{}, { responseReturn: 'raw' });
}

/**
 * 判断是否可以撤回
 * @param params
 */
export function checkRevokeProcess(params: any) {
  return requestClient.post<any>(Api.CheckRevokeProcess, params, {responseReturn: 'body'});
}

// 我的草稿
export function getDraftPageList(params: any) {
  return requestClient.post<any>(Api.GetDraftPageList, params).then(res => {
    if (res.rows && res.rows.length > 0) {
      debugger;
      res.rows.forEach(item => {
        item.modelKey = item.processDefinitionKey;
      });
      res.data = res.rows;
    }
    return Promise.resolve(res);
  });
}

// 我的常用流程
export function getMyCommonlyList() {
  return requestClient.get<any>(Api.GetMyCommonlyList, {} );
}

// 根据ID删除草稿
export function delFormDraftById(params: any) {
  return requestClient.post(Api.DelFormDraftById + '/' + params.id,{}, {responseReturn: 'body'});
}

// 检测已办任务是否可以取回审批记录
export function checkFetchBack(params: any) {
  return requestClient.get(Api.CheckFetchBack + '/' + params.taskId, {}, { responseReturn: 'raw' });
}

// 根据任务ID获取审批记录
export function getCommentInfoByTaskId(params: any) {
  return requestClient.get(Api.GetCommentInfoByTaskId + '/' + params.taskId);
}

// 取回审批记录 - 更新审批记录
export function updateCommentInfo(params: any) {
  return requestClient.post(Api.UpdateCommentInfo, params , { responseReturn: 'raw' });
}

/**
 * 获取常用审批意见，如【同意，好的，确认，通过，OK，已核实，情况属实，可以，已审核】
 */
export const getCommonApproveMsgList = () => {
  const commonApproveMsgList = [
    { id: '1', msg: '同意' },
    { id: '2', msg: '好的' },
    { id: '3', msg: '确认' },
    { id: '4', msg: '通过' },
    { id: '5', msg: 'OK' },
    { id: '6', msg: '已核实' },
    { id: '7', msg: '情况属实' },
    { id: '8', msg: '可以' },
    { id: '9', msg: '已审核' },
  ];
  return Promise.resolve(commonApproveMsgList);
};
export const getInitBpmnXml = (params: any) => {
  const initBpmnXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
    targetNamespace="http://bpmn.io/schema/bpmn"
    id="Definitions_${params.key}">
    <bpmn:process id="${params.key}" name="${params.name}" isExecutable="true"></bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${params.key}"></bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>
  `;
  return Promise.resolve(initBpmnXml);
}

// 加入常用流程
export function saveCommonlyProcess(params: any) {
  return requestClient.post(Api.SaveCommonlyProcess, params, {responseReturn: 'body'});
}

// 删除常用流程
export function cancelCommonlyProcess(params: any) {
  return requestClient.post(Api.CancelCommonlyProcess + '/' + params.modelKey, {}, {responseReturn: 'body'});
}

// 通过表单信息获取模拟流程的节点信息
export function getPlusActivityInfosByStartFormProcessVo(params: any) {
  return requestClient.post(Api.GetPlusActivityInfosByStartFormProcessVo, params);
}

// 判断是否可以终止（作废）
export function checkStopProcess(params: any) {
  return requestClient.post(Api.CheckCancelProcess, params, {responseReturn: 'body'});
}

// 获取效率仪表盘评语
export function countUserTask(params: any) {
  return requestClient.get(Api.CountUserTask);
}

// 获取效率仪数据
export function countUserTaskEfficiency(params: any) {
  return requestClient.post(Api.CountUserTaskEfficiency, params);
}

// 获取常用意见列表
export function getApprovalMessageListByLoginUser(params: any) {
  return requestClient.get(Api.GetApprovalMessageListByLoginUser);
}

// 添加或修改常用意见
export function saveOrUpdateApprovalMessage(params: any) {
  return requestClient.post(Api.SaveOrUpdateApprovalMessage, params);
}

// 删除常用意见
export function deleteApprovalMessageById(params: any) {
  return requestClient.post(Api.DeleteApprovalMessageById + '/' + params.id);
}

// 查询我的已办模板列表
export function queryApplyedModelInfoList() {
  return requestClient.get(Api.QueryApplyedModelInfoList);
}

// 查询我的发起的模板列表
export function queryMyProcessinstancesModelInfoList() {
  return requestClient.get(Api.QueryMyProcessinstancesModelInfoList);
}

// 查询我的待办模板列表
export function queryAppingModelInfoList() {
  return requestClient.get(Api.QueryAppingModelInfoList);
}

// 查询我的已办模板列表
export function queryApplyedAppList() {
  return requestClient.get(Api.QueryApplyedAppList);
}

// 获取任务是否需要手写签章配置
export function getActivitySignPermission(params: any) {
  return requestClient.get(Api.GetActivitySignPermission, { params });
}

// 根据任务ID获取流程的流转线
export function getSequenceFlowsByTaskId(params: any) {
  return requestClient.get(Api.GetSequenceFlowsByTaskId, { params });
}

// 根据流程实例ID获取流程的流转线
export function getSequenceFlowsByProcInstId(params: any) {
  return requestClient.get(Api.GetSequenceFlowsByProcInstId, { params });
}

// 根据流程实例ID获取流程的活动办理人
export function getWspActivityPersonalsByProcInstId(params: any) {
  return requestClient.get(Api.GetWspActivityPersonalsByProcInstId + '/' + params.procInstId);
}

// 导出我的发起
export function exportMyProcessinstancesList(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity.dateRange) {
    entity['processStartTime'] = params.dateRange[0].substring(0, 10);
    entity['processEndTime'] = params.dateRange[1].substring(0, 10);
  }
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.ExportMyProcessinstancesList, queryParam, { responseReturn: 'body' });
}

// 导出我的发起-表单数据
export function exportMyProcessinstancesFormDataList(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity.dateRange) {
    entity['processStartTime'] = params.dateRange[0].substring(0, 10);
    entity['processEndTime'] = params.dateRange[1].substring(0, 10);
  }
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.ExportMyProcessinstancesFormDataList, queryParam, { responseReturn: 'body' });
}

// 导出已办列表台账
export function exportApprovedTaskInstVoList(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity.dateRange) {
    entity['processStartTime'] = params.dateRange[0].substring(0, 10);
    entity['processEndTime'] = params.dateRange[1].substring(0, 10);
  }
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.ExportApprovedTaskInstVoList, queryParam, { responseReturn: 'body' });
}

// 导出已办数据列表台账
export function exportApprovedTaskInstVoFormDataList(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity.dateRange) {
    entity['processStartTime'] = params.dateRange[0].substring(0, 10);
    entity['processEndTime'] = params.dateRange[1].substring(0, 10);
  }
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['dateRange'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.ExportApprovedTaskInstVoFormDataList, queryParam, { responseReturn: 'body' });
}

// 删除审批记录
export function processHistoryDeleteById(params: any) {
  return requestClient.post(Api.ProcessHistoryDeleteById + '/' + params.id);
}

// 删除审批记录附件
export function deleteCommentAttachmentById(params: any) {
  return requestClient.post(Api.DeleteCommentAttachmentById + '/' + params.id);
}

// 编辑审批记录message
export function updateCommentNoteById(params: any) {
  return requestClient.post(Api.UpdateCommentNoteById, params, { responseReturn: 'raw' });
}

export function removeFileByFileId(params: any) {
  return requestClient.post(Api.RemoveFileByFileId + '/' + params.id);
}

// 获取所有的节点信息
export function findAllBackNodesByProcessInstanceId(params: any) {
  return requestClient.get(Api.FindAllBackNodesByProcessInstanceId + '/' + params.processInstanceId);
}

// 获取产品和项目列表
export function getProductAndProjList(params: any) {
  return requestClient.get(Api.GetProductAndProjList, { params });
}
