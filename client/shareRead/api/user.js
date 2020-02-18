import http from './http'

// 登录
const login = (data) => {
	return http({
		url: 'user/login',
		method: 'put',
		data,
	})
}

const getUserinfo = () => {
	return http({
		url: 'user',
		method: 'get',
	})
}

export default {
	login,getUserinfo
}
