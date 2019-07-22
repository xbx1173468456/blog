import request from '@/utils/request'

export function loginByPhone(mobilePhone, password) {
  const data = {
    mobilePhone,
    password
  }
  return request({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/api/auth/jwt/invalid',
    method: 'post',
    params: { token }
  })
}

export function getInfo() {
  return request({
    url: '/api/admin/user/front/info',
    method: 'get'
  })
}

