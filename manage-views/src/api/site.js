import request from '@/api/config'

const manager = () => {
  return request({
    url: 'site/manager',
    method: 'get'
  })
}

export default {
  manager
}
