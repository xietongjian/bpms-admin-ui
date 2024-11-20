import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Component } from 'vue';

import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es';
import { unref } from 'vue';
import { isArray, isObject } from '#/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual);
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual);
        case 'concat':
          return sourceValue.concat(targetValue);
        case 'replace':
          return targetValue;
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`);
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T extends Record<string, unknown>, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).forEach((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};

/**
 * 格式化文件大小
 * @param {*} value
 */
export const formatFileSize = (size) => {
  const value = Number(size);
  if (size && !isNaN(value)) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
    let index = 0;
    let k = value;
    if (value >= 1024) {
      while (k > 1024) {
        k = k / 1024;
        index++;
      }
    }
    return `${k.toFixed(2)}${units[index]}`;
  }
  return '-';
};

export const getApproveStatusIcon = (statusCode: string) => {
  let statusStyle = '';
  switch (statusCode) {
    case 'SPZ':
      statusStyle = 'processing';
      break;
    case 'BJ':
      statusStyle = 'default';
      break;
    case 'JQ':
      statusStyle = 'warning';
      break;
    case 'ZZ':
      statusStyle = 'error';
      break;
    default:
      statusStyle = 'default';
      break;
  }

  return statusStyle;
};

/**
 * 根据Value格式化为带有换行、空格格式的HTML代码
 * @param strValue {String} 需要转换的值
 * @return  {String}转换后的HTML代码
 * @example
 * getFormatCode("测\r\n\s试")  =>  “测<br/>&nbsp试”
 */
export const getFormatCode = (strValue) => {
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
};

export const humpToLine = (name) => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};
/**
 * 时间间隔 - 格式化
 * @param timeDuration 毫秒数
 */
export function timeDurationFormatter(timeDuration) {
  let result = '',
    diffYears = 0,
    diffMonths = 0,
    diffDays = 0,
    diffHours = 0,
    diffMins = 0,
    diffSecs = 0;
  if (timeDuration >= 0) {
    diffYears = Math.floor(timeDuration / 1000 / 3600 / 24 / 30 / 12);
    diffMonths = Math.floor((timeDuration / 1000 / 3600 / 24 / 30) % 12);
    diffDays = Math.floor((timeDuration / 1000 / 3600 / 24) % 30);
    diffHours = Math.floor((timeDuration / 1000 / 60 / 60) % 24);
    diffMins = Math.floor((timeDuration / 1000 / 60) % 60);
    diffSecs = Math.floor((timeDuration / 1000) % 60);
  }
  if (diffYears) {
    result = diffMonths ? `${diffYears}年${diffMonths}月` : `${diffYears}年`;
  } else if (diffMonths) {
    result = diffDays ? `${diffMonths}月${diffDays}天` : `${diffMonths}月`;
  } else if (diffDays) {
    result = diffHours ? `${diffDays}天${diffHours}时` : `${diffDays}天`;
  } else if (diffHours) {
    result = diffMins ? `${diffHours}时${diffMins}分` : `${diffHours}时`;
  } else if (diffMins) {
    result = diffSecs ? `${diffMins}分${diffSecs}秒` : `${diffMins}分`;
  } else {
    result = `${diffSecs}秒`;
  }
  return result;
}

// 定时循环验证
export function loopUntilValidate<F extends Function>(
  validator: () => boolean,
  callback: F,
  timeStep = 100,
) {
  if (validator()) {
    return callback();
  }
  setTimeout(() => {
    loopUntilValidate(validator, callback);
  }, timeStep);
}

export function groupBy(array, key) {
  return array.reduce((result, currentItem) => {
    // 使用 key 的值作为分组的键
    const groupKey = currentItem[key];

    // 如果 result 中不存在这个键，则创建一个数组
    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    // 将当前项推入对应的分组数组中
    result[groupKey].push(currentItem);

    return result;
  }, {});
}
