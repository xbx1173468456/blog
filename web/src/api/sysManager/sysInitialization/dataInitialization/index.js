import request from '@/utils/request'

export function getDataInitialization() {
  return request({
    url: '/api/admin/sysCrmProductInfo/getProductInfo',
    method: 'get'
  })
}

export function putDataInitializationAll(obj) {
  return request({
    url: '/api/admin/sysInitData/init/' + obj.alias,
    method: 'post'
  })
}

export function putDataInitialization(obj) {
  return request({
    url: '/api/admin/' + obj.url + '/' + obj.id,
    method: 'post'
  })
}
export function getDataInitializationItem(obj) {
  return request({
    url: '/api/admin/sysInitData/get/' + obj.alias,
    method: 'get'
  })
}
export function addProdInfo(obj) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}
/* 获取主菜单列表*/
export function getAllMenus() {
  return request({
    url: '/api/admin/menu/user/menus',
    method: 'get'
  })
}
/* 获取产品列表*/
export function getGoodslist(page, limit) {
  return request({
    url: '/api/admin/sysCrmProductInfo/page',
    method: 'get',
    params: {
    	page: page,
    	limit: limit
    }
  })
}
/* 获取产品列表详情*/
export function getGoods(productId) {
  return request({
    url: '/api/admin/sysCrmProductInfo/fun/tree',
    method: 'get',
    params: {
    	productId
    }
  })
}
/* 获取用户公司信息*/
export function getCompanyMsg(id) {
  return request({
    url: '/api/admin/sysCrmUserInfo/' + id,
    method: 'get'
  })
}
/* 修改用户公司信息*/
export function changeCompanyMsg(data) {
  return request({
    url: '/api/admin/sysCrmUserInfo/',
    method: 'put',
    data: data
  })
}
