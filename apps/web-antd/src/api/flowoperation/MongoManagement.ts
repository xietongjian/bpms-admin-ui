import { requestClient } from '#/api/request';

enum Api {
  // 原始数据同步
  SyncAll = '/flow/mongo/sync/all',
  SyncHiProcInst = '/flow/mongo/sync/hiProcInst',
  SyncHiTaskInst = '/flow/mongo/sync/hiTaskInst',
  SyncHiActInst = '/flow/mongo/sync/hiActInst',
  SyncHiVarInst = '/flow/mongo/sync/hiVarInst',
  SyncFlowCommentInfo = '/flow/mongo/sync/flowCommentInfo',
  SyncFlowExtendHisprocinst = '/flow/mongo/sync/flowExtendHisprocinst',
  SyncHiIdEntityLink = '/flow/mongo/sync/hiIdEntityLink',
  // 原始数据清理
  ClearHiProcInst = '/flow/mongo/clear/hiProcInst',
  ClearHiTaskInst = '/flow/mongo/clear/hiTaskInst',
  ClearHiActInst = '/flow/mongo/clear/hiActInst',
  ClearHiVarInst = '/flow/mongo/clear/hiVarInst',
  ClearFlowCommentInfo = '/flow/mongo/clear/flowCommentInfo',
  ClearFlowExtendHisprocinst = '/flow/mongo/clear/flowExtendHisprocinst',
  ClearHiIdEntityLink = '/flow/mongo/clear/hiIdEntityLink',
  // 宽表数据同步
}

const options = {
  responseReturn: 'body',
  // successMessageMode: 'message',
};

// 全量同步
export const syncAll = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncAll, { startTime, endTime }, options);
};
// 同步流程实例
export const syncHiProcInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncHiProcInst, { startTime, endTime }, options);
};
// 同步任务实例
export const syncHiTaskInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncHiTaskInst, { startTime, endTime }, options);
};
// 同步节点实例
export const syncHiActInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncHiActInst, { startTime, endTime }, options);
};
// 同步变量实例
export const syncHiVarInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncHiVarInst, { startTime, endTime }, options);
};
// 同步审批意见实例
export const syncFlowCommentInfo = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncFlowCommentInfo,{ startTime, endTime }, options);
};
// 同步流程实例扩展信息
export const syncFlowExtendHisprocinst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(
    Api.SyncFlowExtendHisprocinst, { startTime, endTime },
    options,
  );
};
// 同步审批关联信息
export const syncHiIdEntityLink = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.SyncHiIdEntityLink, { startTime, endTime }, options);
};

// 清理流程实例
export const clearHiProcInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearHiProcInst, { startTime, endTime }, options);
};
// 清理任务实例
export const clearHiTaskInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearHiTaskInst, { startTime, endTime }, options);
};
// 清理节点实例
export const clearHiActInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearHiActInst, { startTime, endTime }, options);
};
// 清理变量实例
export const clearHiVarInst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearHiVarInst, { startTime, endTime }, options);
};
// 清理审批意见实例
export const clearFlowCommentInfo = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearFlowCommentInfo, { startTime, endTime },
    options,
  );
};
// 清理流程实例扩展信息
export const clearFlowExtendHisprocinst = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearFlowExtendHisprocinst, { startTime, endTime },
    options,
  );
};
// 清理审批关联信息
export const clearHiIdEntityLink = (time: any) => {
  const [startTime, endTime] = time;
  return requestClient.post<any>(Api.ClearHiIdEntityLink, { startTime, endTime }, options);
};
