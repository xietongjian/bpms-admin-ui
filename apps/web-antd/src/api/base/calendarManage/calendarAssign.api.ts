import { requestClient } from '#/api/request';

enum Api {
  CalendarTypeList = '/flow/common/calendarType/list',
  CalendarYearList = '/flow/common/calendarYear/list',
  CalendarYearOrgDeleteById = '/flow/common/calendarYearOrg/deleteById/',
  CalendarYearOrgPage = '/flow/common/calendarYearOrg/page',
  CalendarYearOrgSaveOrUpdate = '/flow/common/calendarYearOrg/saveOrUpdate',
  CalendarYearOrgUpdateRemark = '/flow/common/calendarYearOrg/updateRemark',
}

/**
 * 日历分配分页
 * @param params
 */
export async function getCalendarYearOrgPage(params: any) {
  return requestClient.post<any>(Api.CalendarYearOrgPage, params);
}

/**
 * 保存日历分配
 * @param params
 */
export async function saveCalendarYearOrg(params: any) {
  return requestClient.post<any>(Api.CalendarYearOrgSaveOrUpdate, params, { responseReturn: 'body' });
}

/**
 * 更新日历分配备注
 * @param params
 */
export async function updateCalendarYearOrgRemark(params: any) {
  return requestClient.post<any>(Api.CalendarYearOrgUpdateRemark, params, { responseReturn: 'body' });
}

/**
 * 删除日历分配
 * @param id
 */
export async function deleteCalendarYearOrgById(id: string) {
  return requestClient.post<any>(`${Api.CalendarYearOrgDeleteById}${id}`, {}, { responseReturn: 'body' });
}

/**
 * 获取日历类型列表
 */
export async function getCalendarTypeList() {
  return requestClient.post<any>(Api.CalendarTypeList, {});
}

/**
 * 获取可用日历列表
 */
export async function getAvailableCalendarList() {
  return requestClient.post<any>(Api.CalendarYearList, {});
}
