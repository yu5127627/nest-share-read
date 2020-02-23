import request from '@/api/config'

const manager = () => {
  return request({
    url: 'site/manager',
    method: 'get'
  })
}

// 获取 app 信息
const getApp = () => {
  return request({
    url: 'site/app',
    method: 'get'
  })
}

// 修改 app 信息
const setApp = data => {
  return request({
    url: 'site/app',
    method: 'put',
    data
  })
}

export default {
  manager, getApp, setApp
}
