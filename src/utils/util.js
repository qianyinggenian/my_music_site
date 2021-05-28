/**
 * @Description 数组去重
 * @author wangkangzhang
 * @date 2021/5/20
*/
export function uniqueArray (arr, key) {
  const obj = {};
  arr = arr.reduce(function (item, next) {
    // eslint-disable-next-line no-unused-expressions
    obj[next[key]] ? '' : obj[next[key]] = item.push(next);
    return item;
  }, []);
  return arr;
}
/**
 * @Description 判断浏览器类型
 * @author wangkangzhang
 * @date 2021/5/20
 */
export function browserType () {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1;
  // 判断是否Opera浏览器
  if (isOpera) {
    return 'isOpera';
  }
  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }
  // 判断是否Chrome浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
  // 判断是否IE浏览器
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return 'isIE';
  }
}
