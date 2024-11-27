import { requestClient } from '#/api/request';


enum Api {
  // 流程实例报表统计
  GetInstanceCountsForLastNumDays = '/flow/mongo/count/proc/getMongoProcessInstanceCountsForLastNumDays',
  GetInstanceCountsForOneMonth = '/flow/mongo/count/proc/getMongoProcessInstanceCountsForOneMonth',
  GetInstanceCountsForLastNumMonth = '/flow/mongo/count/proc/getMongoProcessInstanceCountsForLastNumMonth',
  GetInstanceCountsFor24Hour = '/flow/mongo/count/proc/getMongoProcessInstanceCountsFor24Hour',
  GetInstanceCountsForMonths = '/flow/mongo/count/proc/getMongoProcessInstanceCountsForMonths',
  // 流程任务报表统计
  GetTaskCountsForLastNumDays = '/flow/mongo/count/task/getMongoTaskInstCountsForLastNumDays',
  GetTaskCountsForOneMonth = '/flow/mongo/count/task/getMongoTaskInstCountsForOneMonth',
  GetTaskCountsForLastNumMonth = '/flow/mongo/count/task/getMongoTaskInstCountsForLastNumMonth',
  GetTaskCountsFor24Hour = '/flow/mongo/count/task/getMongoTaskInstCountsFor24Hour',
  GetTaskCountsForMonths = '/flow/mongo/count/task/getMongoTaskInstCountsForMonths',
}

// 流程实例报表统计
// 统计某一天最近7天的数据（每天）矩形图
export function getInstanceCountsForLastNumDays(params) {
  params.num = 7;
  return requestClient.post<any>(Api.GetInstanceCountsForLastNumDays, params);
}
// 统计某一个月的数据（每天）矩形图
export function getInstanceCountsForOneMonth(params) {
  params.num = 30;
  return requestClient.post<any>(Api.GetInstanceCountsForOneMonth, params);
}
// 统计某一个月最近三个月的数据（每个月）饼状图
export function getInstanceCountsForLastNumMonth(params) {
  params.num = 3;
  return requestClient.post<any>(Api.GetInstanceCountsForLastNumMonth, params);
}
// 统计某一天24小时的数据（每个小时）线型图
export function getInstanceCountsFor24Hour(params) {
  return requestClient.post<any>(Api.GetInstanceCountsFor24Hour, params);
}
// 统计某一年每个月的数据（每月）饼状图
export function getInstanceCountsForMonths(params) {
  return requestClient.post<any>(Api.GetInstanceCountsForMonths, params);
}

// 流程任务报表统计
// 统计某一天最近N天的数据（每天）矩形图
export function getTaskCountsForLastNumDays(params) {
  params.num = 7;
  return requestClient.post<any>(Api.GetTaskCountsForLastNumDays, params);
}
// 统计某一个月的数据（每天）矩形图
export function getTaskCountsForOneMonth(params) {
  params.num = 30;
  return requestClient.post<any>(Api.GetTaskCountsForOneMonth, params);
}
// 统计某一个月最近三个月的数据（每个月）饼状图
export function getTaskCountsForLastNumMonth(params) {
  params.num = 3;
  return requestClient.post<any>(Api.GetTaskCountsForLastNumMonth, params);
}
// 统计某一天24小时的数据（每个小时）线型图
export function getTaskCountsFor24Hour(params) {
  return requestClient.post<any>(Api.GetTaskCountsFor24Hour, params);
}
// 统计某一年每个月的数据（每月）饼状图
export function getTaskCountsForMonths(params) {
  return requestClient.post<any>(Api.GetTaskCountsForMonths, params);
}
