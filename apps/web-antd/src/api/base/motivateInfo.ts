import { requestClient } from '#/api/request';

enum Api {
  Delete = '/flow/base/motivateInfo/deleteById',
  PageList = '/flow/base/motivateInfo/getPagerModel',
  SaveOrUpdate = '/flow/base/motivateInfo/saveOrUpdate',
}

/**
 * 获取激励信息分页
 * @param params
 */
export async function getMotivateInfoPage(params: any) {
  return requestClient.post<any>(Api.PageList, params);
}

/**
 * 保存或更新激励信息
 * @param params
 */
export async function saveOrUpdateMotivateInfo(params: any) {
  return requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });
}

/**
 * 删除激励信息
 * @param params
 */
export async function deleteMotivateInfo(params: { id: string }) {
  return requestClient.post<any>(Api.Delete, params, { responseReturn: 'body' });
}
