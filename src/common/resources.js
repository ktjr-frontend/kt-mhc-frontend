import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

const previousRequestMap = {}
const commonOpts = {
  // emulateJSON: true,
  before(request) {
    const key = Vue.url(request.url, request.params)
    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
  }
}

const resource = Vue.resource
export const login = resource('login', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 登录
export const captcha = resource('captcha', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 登录
export const users = resource('users', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单列表
export const orders = resource('orders', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单列表
export const providers = resource('providers', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单列表
export const vehicles = resource('vehicles', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单列表