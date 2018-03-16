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
export const login = resource('users/login', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 登录
export const captcha = resource('captcha', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 验证码
export const users = resource('users', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 用户信息
export const orders = resource('financings{/id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单
export const pickups = resource('pickups{/id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 提车单
export const settlements = resource('settlements{/id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 结算单
export const cooperators = resource('cooperators', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 供应商列表
export const regions = resource('regions', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 地域列表
export const warehouses = resource('warehouses', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 仓库列表
export const vehicles = resource('vehicles', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 汽车列表
export const company = resource('company', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 公司列表
export const wayBills = resource('way_bills', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 运单列表
export const wayBillVehicles = resource('way_bill_vehicles{/id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 运单的车辆信息
export const pickCarLetters = resource('pick_car_letters{/id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 提车委托申请
export const messages = resource('messages{/:id}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消息列表

export const vehicleBrands = resource('vehicle/brand/list', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 汽车品牌列表
export const vehicleSeries = resource('vehicle/series{/brandName}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 车系列表
export const vehiclesPickup = resource('vehicles/pickup', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 车库列表
export const vehicleColors = resource('vehicle/series/color{/brandName}{/seriesName}{/modelName}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 内饰外观颜色
export const logisticsPrice = resource('logistics/price{/startingAddressCode}{/destinationAddressCode}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 物流费用
export const logisticsQuery = resource('logistics/query{/orderId}', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 订单在途信息
