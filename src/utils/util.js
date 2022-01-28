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
// 毫秒时间格式转换，例如转化成"yyyy-MM-dd"格式
export function formatDate(time,fmt) {
  const date = new Date(time);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
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
