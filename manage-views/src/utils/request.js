import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
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
      config.headers['Authorization'] = 'Bearer ' + getToken()
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
    const { status } = response
    const { message } = response.data

    if (status && status >= 200) {
      Message({
        message: message,
        type: 'success',
        duration: 5 * 1000
      })
    } else if (status && status >= 400) {
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response

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
    const { message } = error.response.data
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const request = ({ method, url, data, headers }) => {
  headers = headers || {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  method = method.toLocaleLowerCase() || 'GET'
  return service({
    method,
    url,
    data,
    headers
  })
}

export default request
