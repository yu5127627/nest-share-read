import http from './http'

// 类别
const category = () => {
	return http({
		url: 'bookshop/category',
		method: 'get'
	})
}

// 类别下图书
const categoryBooks = (id) => {
	return http({
		url: `bookshop/category/${id}`,
		method: 'get'
	})
}

// 类别下广告图
const categoryAdimgs = (id) => {
	return http({
		url: `bookshop/category/ad/${id}`,
		method: 'get'
	})
}

// 获取一本图书信息
const book = (id) => {
	return http({
		url: `bookshop/book/${id}`,
		method: 'get'
	})
}

// 登录状态时查询图书是否被收藏
const favStatus = (id) => {
	return http({
		url: `bookshop/book/fav/${id}`,
		method: 'get'
	})
}

// 收藏一本图书
const favbook = (id) => {
	return http({
		url: `bookshop/book/fav/${id}`,
		method: 'put'
	})
}

export default {
	category,
	categoryBooks,
	book,
	favbook,
	favStatus,categoryAdimgs
}
