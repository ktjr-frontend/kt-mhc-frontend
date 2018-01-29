import { keyBy } from 'lodash'

const companyTypeList = [{
  label: '品牌4s店',
  value: '1'
}, {
  label: '港口商家',
  value: '2'
}, {
  label: '综合展厅',
  value: '3'
}, {
  label: '资源公司',
  value: '4'
}]

const wayBillStatusList = [{
  label: '待付款',
  value: '1'
}, {
  label: '进行中',
  value: '2'
}, {
  label: '已完成',
  value: '3'
}, {
  label: '失效',
  value: '4'
}]

const wayBillVehicleStatusList = [{
  label: '待验车',
  value: '1'
}, {
  label: '待发运',
  value: '2'
}, {
  label: '在途',
  value: '3'
}, {
  label: '到达',
  value: '4'
}, {
  label: '完成',
  value: '5'
}, {
  label: '失效',
  value: '6'
}]

const transportTypeList = [{
  label: '大板车',
  value: '1'
}, {
  label: '救援车',
  value: '2'
}]

const companyTypeMap = keyBy(companyTypeList, 'value')
const wayBillStatusMap = keyBy(wayBillStatusList, 'value')
const wayBillVehicleStatusMap = keyBy(wayBillVehicleStatusList, 'value')
const transportTypeMap = keyBy(transportTypeList, 'value')

export default {
  filters: {
    companyTypeFormat(value) {
      return companyTypeMap[value] ? companyTypeMap[value].label : ''
    },
    wayBillStatusFormat(value) {
      return wayBillStatusMap[value] ? wayBillStatusMap[value].label : ''
    },
    wayBillVehicleStatusFormat(value) {
      return wayBillVehicleStatusMap[value] ? wayBillVehicleStatusMap[value].label : ''
    },
    transportTypeFormat(value) {
      return transportTypeMap[value] ? transportTypeMap[value].label : ''
    }
  },

  data() {
    return {
      companyTypeList,
      companyTypeMap,
      wayBillStatusList,
      wayBillStatusMap,
      wayBillVehicleStatusList,
      wayBillVehicleStatusMap,
      transportTypeList,
      transportTypeMap
    }
  }
}