import request from '@/api/config'

// 获取 app 信息
const getApp = () => {
  return request({
    url: 'app/version',
    method: 'get'
  })
}

// 修改 app 信息
const setApp = data => {
  return request({
    url: 'app/version',
    method: 'put',
    data
  })
}

// 增加一条广告
const createAdimg = data => {
  return request({
    url: 'app/ad',
    method: 'post',
    data
  })
}

// 上传广告图
const updateAdimg = data => {
  return request({
    url: 'upload/adimg',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' }
  })
}

// 删除一条广告
const removeAdimg = id => {
  return request({
    url: `app/ad/${id}`,
    method: 'delete'
  })
}

// 修改一条广告
const editAdimg = (id, data) => {
  return request({
    url: `app/ad/${id}`,
    method: 'put',
    data
  })
}

// 查询所有广告
const findAdimg = data => {
  return request({
    url: 'app/ad',
    method: 'get',
    data
  })
}

export default {
  getApp, setApp, createAdimg, removeAdimg, editAdimg, findAdimg, updateAdimg
}
