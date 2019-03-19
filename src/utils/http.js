/**
 * 封装之后的axios
 * 1：对http请求前后进行拦截
 * 2：处理get/ post请求参数
 * 3：token处理
 */
import axios from 'axios'
import Qs from 'qs'
// setting header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;utf-8'
//
const http = axios.create({
  baseURL: process.env.BASE_API, // base url for http request
  timeout: 4 * 5000 // request overtime time
})
// request intercept
http.interceptors.request.use(config => {
  // 1:set token

  // deal get requerst
  if (config.method === 'get') {
    config.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'brackets' })
  }
  // deal post request 这个时候会处理成a=1&b=2的形式
  /* if (config.method === 'post') {
    config.transformRequest = [function (data) {
      let ret = ''
      for (let key in data) {
        ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`
      }
      console.log(ret)
      return ret
    }]
  } */
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone intercept
http.interceptors.response.use(response => {
  // deal response
  if (response.status === 200 && typeof (response.data) === 'string') {
    response = JSON.parse(response)
  }
  // return real data entity
  return response.data
}, error => {
  console.error('err' + error)// for debug
  return Promise.reject(error)
})
export default http
