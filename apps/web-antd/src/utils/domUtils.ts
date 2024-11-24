import type { FunctionArgs } from '@vueuse/core';
import { upperFirst } from 'lodash-es';

export interface ViewportOffsetResult {
  /**
   * 元素左边距离 body 左边的距离（和 getBoundingClientRect 的 left 一样）
   */
  left: number;
  /**
   * 元素顶边距离 body 顶边的距离（和 getBoundingClientRect 的 top 一样）
   */
  top: number;
  /**
   * 元素右边距离 body 右边的距离
   */
  right: number;
  /**
   * 元素底边距离 body 底边的距离
   */
  bottom: number;
  /**
   * 内容宽度 + 计算后的 right
   */
  rightIncludeBody: number;
  /**
   * 内容高度 + 计算后的 bottom
   */
  bottomIncludeBody: number;
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

function trim(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}
/**
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description:
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
}

export function hackCss(attr: string, value: string) {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT'];

  const styleObj: any = {};
  prefix.forEach((item) => {
    styleObj[`${item}${upperFirst(attr)}`] = value;
  });
  return {
    ...styleObj,
    [attr]: value,
  };
}

/* istanbul ignore next */
export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: Fn,
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
export function once(el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args as [evt: Event]);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
}

export function useRafThrottle<T extends FunctionArgs>(fn: T): T {
  let locked = false;
  // @ts-ignore
  return function (...args: any[]) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(() => {
      // @ts-ignore
      fn.apply(this, args);
      locked = false;
    });
  };
}
/**
 * 下载
 * @param downUrl
 */
export function doDownload(downUrl: string) {
  let iframe = document.getElementById('fileDownloadIframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'fileDownloadIframe';
    iframe.style = 'display:none';
    iframe.src = downUrl;
    document.body.appendChild(iframe);
  }
  iframe.src = downUrl;
}

/*
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */
export function changeURLArg(url, arg, arg_val) {
  const pattern = arg + '=([^&]*)';
  const replaceText = arg + '=' + arg_val;
  if (url.match(pattern)) {
    let tmp = '/(' + arg + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
  return url + '\n' + arg + '\n' + arg_val;
}

/**
 * 【全局方法】修改指定URL上的请求参数， 如?a=1&b=2  ---》changeURLPar(url, 'a', 5); ->a=5
 * @param url 指定的URL
 * @param key 参数Key， 若不存在则添加此参数
 * @param value 参数要修改的Value
 * @returns {string}
 */
export function changeURLPar(url, key, value) {
  let str = '';
  if (url.indexOf('?') != -1) str = url.substr(url.indexOf('?') + 1);
  else return url + '?' + key + '=' + value;
  let returnurl = '';
  let setparam = '';
  let arr;
  let modify = '0';
  if (str.indexOf('&') != -1) {
    arr = str.split('&');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].split('=')[0] == key) {
        setparam = value;
        modify = '1';
      } else {
        setparam = arr[i].split('=')[1];
      }
      returnurl = returnurl + arr[i].split('=')[0] + '=' + setparam + '&';
    }
    returnurl = returnurl.substr(0, returnurl.length - 1);
    if (modify == '0') if (returnurl == str) returnurl = returnurl + '&' + key + '=' + value;
  } else {
    if (str.indexOf('=') != -1) {
      arr = str.split('=');
      if (arr[0] == key) {
        setparam = value;
        modify = '1';
      } else {
        setparam = arr[1];
      }
      returnurl = arr[0] + '=' + setparam;
      if (modify == '0') if (returnurl == str) returnurl = returnurl + '&' + key + '=' + value;
    } else returnurl = key + '=' + value;
  }
  return url.substr(0, url.indexOf('?')) + '?' + returnurl;
  // history.replaceState(window.location.href, ref, url.substr(0, url.indexOf('?')) + "?" + returnurl);
}

export function updateXMLAttribute(xmlStr, tagName, attrName, attrValue) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');

  // 检查元素是否存在
  const element = xmlDoc.getElementsByTagName(tagName)[0];
  if (!element) {
    // throw new Error(`Tag "${tagName}" not found in the XML.`);
    console.error(`Tag "${tagName}" not found in the XML.`);
    return xmlStr;
  }

  // 检查属性是否存在
  const attr = element.getAttributeNode(attrName);
  if (attr) {
    // 如果属性不存在，则添加它
    element.setAttribute(attrName, attrValue);
  }

  // 返回更新后的XML字符串
  return new XMLSerializer().serializeToString(xmlDoc);
}

export function getXMLAttribute(xmlStr, tagName, attrName) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');

  // 检查元素是否存在
  const element = xmlDoc.getElementsByTagName(tagName)[0];
  if (!element) {
    // throw new Error(`Tag "${tagName}" not found in the XML.`);
    console.error(`Tag "${tagName}" not found in the XML.`);
    return null;
  }

  // 检查属性是否存在
  const attr = element.getAttributeNode(attrName);
  return attr;
}
