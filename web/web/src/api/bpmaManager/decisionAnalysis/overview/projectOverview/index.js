import request from '@/utils/request'

/**
 * 项目总览
* */

/**
 * 年度批次
 * */
export function getAccountancyYear(obj) {
  return request({
    url: '/api/admin/sysConfigAccountancyYear/page',
    method: 'get',
    params: obj
  })
}

/**
 * 项目
 * */
export function getProject(obj) {
  return request({
    url: '/api/admin/sysProAuth/listProByAuthForReport',
    method: 'get',
    params: obj
  })
}

/**
 * 进度-获取条形图数据
 * */
export function getProgressBarChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/schedule/getBarChart',
    method: 'get',
    params:{proId}
  })
}
export function getProgressTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/schedule/page',
    method: 'get',
    params
  })
}

/**
 *资金
 * */
export function getIncomeTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/money/getIncomePage',
    method: 'get',
    params
  })
}
export function getPayTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/money/getPayPage',
    method: 'get',
    params
  })
}


/**
 *资金-获取(收入)柱状图
 * */
export function getIncomeBarChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/money/getIncomeBarChart',
    method: 'get',
    params:{proId}
  })
}

/**
 * 资金-获取(支出)柱状图
 * */
export function getPayBarChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/money/getPayBarChart',
    method: 'get',
    params:{proId}
  })
}


/**
 * 产值
 * */

export function getOutputValueChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/output/getBarChart',
    method: 'get',
    params:{proId}
  })
}
export function getOutputValueTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/output/page',
    method: 'get',
    params
  })
}

/**
 * 成本
 * */

export function getCostChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/cost/getBarChart',
    method: 'get',
    params:{proId}
  })
}
export function getCostTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/cost/page',
    method: 'get',
    params
  })
}
/**
 * 成本-根据项目id 查看成本分类明细
 * */
export function getCostDetail(id) {
  return request({
    url: `/api/bpma/bpmaReport/cost/costDetail/${id}`,
    method: 'get',
  })
}

/**
 * 物资
 * */
export function getGoodsTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/material/page',
    method: 'get',
    params
  })
}



/**
 * 费用
 * */
export function getFinanceChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/finance/getBarChart',
    method: 'get',
    params:{proId}
  })
}
export function getFinanceTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/finance/page',
    method: 'get',
    params
  })
}

/**
 * 分包
 * */
export function getSubChart(proId) {
  return request({
    url: '/api/bpma/bpmaReport/sub/getBarChart',
    method: 'get',
    params:{proId}
  })
}
export function getSubTable(params) {
  return request({
    url: '/api/bpma/bpmaReport/sub/page',
    method: 'get',
    params
  })
}


