/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;

// 格式化秒的数据，将秒转换成，XX天XX小时XX分XX秒
export function formatSecToStr(seconds) {
  const daySec = 24 * 60 * 60;
  const hourSec = 60 * 60;
  const minuteSec = 60;
  const dd = Math.floor(seconds / daySec);
  const hh = Math.floor((seconds % daySec) / hourSec);
  const mm = Math.floor((seconds % hourSec) / minuteSec);
  const ss = Math.floor(seconds % minuteSec);
  if (dd > 0) {
    return dd + '天' + hh + '小' + mm + '分' + ss + '秒';
  } else if (hh > 0) {
    return hh + '小' + mm + '分' + ss + '秒';
  } else if (mm > 0) {
    return mm + '分' + ss + '秒';
  } else {
    return ss + '秒';
  }
}

/**
 * 获取日期数组
 * @param startDate 日期对象
 * @param daysBefore 之前的天数
 * @param daysAfter 之后的天数
 * return 日期数组
 */
export function getDatesArray(startDate, daysBefore, daysAfter) {
  let datesArray = [];
  for (let i = daysBefore; i >= 0; i--) {
    let date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    datesArray.push(date);
  }
  for (let i = 1; i <= daysAfter; i++) {
    let date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    datesArray.push(date);
  }
  return datesArray;
}
