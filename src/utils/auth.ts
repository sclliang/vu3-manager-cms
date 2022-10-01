import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
// 时间格式化
// utc格式化
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatTime(timer: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(timer).format(format)
}

// 时间戳格式化 dayjs文档： https://dayjs.fenxianglu.cn/category/parse.html#unix-%E6%97%B6%E9%97%B4%E6%88%B3-%E6%AF%AB%E7%A7%92
export function timestamp(timer: number, format: string = DATE_TIME_FORMAT) {
  return dayjs.unix(timer).format(format)
}
