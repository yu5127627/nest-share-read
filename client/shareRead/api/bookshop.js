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

// 一本图书
const book = (id) => {
	return http({
		url: `bookshop/book/${id}`,
		method: 'get'
	})
}

export default {
	category,
	categoryBooks,
	book
}
