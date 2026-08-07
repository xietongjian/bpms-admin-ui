import { requestClient } from '#/api/request';

enum Api {
  Delete = '/flow/base/flowFileInfo/deleteFileById',
  DeleteBatch = '/flow/base/flowFileInfo/deleteFileByIdList',
  PageList = '/flow/base/flowFileInfo/getPagerModel',
}

/**
 * 获取文件列表
 * @param params
 */
export async function getFlowFileList(params: any) {
  return requestClient.post<any>(Api.PageList, params);
}

/**
 * 删除文件
 * @param params
 */
export async function deleteFileById(params: { id: string }) {
  return requestClient.post<any>(Api.Delete, params, { responseReturn: 'body' });
}

/**
 * 批量删除文件
 * @param ids
 */
export async function batchDeleteFileByIdList(ids: string[]) {
  return requestClient.post<any>(Api.DeleteBatch, ids, { responseReturn: 'body' });
}
