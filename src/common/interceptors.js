import Vue from 'vue'
import { includes, isObject, isFunction } from 'lodash'
import { MessageBox, Indicator } from 'mint-ui'
import store from '@/store'
import { read, save } from '@/storage'
import { RET_CODE_MAP } from '@/constants.js'
import moment from 'moment'
// import msgBox from '@/common/custom_msgbox.js'

const CACHE_URLS = [] // 需要缓存的接口
const requestMap = {} // 请求地址
let indicatorHandle = 0

export default [
  // app网络检查
  function(request, next) {
    if (~process.env.NODE_ENV.indexOf('app')) {
      if (!navigator.onLine) {
        const payload = { 'message': '您的网络没有连接！' }
        next({
          status: 400,
          ok: false,
          headers: {
            Date: new Date()
          },
          statusText: 'OK',
          data: payload,
          body: payload,
          json() {
            return payload
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  },
  // 请求超时
  function(request, next) {
    let timeout
    if (request._timeout) { // 超时自定义
      timeout = setTimeout(() => {
        if (request.onTimeout) request.onTimeout(request)
        request.abort()
      }, request._timeout)
    }
    if (request._showLoadingStatus) { // 是否显示loading状态
      Indicator.open({ spinnerType: 'double-bounce' })
      clearTimeout(indicatorHandle)
    }

    next(res => {
      clearTimeout(timeout)
      indicatorHandle = setTimeout(() => {
        Indicator.close()
      }, 300)
    })
  },
  // 控制重复请求
  function(request, next) {
    let key
    // abort the same post request
    if (/POST|PUT|DELETE/.test(request.method)) {
      key = `${request.method}${request.url}${JSON.stringify(request.body)}`
      // abort the existed request
      if (key && requestMap[key]) {
        key = null
        setTimeout(() => {
          request.abort()
        })
      } else {
        requestMap[key] = request
      }
    }

    request.headers.set('x-auth-token', store.getters.token)

    next((response) => {
      // delete current request in the map
      if (key) {
        delete requestMap[key]
      }
    })
  },
  // 缓存接口
  function(request, next) {
    let key = Vue.url(request.url, request.params)
    request.cache = includes(CACHE_URLS, key.split('?')[0])

    if (!request.params.no_cache && read(key)) {
      console.log(key, 'api cache')
      next({
        status: 200,
        ok: true,
        headers: {
          Date: new Date()
        },
        statusText: 'OK',
        data: read(key) || '{}',
        body: read(key) || '{}',
        json() {
          return JSON.parse(read(key) || '{}')
        }
      })
    } else {
      next()
    }
  },
  // 状态码
  function(request, next) {
    next((res) => {
      const date = isFunction(res.headers.get) ? res.headers.get('Date') : new Date()
      store.commit('updateNow', moment(date).toDate())
      const code = res.body.code || res.status + ''
      if (code === '419' || code === '401') {
        if (request.params.skipAuth) {
          store.dispatch('logout', true)
        } else {
          MessageBox('提示', res.body.message || '无访问权限！')
          store.dispatch('logout')
        }
      } else if (code === '400') {
        MessageBox('提示', res.body.message || '请求失败！')
      } else if (code === '403') {
        MessageBox('提示', res.body.message || '您无此权限！')
      } else if (code === '404') {
        MessageBox('提示', res.body.message || '访问错误！')
      } else if (code === '500' || code === '502') {
        MessageBox('提示', res.body.message || '抱歉！服务器忙。')
      } else if (code === '200') {
        if (!request.notApi && !request.params.skipAuth && (!res.body || res.body.code !== RET_CODE_MAP.OK)) {
          MessageBox('提示', res.body ? res.body.message : '登录失败或者访问无权限')
        } else {
          if (request.cache) { // 缓存需要缓存的接口
            let key = Vue.url(request.url, request.params)
            let body = isObject(res.body) ? JSON.stringify(res.body) : res.body
            save(key, body)
          }
        }
      }
    })
  }
]
