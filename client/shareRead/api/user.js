import http from './http'

// 注册
const register = (data) => {
	return http({
		url: 'user/register',
		method: 'post',
		data,
	})
}

// 注册验证码
const registercode = (data) => {
	return http({
		url: 'user/register/code',
		method: 'post',
		data
	})
}

// 登录
const login = (data) => {
	return http({
		url: 'user/login',
		method: 'put',
		data,
	})
}

// 获取用户信息
const getUserinfo = () => {
	return http({
		url: 'user',
		method: 'get',
	})
}

// 忘记密码
const forgetpswd = (data) => {
	return http({
		url: 'user/forgetpswd',
		method: 'put',
		data
	})
}

// 忘记密码验证码
const forgetpswdcode = (data) => {
	return http({
		url: 'user/forgetpswd/code',
		method: 'post',
		data
	})
}

// 修改密码
const editpswd = (data) => {
	return http({
		url: 'user/editpswd',
		method: 'put',
		data
	})
}

// 收藏图书
const favBooks = () => {
	return http({
		url: 'user/fav',
		method: 'get'
	})
}

export default {
	login,
	getUserinfo,
	forgetpswd,
	forgetpswdcode,
	editpswd,
	favBooks,
	register,
	registercode
}
