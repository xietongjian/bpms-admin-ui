import { requestClient } from '#/api/request';

enum Api {
  DeleteBatch = '/flow/common/calendarType/deleteBatch',
  DeleteById = '/flow/common/calendarType/deleteById/',
  Page = '/flow/common/calendarType/page',
  SaveOrUpdate = '/flow/common/calendarType/saveOrUpdate',
  UpdateRemark = '/flow/common/calendarType/updateRemark',
}

/**
 * 日历类型分页
 * @param params
 */
export async function getCalendarTypePage(params: any) {
  return requestClient.post<any>(Api.Page, params);
}

/**
 * 保存或更新日历类型
 * @param params
 */
export async function saveOrUpdateCalendarType(params: any) {
  return requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });
}

/**
 * 更新日历类型备注
 * @param params
 */
export async function updateCalendarTypeRemark(params: any) {
  return requestClient.post<any>(Api.UpdateRemark, params, { responseReturn: 'body' });
}

/**
 * 删除日历类型
 * @param id
 */
export async function deleteCalendarTypeById(id: string) {
  return requestClient.post<any>(`${Api.DeleteById}${id}`, {}, { responseReturn: 'body' });
}

/**
 * 批量删除日历类型
 * @param ids
 */
export async function deleteCalendarTypeBatch(ids: string[]) {
  return requestClient.post<any>(Api.DeleteBatch, ids, { responseReturn: 'body' });
}
