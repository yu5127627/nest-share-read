import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { delSessionStorage } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  transformRequest: [
    (data, config) => {
      switch (config['Content-Type'].toLowerCase()) {
        case 'application/x-www-form-urlencoded': {
          return qs.stringify(data)
        }
        case 'multipart/form-data;charset=utf-8': {
          return data
        }
        default: {
          return JSON.stringify(data)
        }
      }
    }
  ]
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { message, code } = response.data

    if (code && code === 2001 || code === 2003 || code === 2010 || code === 2011 || code === 2012 || code === 2002) {
      Message({
        message: message,
        type: 'success',
        duration: 5 * 1000
      })
    } else if (code && code === 2004) {
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data

    /*
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
    */
  },
  error => {
    console.log(error.response.data) // for debug
    const { statusCode } = error.response.data
    let message = ''
    switch (statusCode) {
      case 401:
        message = '认证失败，请重新登录！'
        delSessionStorage('token')
        break
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
