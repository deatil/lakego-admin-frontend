import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';

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

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
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
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
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

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 * ??????????????????
 * 
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['???', '???', '???', '???', '???', '???', '???'][value ] }
    return value.toString().padStart(2, '0')
  })

  return time_str
}

/**
 * ????????????
 * 
 * @param date 
 */
export function dateFilter(date) {
  if (date < 10) {
    return '0' + date
  }
  return date
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '??????'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '?????????'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '?????????'
  } else if (diff < 3600 * 24 * 2) {
    return '1??????'
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '???' +
      d.getDate() +
      '???' +
      d.getHours() +
      '???' +
      d.getMinutes() +
      '???'
    )
  }
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * ?????????????????????
 * @param {string} value
 */
export function renderSize(value) {
  if (value == null || value == '') {
    return '0 Bytes'
  }
  var unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)// ?????????????????????
  return size + unitArr[index]
}

export function entityToString(entity) {
  const div = document.createElement('div')
  div.innerHTML = entity
  const res = div.innerText || div.innerText
  return res
}

export function getPathFileName(path) {
  var pos = path.lastIndexOf('/');
  return path.substring(pos + 1);
}

// ???????????????
export function getFileName(name) {
  const newName = getPathFileName(name)
  return newName.substring(0, newName.lastIndexOf("."))
}

// ?????? .?????????
export function getFileDotExtension(name) {
  const newName = getPathFileName(name)
  return namnewNamee.substring(newName.lastIndexOf("."))
}

// ??????????????????
export function getFileExtension (name) {
  const newName = getPathFileName(name)
  return newName.substring(newName.lastIndexOf(".")+1)
}

// ?????????????????????
export function assiginObj(target, sources) {
  let newobj = {};
  let keys1 = Object.keys(target);
  let keys2 = Object.keys(sources);
  for (const key of keys1) {
      if (typeof target[key] === 'object' 
        && typeof sources[key] === 'object'
      ) {
          newobj[key] = assiginObj(target[key], sources[key])
      } else {
          let value = keys2.indexOf(key) >= 0 ? sources[key] : target[key]
          newobj[key] = value
      }
  }
  for (const key of keys2) {
      if (!newobj[key]) {
          newobj[key] = sources[key]
      }
  }
  return newobj
}

// ??????
export function sortBy(attr, rev) {
  // ??????????????????????????? ??????????????????
  if (rev == undefined) {
      rev = 1;
  } else {
      rev = (rev) ? 1 : -1;
  }
   
  return function(a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
          return rev * -1;
      }
      if (a > b) {
          return rev * 1;
      }
      return 0;
  }
}

// ??????????????????
export function arraySort(array, attr, rev) {
  array.sort(sortBy(attr, rev))
}

// ????????????
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

// json??????
export function isJson(str) {
  if (typeof str != 'string') {
    return false
  }

  let obj = null

  try {
    obj = JSON.parse(str)
  } catch(e) {
    return false
  }

  if (typeof obj == 'object' && obj) {
    return true
  }

  return false
}

export function getPropertyCount(o) {
  let n, count = 0;
  for (n in o) {
    if (o.hasOwnProperty(n)) {
      count ++;
    }
  }

  return count;
}

/**
 * ??????????????????
 */
export function getNowTime() {
  var dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var date = dateObj.getDate();
  var day = dateObj.getDay();

  var weeks = [
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
  ]
  var week = weeks[day];
  var hour = dateObj.getHours();
  var minute = dateObj.getMinutes();
  var second = dateObj.getSeconds();

  var timeValue = '' + (
    (hour >= 12) 
    ? ((hour >= 18) ? '??????' : '??????') 
    : ((hour >= 8) ? '??????' : '??????')
  )

  var nowTime = dateFilter(year) + "???" 
    + dateFilter(month) + "???" 
    + dateFilter(date) + "??? " 
    + dateFilter(hour) + ":" 
    + dateFilter(minute) + ":" 
    + dateFilter(second) + " "
    + week;

  return [nowTime, timeValue]
}
