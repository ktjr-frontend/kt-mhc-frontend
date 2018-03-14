import { includes, keyBy } from 'lodash'
import { ORDER_STATUS_MAP, SETTLE_STATUS_MAP } from '@/constants.js'

const orderStatusList = [{
  label: '全部',
  value: '0'
}, {
  label: '待补齐资料',
  value: ORDER_STATUS_MAP.WAIT_FILL_MATERIAL
}, {
  label: '待审核',
  value: ORDER_STATUS_MAP.WAIT_FOR_FIRST_CHECK
}, {
  label: '审核未通过',
  value: ORDER_STATUS_MAP.FISRT_CHECK_REJECTED
}, {
  label: '待物流验车',
  value: ORDER_STATUS_MAP.WAIT_FOR_CHECK_CAR
}, {
  label: '物流已验车',
  value: ORDER_STATUS_MAP.CHECK_PASSED
}, {
  label: '已发运',
  value: ORDER_STATUS_MAP.DISPATCHED
}, {
  label: '在途中',
  value: ORDER_STATUS_MAP.ON_THE_WAY
}, {
  label: '仓库验车不通过',
  value: ORDER_STATUS_MAP.STORE_CHECK_FAILED
}, {
  label: '已入库',
  value: ORDER_STATUS_MAP.PUT_IN_STORE
}, {
  label: '待提车',
  value: ORDER_STATUS_MAP.WAIT_FOR_PICK
}, {
  label: '已完成',
  value: ORDER_STATUS_MAP.PICK_SUCCESS
}, {
  label: '已取消',
  value: ORDER_STATUS_MAP.CLOSED
}]

const settlementStatusList = [{
  label: '结算待支付',
  value: SETTLE_STATUS_MAP.WAIT_FOR_PAY
}, {
  label: '待结算审核',
  value: SETTLE_STATUS_MAP.CHECKING
}, {
  label: '还款审核通过',
  value: SETTLE_STATUS_MAP.REJECT
}, {
  label: '审核通过',
  value: SETTLE_STATUS_MAP.PASSED
}]

const orderStatusMap = keyBy(orderStatusList, 'value')
const settlementStatusMap = keyBy(settlementStatusList, 'value')

const orderStatusClassMap = {

}

export default {
  filters: {
    orderStatusFormat(value) {
      return orderStatusMap[value] ? orderStatusMap[value].label : ''
    },
    orderStatusClass(value) {
      return orderStatusClassMap[value] || ''
    },
    settlementStatusFormat(value) {
      return settlementStatusMap[value] ? settlementStatusMap[value].label : ''
    }
  },

  methods: {
    // 关闭订单
    async closeOrder(order) {
      const action = await this.$confirm('确定取消订单？')
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
      // console.log(order)
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
        ORDER_STATUS_MAP.WAIT_FOR_FIRST_CHECK
      ], status)
    },

    canPickStatus(status) {
      return includes([
        ORDER_STATUS_MAP.PUT_IN_STORE
      ], status)
    },

    canCloseStatus(status) {
      return includes([
        ORDER_STATUS_MAP.WAIT_FILL_MATERIAL,
        ORDER_STATUS_MAP.FISRT_CHECK_REJECTED,
        ORDER_STATUS_MAP.WAIT_FOR_CHECK_CAR,
        ORDER_STATUS_MAP.DISPATCHED
      ], status)
    }
  },

  computed: {

  },

  data() {
    return {
      orderStatusList,
      orderStatusMap,
      settlementStatusList,
      settlementStatusMap
    }
  }
}
