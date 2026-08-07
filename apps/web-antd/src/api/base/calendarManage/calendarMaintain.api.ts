import { requestClient } from '#/api/request';

enum Api {
  CalendarTypePage = '/flow/common/calendarType/page',
  CalendarYearPage = '/flow/common/calendarYear/page',
  DeleteYear = '/flow/common/calendarYear/delete/',
  GetDaysByYearMonth = '/flow/common/calendarDay/getDaysByYearMonth',
  InitYearDays = '/flow/common/calendarYear/initYearDays',
  UpdateDayRemark = '/flow/common/calendarDay/updateRemark',
  UpdateDayType = '/flow/common/calendarDay/updateType',
  UpdateYearCalendar = '/flow/common/calendarYear/updateYearCalendar',
}

/**
 * 日历类型分页
 * @param params
 */
export async function getCalendarTypePage(params: any) {
  return requestClient.post<any>(Api.CalendarTypePage, params);
}

/**
 * 日历年分页
 * @param params
 */
export async function getCalendarYearPage(params: any) {
  return requestClient.post<any>(Api.CalendarYearPage, params);
}

/**
 * 初始化年日
 * @param params
 */
export async function initYearDays(params: { year: number }) {
  return requestClient.post<any>(Api.InitYearDays, params, { responseReturn: 'body' });
}

/**
 * 更新年日历
 * @param params
 */
export async function updateYearCalendar(params: any) {
  return requestClient.post<any>(Api.UpdateYearCalendar, params, { responseReturn: 'body' });
}

/**
 * 获取某年某月的日
 * @param params
 */
export async function getDaysByYearMonth(params: { year: number; month: number }) {
  return requestClient.post<any>(Api.GetDaysByYearMonth, params);
}

/**
 * 更新日类型
 * @param params
 */
export async function updateDayType(params: any) {
  return requestClient.post<any>(Api.UpdateDayType, params, { responseReturn: 'body' });
}

/**
 * 更新日备注
 * @param params
 */
export async function updateDayRemark(params: any) {
  return requestClient.post<any>(Api.UpdateDayRemark, params, { responseReturn: 'body' });
}

/**
 * 删除年日历
 * @param id
 */
export async function deleteCalendarYear(id: string) {
  return requestClient.post<any>(`${Api.DeleteYear}${id}`, {}, { responseReturn: 'body' });
}
