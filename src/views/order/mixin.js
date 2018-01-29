import { includes, keyBy } from 'lodash'
import { ORDER_STATUS_MAP } from '@/constants.js'

const orderStatusList = [{
  name: '全部',
  value: '0'
}, {
  name: '待完善资料',
  value: ORDER_STATUS_MAP.WAIT_FILL_MATERIAL
}, {
  name: '待初审',
  value: ORDER_STATUS_MAP.WAIT_FOR_FIRST_CHECK
}, {
  name: '初审未通过',
  value: ORDER_STATUS_MAP.FISRT_CHECK_REJECTED
}, {
  name: '待验车',
  value: ORDER_STATUS_MAP.WAIT_FOR_CHECK_CAR
}, {
  name: '验车未通过',
  value: ORDER_STATUS_MAP.CHECK_CAR_REJECTED
}, {
  name: '放款审核通过',
  value: ORDER_STATUS_MAP.LOAN_CHECK_SUCCESS
}, {
  name: '放款审核未通过',
  value: ORDER_STATUS_MAP.LOAN_CHECK_FAILED
}, {
  name: '已放款',
  value: ORDER_STATUS_MAP.LOANED
}, {
  name: '在途中',
  value: ORDER_STATUS_MAP.ON_THE_WAY
}, {
  name: '仓库验车不通过',
  value: ORDER_STATUS_MAP.STORE_CHECK_FAILED
}, {
  name: '已入库',
  value: ORDER_STATUS_MAP.PUT_IN_STORE
}, {
  name: '还款不通过',
  value: ORDER_STATUS_MAP.REPAYMENT_FAILED
}, {
  name: '待提车',
  value: ORDER_STATUS_MAP.WAIT_FOR_PICK
}, {
  name: '提车审核不通过',
  value: ORDER_STATUS_MAP.PICK_CHECK_FAILED
}, {
  name: '已完成',
  value: ORDER_STATUS_MAP.PICK_SUCCESS
}, {
  name: '已关闭',
  value: ORDER_STATUS_MAP.CLOSED
}, {
  name: '待结算审核',
  value: ORDER_STATUS_MAP.WAIT_FOT_SETTLEMENT
}]

const orderStatusMap = keyBy(orderStatusList, 'value')

const orderStatusClassMap = {

}

export default {
  filters: {
    orderStatusFormat(value) {
      return orderStatusMap[value] ? orderStatusMap[value].label : ''
    },
    orderStatusClass(value) {
      return orderStatusClassMap[value] || ''
    }
  },

  methods: {
    // 关闭订单
    async closeOrder(order) {
      const action = await this.$confirm('确定关闭订单？')
      if (action === 'confirm') {
        order.status = this.ORDER_STATUS_MAP.CLOSED
      }
    },

    // 编辑订单
    editOrder(order) {
      console.log(order)
      this.$router.push({
        name: 'orderEdit',
        params: {
          id: order.id
        }
      })
    },

    // 订单详情
    goToDetail(order) {
      this.$router.push({
        name: 'orderDetail',
        params: {
          id: order.id
        }
      })
    },

    canEditStatus(status) {
      return includes([
        ORDER_STATUS_MAP.WAIT_FILL_MATERIAL,
        ORDER_STATUS_MAP.WAIT_FOR_FIRST_CHECK,
        ORDER_STATUS_MAP.FISRT_CHECK_REJECTED,
        ORDER_STATUS_MAP.CHECK_CAR_REJECTED,
        ORDER_STATUS_MAP.LOAN_CHECK_FAILED
      ], status)
    },
    canCloseStatus(status) {
      return includes([
        ORDER_STATUS_MAP.WAIT_FILL_MATERIAL,
        ORDER_STATUS_MAP.FISRT_CHECK_REJECTED,
        ORDER_STATUS_MAP.WAIT_FOR_CHECK_CAR,
        ORDER_STATUS_MAP.CHECK_CAR_REJECTED,
        ORDER_STATUS_MAP.WAIT_FOR_LOAN,
        ORDER_STATUS_MAP.LOAN_CHECK_FAILED
      ], status)
    }
  },

  computed: {

  },

  data() {
    return {
      orderStatusList
    }
  }
}
