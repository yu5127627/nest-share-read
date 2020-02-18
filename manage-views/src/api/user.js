import request from '@/api/config'

export function login(data) {
  return request({
    url: 'users/login',
    method: 'put',
    data
  })
}

export function getInfo() {
  return request({
    url: 'users',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'users/logout',
    method: 'put'
  })
}

export default {
  login,
  getInfo,
  logout
}
