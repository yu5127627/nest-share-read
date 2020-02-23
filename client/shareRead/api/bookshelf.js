import http from './http'

// 搜索
const isUpdate = (data) => {
    return http({
        url: 'update',
        method: 'post', 
        data,
    })
}

export default {
	isUpdate
}