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
// 歌曲时长转换， 毫秒转分秒
export function formatDuration(duration) {
  // 分钟：向下取整，转为字符，不足两位前边补零
  // 毫秒 换算成 分：秒形式，即 00:00
  //duration / 1000得到秒，再除以60得到分
  let minute = Math.floor(duration / 1000 / 60).toString().padStart(2, '0');
  // .toString().padStart(2, '0')
  //duration / 1000得到秒，再除以60得到分
  let second = Math.floor(duration /1000 % 60).toString().padStart(2, '0');
  return minute + ':' + second
}
// 秒
export function changDuration(duration) {
  // 分钟：向下取整，转为字符，不足两位前边补零
  // 毫秒 换算成 分：秒形式，即 00:00
  //duration / 1000得到秒，再除以60得到分
  let minute = Math.floor(duration / 60).toString().padStart(2, '0');
  // .toString().padStart(2, '0')
  //duration / 1000得到秒，再除以60得到分
  let second = Math.floor(duration % 60).toString().padStart(2, '0');
  return minute + ':' + second
}
export function randomID () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
