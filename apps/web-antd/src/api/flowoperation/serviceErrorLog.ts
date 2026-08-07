import { requestClient } from '#/api/request';

enum Api {
  GetInfo = '/flow/flowable/serviceErrorLogInfo/getById',
  GetProcessInfo = '/flow/query/getHighLightedNodeVoByProcessInstanceId',
  PageList = '/flow/flowable/serviceErrorLogInfo/getPagerModel',
  TryAgain = '/flow/flowable/serviceErrorLogInfo/execute',
}

/**
 * 获取错误日志分页列表
 * @param params
 */
export async function getPageList(params: any) {
  return requestClient.post<any>(Api.PageList, params);
}

/**
 * 重试
 * @param params
 */
export async function tryAgain(params: any) {
  return requestClient.post<any>(Api.TryAgain, params, { responseReturn: 'body' });
}

/**
 * 获取错误日志详情
 * @param params
 */
export async function getInfo(params: { id: string }) {
  return requestClient.post<any>(Api.GetInfo, params);
}

/**
 * 获取流程高亮节点信息
 * @param params
 */
export async function getProcessInfo(params: { processInstanceId: string }) {
  return requestClient.post<any>(Api.GetProcessInfo, params);
}
