import { find } from 'lodash'

const orderStatusList = [{
  name: '全部',
  value: '0'
}, {
  name: '待供应上确认',
  value: '1'
}, {
  name: '待经销商确认',
  value: '2'
}, {
  name: '待经销商修改',
  value: '3'
}, {
  name: '待供应商修改',
  value: '4'
}, {
  name: '待完善资料',
  value: '5'
}, {
  name: '待初审',
  value: '6'
}, {
  name: '待审批',
  value: '7'
}, {
  name: '待签约',
  value: '8'
}, {
  name: '待放款',
  value: '9'
}, {
  name: '已放款',
  value: '10'
}, {
  name: '待上传照片',
  value: '11'
}, {
  name: '已完成',
  value: '12'
}, {
  name: '已关闭',
  value: '13'
}]

const orderStatusClassMap = {

}

export default {
  filters: {
    orderStatusFormat(value) {
      const status = find(orderStatusList, od => od.value === value)
      return status ? status.name : ''
    },
    orderStatusClass(value) {
      return orderStatusClassMap[value] || ''
    }
  },
  methods: {

  },
  data() {
    return {
      orderStatusList
    }
  }
}
