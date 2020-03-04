import http from './http'

// 检查更新
const verifyUpdate = (data) => {
    return http({
        url: 'update',
        method: 'post', 
        data,
    })
}

// 检查更新
const startAdimg = () => {
    return http({
        url: 'update/start',
        method: 'get'
    })
}

export default {
	verifyUpdate,startAdimg
}