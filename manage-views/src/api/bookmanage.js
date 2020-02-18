import request from '@/api/config'
import { isEnglish, isChinese } from '@/utils'

// 所有分类
const category = () => {
  return request({
    url: 'category',
    method: 'get'
  })
}

// add 分类
const addCategory = data => {
  return request({
    url: 'category',
    method: 'post',
    data
  })
}

// edit分类
const editCategory = (id, data) => {
  return request({
    url: `category/${id}`,
    method: 'put',
    data
  })
}

// del分类
const delCategory = id => {
  return request({
    url: `category/${id}`,
    method: 'DELETE'
  })
}

// 批量删除分类
const batchDelCategory = data => {
  return request({
    url: 'category',
    method: 'delete',
    data
  })
}

// 所有图书
const books = query => {
  const { limit, page, category, name } = query
  let url = `books?limit=${limit}&page=${page}`
  url = category ? url + `&filter=category.id||$eq||${category}` : url
  if (name) {
    url = isChinese(name) ? url + `&filter=zh_name||$cont||${name}` : url
    url = isEnglish(name) ? url + `&filter=en_name||$cont||${name}` : url
  }
  return request({
    url,
    method: 'get'
  })
}

// add 一本图书、
const addBooks = (data) => {
  return request({
    url: 'books',
    method: 'post',
    data
  })
}

const batchDelBooks = data => {
  return request({
    url: 'books',
    method: 'delete',
    data
  })
}

// del一本图书
const delBooks = id => {
  return request({
    url: `books/${id}`,
    method: 'DELETE'
  })
}

// edit一本图书
const editBooks = (id, data) => {
  return request({
    url: `books/${id}`,
    method: 'put',
    data
  })
}

// 封面图上传
const cover = data => {
  return request({
    url: `upload/cover`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' }
  })
}

// 目录截图上传
const catalog = data => {
  return request({
    url: `upload/catalog`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
    data
  })
}

// 图书上传
const book = data => {
  return request({
    url: `upload/book`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
    data
  })
}

export default {
  category,
  addCategory,
  editCategory,
  delCategory,
  batchDelCategory,
  books,
  addBooks,
  delBooks,
  batchDelBooks,
  editBooks,
  cover,
  catalog,
  book
}
