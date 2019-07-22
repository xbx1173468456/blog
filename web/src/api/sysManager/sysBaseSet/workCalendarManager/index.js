import request from '@/utils/request'

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
// 获取全部休假上班信息
export function getDayStatus(params = {}) {
  return request({
      url: '/api/admin/sysConfigWorkCalendar/getDayStatus',
      method: 'get',
      params
  })
}
// 设置休假上班时间
export function setDayStatus(data = {}) {
  const { date, dayStatus } = data
  return request({
      url: `/api/admin//sysConfigWorkCalendar/setDayStatus?date=${date}&dayStatus=${dayStatus}`,
      method: 'post',
      data
  })
}
// 初始化当前年份
export function initLowYear(data = {}) {
  return request({
      url: `/api/admin/sysConfigWorkCalendar/init/${data.year}`,
      method: 'post',
      data
  })
}