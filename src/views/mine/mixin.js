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

const deliverTypeList = [{
  label: '仓库',
  value: '1'
}, {
  label: '到店',
  value: '2'
}]

const jobTypeList = [{
  label: '销售主管',
  value: '1'
}, {
  label: '销售顾问',
  value: '2'
}, {
  label: '管理员',
  value: '3'
}]

const pickCarStatusList = [{
  label: '签章成功',
  label2: '可提车',
  value: '1'
}, {
  label: '未签章',
  label2: '不可提车',
  value: '2'
}]

const certifyStatusList = [{
  label: '未认证',
  value: 'initial'
}, {
  label: '已认证',
  value: 'passed'
}, {
  label: '审核中',
  value: 'checking'
}, {
  label: '认证失败',
  value: 'rejected'
}]

const messageStatusList = [{
  label: '未读',
  value: '1'
}, {
  label: '已读',
  value: '2'
}]

const companyTypeMap = keyBy(companyTypeList, 'value')
const wayBillStatusMap = keyBy(wayBillStatusList, 'value')
const wayBillVehicleStatusMap = keyBy(wayBillVehicleStatusList, 'value')
const transportTypeMap = keyBy(transportTypeList, 'value')
const deliverTypeMap = keyBy(deliverTypeList, 'value')
const jobTypeMap = keyBy(jobTypeList, 'value')
const pickCarStatusMap = keyBy(pickCarStatusList, 'value')
const certifyStatusMap = keyBy(certifyStatusList, 'value')
const messageStatusMap = keyBy(messageStatusList, 'value')

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
    },
    deliverTypeFormat(value) {
      return deliverTypeMap[value] ? deliverTypeMap[value].label : ''
    },
    jobTypeFormat(value) {
      return jobTypeMap[value] ? jobTypeMap[value].label : ''
    },
    pickCarLetterStatusFormat(value) {
      return pickCarStatusMap[value] ? pickCarStatusMap[value].label : ''
    },
    // 是否可以提车
    pickCarLetterStatusFormat2(value) {
      return pickCarStatusMap[value] ? pickCarStatusMap[value].label2 : ''
    },
    certifyStatusFormat(value) {
      return certifyStatusMap[value] ? certifyStatusMap[value].label : ''
    },
    messageStatusFormat(value) {
      return messageStatusMap[value] ? messageStatusMap[value].label : ''
    }
  },

  methods: {
    headerClose() {
      this.$router.push({
        name: 'mine'
      })
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
      transportTypeMap,
      deliverTypeList,
      deliverTypeMap,
      jobTypeList,
      jobTypeMap,
      pickCarStatusList,
      pickCarStatusMap,
      certifyStatusList,
      certifyStatusMap,
      messageStatusList,
      messageStatusMap
    }
  }
}
