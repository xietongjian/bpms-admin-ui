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
  RevokeProcess = '/flow/front/operate/revokeProcess',    // 撤回
  BackToSubmitter = '/flow/front/operate/backToSubmitter',  // 驳回到提交人
  ReviewTask = '/flow/front/operate/transferTask',  // 转阅
  // /getOneActivityVoByProcessInstanceIdAndActivityId/{processInstanceId}/{activityId}
  GetOneActivityVoByProcessInstanceIdAndActivityId = '/flow/front/query/getOneActivityVoByProcessInstanceIdAndActivityId',
  // /getCommentInfosByProcessInstanceId/{processInstanceId}
  GetCommentInfosByProcessInstanceId = '/flow/flowable/commentInfo/getCommentInfosByProcessInstanceId',
  GetHighLightedNodeVoByProcessInstanceId = '/flow/query/getHighLightedNodeVoByProcessInstanceId',
  // /loadBpmnXmlByModelKey/{modelKey}
  LoadBpmnXmlByModelKey = '/flow/front/query/loadBpmnXmlByModelKey',
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
  GetCustomFlowSequenceFlows = '/flow/front/query/getCustomFlowSequenceFlows',
  DelFormDraftById = '/flow/front/form/process/delFormDraftById',
  GetCustomApproveSettings = '/flow/front/query/getUserTaskNextSequenceUser',
  CheckFetchBack = '/flow/front/query/checkFetchBack',
  GetCommentInfoByTaskId = '/flow/front/query/getCommentInfoByTaskId',
  GetCurrTaskApplyersByBusinessKey = '/flow/front/query/getCurrTaskApplyersByBusinessKey',
  UpdateCommentInfo = '/flow/front/operate/updateCommentInfo',
  CheckRevokeProcess = '/flow/query/checkRevokeProcess',
  ReminderTask = '/flow/operate/reminderTask',

}

// 发起流程
export function startCustomFormProcess(params: any) {
  return requestClient.post(Api.StartCustomFormProcess, params, {isReturnNativeResponse: true}).then((res)=>{
    return Promise.resolve(res.data);
  });
}

// 通过表单信息获取模拟流程的节点信息
export function getCustomFlowSequenceFlows(params: any) {
  return requestClient.post(Api.GetCustomFlowSequenceFlows, params);
}

// 审批
export function complete(params: any) {
  return requestClient.post(Api.Complete, params, {isReturnNativeResponse: true});
}

// 催办
export function reminderTask(params: any) {
  return requestClient.post(Api.ReminderTask, params, {responseReturn: 'body'});
}

// 通过任务ID查询自定义审批配置项
export function getCustomApproveSettings(params: any) {
  return requestClient.get(Api.GetCustomApproveSettings + "/" + params.taskId ,{}, {isReturnNativeResponse: true});
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
  return requestClient.post(Api.UnClaimTask, params , {isReturnNativeResponse: true});
}
// 签收
export function claimTask(params: any) {
  return requestClient.post(Api.ClaimTask, params , {isReturnNativeResponse: true});
}
// 委派
export function delegateTask(params: any) {
  return requestClient.post(Api.DelegateTask, params , {isReturnNativeResponse: true});
}
// 暂存
export function holdTask(params: any) {
  return requestClient.post(Api.HoldTask, params , {isReturnNativeResponse: true});
}
// 转办
export function turnTask(params: any) {
  return requestClient.post(Api.TurnTask, params, {isReturnNativeResponse: true});
}
// 前加签
export function afterAddSign(params: any) {
  return requestClient.post(Api.AfterAddSign, params, {isReturnNativeResponse: true});
}
// 后加签
export function beforeAddSign(params: any) {
  return requestClient.post(Api.BeforeAddSign, params, {isReturnNativeResponse: true});
}
// 驳回
export function backToStep(params: any) {
  return requestClient.post(Api.BackToStep, params, {isReturnNativeResponse: true});
}
// 驳回到提交人
export function backToSubmitter(params: any) {
  return requestClient.post(Api.BackToSubmitter, params, {isReturnNativeResponse: true});
}
// 撤回接口
export function revokeProcess(params: any) {
  return requestClient.post(Api.RevokeProcess, params, {isReturnNativeResponse: true});
}
// 转阅
export function reviewTask(params: any) {
  return requestClient.post(Api.ReviewTask, params , {isReturnNativeResponse: true});
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
  const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  let entity = params||{};

  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = {query, entity} as any;
  return requestClient.post<any>(Api.GetPagerModelModelInfo, queryParam );
}

export function getCustomFormInfoVoByModelKeyAndBusinessKey(params) {
  const url = Api.GetCustomFormInfoVoByModelKeyAndBusinessKey;
  return requestClient.get<any>(url + '/' + params.modelKey+'?businessKey='+params.bizId+'&procInstId='+params.procInstId,{}, {isReturnNativeResponse: true});
}
export function getBizInfoVoByModelKey(params) {
  const url = Api.GetBizInfoVoByModelKey;
  return requestClient.get<any>(url + '/' + params.modelKey+'?businessKey='+params.bizId+'&procInstId='+params.procInstId,{}, {isReturnNativeResponse: true});
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
  const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  let entity = params||{};
  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = {query, entity} as any;
  return requestClient.post<any>(Api.GetDraftPageList, params).then(res=>{
    if(res.rows && res.rows.length>0){
      res.rows.forEach(item=>{
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
  return requestClient.post(Api.DelFormDraftById + '/' + params.id,{}, {isReturnNativeResponse: true});
}

// 检测已办任务是否可以取回审批记录
export function checkFetchBack(params: any) {
  return requestClient.get(Api.CheckFetchBack + '/' + params.taskId, {}, {isReturnNativeResponse: true});
}

// 根据任务ID获取审批记录
export function getCommentInfoByTaskId(params: any) {
  return requestClient.get(Api.GetCommentInfoByTaskId + '/' + params.taskId);
}

// 取回审批记录 - 更新审批记录
export function updateCommentInfo(params: any) {
  return requestClient.post(Api.UpdateCommentInfo, params , {isReturnNativeResponse: true});
}

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
