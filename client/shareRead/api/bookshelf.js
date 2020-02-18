import http from './http'

// 搜索
const login = (data) => {
    return http({
        url: 'users/login',
        method: 'put', 
        data,
    })
}

export default {
	login
}