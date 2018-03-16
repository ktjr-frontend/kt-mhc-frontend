<template lang="pug">
  section.orders
    header
      h2 我的额度（元）
        .show-amount-tip(@click="showAmountTip")
          i.iconfont.icon-info2.ft12.mr5
          | 额度利率说明
      p.amount-line
        | 总额度：
        span.amount.mr30 0
        | 已用额度：
        span.amount 0
      //- button.show-amount-tip(@click="showAmountTip") 额度利率说明
    .search-column.flex.scroll-fixed(ref="searchColumn")
      .flex-item
        button(@click="showSearchBox") 搜索车架号、供应商/经销商、车型等关键词
      .order-status.flex-item(@click="toggleStatusFilter")
        i.iconfont.icon-filter
        | 订单状态
      .order-status-body(:style="statusFilterStyle", v-show="statusFilterVisible", @touchstart="statusFilterVisible = false")
        ul.order-status-list.flex.flex-start.flex-wrap
          li(v-for="item in orderStatusList", :key="item.value")
            .inner.ui-border-radius(@touchstart.stop="search(item)", :class="{'selected': filter.status === item.value}") {{item.label}}
    .card-body(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
      .no-data(v-if="!orderList.length")
        i.iconfont.icon-car
        p 没有订单数据
      kt-card-item(v-for='order in orderList', :key='order.no', :arrow-visible="false")
        span(slot="headerRight")
          i.iconfont.icon-edit.ft14.smaller(@click="$router.push({name: 'orderEdit', params: {id: order.id}})")
        span(slot="headerLeft")
          | 订单号：{{order.no}}
          .smaller.ml5 {{order.applicationDate | moment("YYYY-MM-DD")}}
        //- span.color-primary(@click="goToDetail(order)", slot='arrow') {{order.status | orderStatusFormat}}
        .content(@click="goToDetail(order)")
          .content-row 垫资金额：{{order.loanAmount | ktCurrency}}
          .content-row 供应商：{{order.supplier}}
          .content-row.flex
            .content-left.flex-item 订单描述：{{order.brandName}} {{order.seriesName}} {{order.modelName}}
            .content-right 共 {{order.vehicleNumber}} 辆
          //- .content-row 订单简称：{{order.name}}
        .buttons.flex.ui-border-t(slot='footer')
          .text-left.flex-item
            button.ui-border-radius(v-if="canCloseStatus(order.status)", @click="closeOrder(order)") 取消订单
            button.ui-border-radius(v-if="canPickStatus(order.status)", @click="showApplyActions(order)") 申请提车
            //- button.ui-border-radius(v-if="canUploadSettlementStatus(order.status)", @click="showSettlement(order)") 上传结算凭证
          .text-right
            span.color-primary(@click="goToDetail(order)", slot='arrow') {{order.status | orderStatusFormat}}
            i.iconfont.icon-you.color-gray.ft12.ml5
      .no-more-data(v-if="noMoreData && orderList.length")
        small 已经到底了
    mt-popup.popup-box(v-model='searchBoxVisible', position='right')
      search(:close="closeSearchBox", ref="searchBox")
    mt-popup.popup-box(v-model='cancelOrderVisible', position='right')
      cancel-order-reason(:close="closeCancelOrderBox", @popup-confirmed="cancelOrderConfirm", ref="cancelOrder")
    mt-popup.popup-box(v-model='procedureBoxVisible', position='right')
      apply-procedure(:close="closeProcedureBox")
    //- mt-actionsheet(:actions='applyActions', v-model='applySheetVisible')
    kt-actionsheet(:actions='applyActions', v-model='applySheetVisible')
    .fixed-footer-placeholder
    footer.fixed-footer
      //- .tab-item.flex1(@click="showApplyActions")
        i.iconfont.icon-car
        p 申请提车
      //- .tab-item.flex1.ui-border-l(@click="showProcedureBox()")
        i.iconfont.icon-key
        p 申请手续
      .tab-item.flex2.tab-btn
        button(@click="$router.push({name: 'orderEdit', params: {id: 'add'}})") 申请订单融资

</template>

<script>
import Search from '@/views/order/Search.vue'
import ApplyProcedure from '@/views/order/ApplyProcedure.vue'
import CancelOrderReason from '@/views/order/CancelOrderReason.vue'
import { orders } from '@/common/resources.js'
import { debounce } from 'lodash'
import OrderMixin from '@/views/order/mixin.js'

export default {
  mixins: [OrderMixin],
  components: { Search, ApplyProcedure, CancelOrderReason },
  methods: {
    headerClose() {
      this.$router.push({
        name: this.$route.query.from || 'menu'
      })
    },

    async closeOrder(order) {
      const action = await this.$confirm('确定取消订单？')
      if (action === 'confirm') {
        this.$refs.cancelOrder.init(order)
        this.showCancelOrderBox()
        // order.status = this.ORDER_STATUS_MAP.CLOSED
      }
    },

    async cancelOrderConfirm(data) {
      data.order.status = this.ORDER_STATUS_MAP.CLOSED
      console.log(data.reason.reason)
      this.closeCancelOrderBox()
    },

    showAmountTip() {
      this.$msgBox({
        title: '额度详细说明',
        message: `
          <section class="dialog-message">
            <p>我的额度为以下两种模式之和：</p>
            <p>对于代购车辆&le;2辆车的订单，累计额度为<em>150万</em>，利率<em>5%</em>；</p>
            <p>对于订购车辆&gt;2辆车的订单，累计额度为<em>400万</em>，利率<em>4.5%</em>；</p>
          </section>
        `
      })
    },

    backButtonAction() {
      if (this.searchBoxVisible) {
        this.searchBoxVisible = false
      } else if (this.cancelOrderVisible) {
        this.cancelOrderVisible = false
      } else if (this.procedureBoxVisible) {
        this.procedureBoxVisible = false
      } else if (this.applySheetVisible) {
        this.applySheetVisible = false
      } else {
        this.routerBack()
      }
    },

    // 上传结算支付凭证
    showSettlement(order) {
      this.$router.push({
        name: 'settlementDoc',
        params: {
          id: order.id
        }
      })
    },

    // 显示搜索框
    showSearchBox() {
      this.$router.push({
        name: 'ordersSearch'
      })

      // this.searchBoxVisible = true
      // this.$nextTick(() => {
      //   this.$refs.searchBox.updateContainerHeight()
      // })
    },

    closeSearchBox() {
      this.routerBack()
      // this.searchBoxVisible = false
    },

    // 显示关闭原因
    showCancelOrderBox() {
      this.cancelOrderVisible = true
    },

    closeCancelOrderBox() {
      this.cancelOrderVisible = false
    },

    // 显示申请手续
    showProcedureBox() {
      this.procedureBoxVisible = true
    },

    closeProcedureBox() {
      this.procedureBoxVisible = false
    },

    // 显示申请action菜单
    showApplyActions(order) {
      this.$router.push({
        name: 'pickCar',
        params: { id: order.id }
      })
      // this.applySheetVisible = true
    },

    // 筛选
    search(item) {
      this.filter.status = item.value
      this.filter.reqDatetime = null
      this.$router.push({
        name: this.$route.name,
        query: this.pruneParams(this.filter)
      })
      this.statusFilterVisible = false
    },

    // 切换状态筛选条件
    toggleStatusFilter() {
      const rect = this.$refs.searchColumn.getBoundingClientRect()
      this.statusFilterStyle.top = (rect.top + rect.height) + 'px'
      this.statusFilterVisible = !this.statusFilterVisible
    },

    loadMore: debounce(function() {
      this._fetchData(true)
    }, 500),

    // 获取订单列表
    async _fetchData(isMore) {
      if (isMore) this.filter.page += 1

      this.loading = true
      const res = await orders
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = true
          throw res
        })

      if (isMore) this.orderList = this.orderList.concat(res.data)
      else this.orderList = res.data

      if (res.data.length) {
        this.loading = false
      } else {
        this.loading = true
        this.noMoreData = true
      }
    }
  },

  watch: {
    '$route' () {
      this._fetchData()
    }
  },

  created() {
    Object.assign(this.filter, this.$route.query)
    this._fetchData()
  },

  data() {
    const _self = this
    return {
      applySheetVisible: false, // 申请菜单
      statusFilterVisible: false,
      statusFilterStyle: {},
      searchBoxVisible: false, // 搜索层显示控制
      cancelOrderVisible: false, // 搜索层显示控制
      procedureBoxVisible: false, // 搜索层显示控制
      loading: false,
      noMoreData: false,
      applyActions: [{
        name: '申请提车',
        method() {
          _self.applySheetVisible = true
          _self.$router.push({ name: 'pickCar' })
        }
      }, {
        name: `
          <p>物权转让</p>
          <small>（将车辆物权转移给下游，有下游公司自行申请提车）</small>
        `,
        method() {
          _self.applySheetVisible = true
          _self.$router.push({ name: 'interestTransfer' })
        }
      }],
      filter: {
        status: null,
        reqDatetime: null,
        reqCount: 10
      },
      orderList: []
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 130px;
  background-color: $primary-color;
  background-image: linear-gradient(0, #212a32 0%, #39414a 100%);
  color: white;
  padding: 10px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    position: relative;
    font-size: 16px;
    &:after {
      content: '';
      position: absolute;
      width: 12.5em;
      left: 0;
      bottom: -15px;
      border: 1px solid $border-color;
      transform: scale(0.5);
      transform-origin: 0;
    }
  }
}

.amount-line {
  margin-top: 20px;
}

.amount {
  color: $primary-color;
  font-size: 30px;
  font-family: franklin; // margin-top: 15px;
}

.show-amount-tip {
  position: absolute;
  right: -90px;
  top: -10px;
  font-size: $font-size-xxs;
}

.search-column {
  padding: 10px;
  background: white;
  position: relative;
  z-index: 9;
  button {
    width: 100%;
    white-space: nowrap;
    padding: 5px;
    background: $minor-bg-color;
    border: 0;
    border-radius: $border-radius;
    color: $placeholder-color;
  }
}

.icon-filter {
  margin-right: 5px;
}

.order-status-body {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .3);
}

.order-status-list {
  background: white;
  padding: 10px 5px;
  li {
    width: 33.33%;
    white-space: nowrap;
  }
  .inner {
    padding: 5px 8px;
    margin: 5px;
    text-align: center; // border-radius: $border-radius;
    &.selected {
      color: $font-color-em;
    }
  }
}

.order-status {
  width: 80px;
  flex: none;
  text-align: right;
  color: $primary-color;
}

.content {
  &:active {
    opacity: 0.85;
  }
}

.content-left {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-right {
  text-align: right;
}
</style>
