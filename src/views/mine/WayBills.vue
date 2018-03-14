<template lang="pug">
  section.way-bill-list
    section.body
      mt-navbar(v-model='tabActive', ref="navBar")
        mt-tab-item#0 全部
        mt-tab-item#1 待付款
        mt-tab-item#2 进行中
        mt-tab-item#3 已完成
        mt-tab-item#4 失效
      mt-tab-container.overflow-scroll(v-model='tabActive', :swipeable="true", disable-swipe, ref="tabContainer")
        mt-tab-container-item#0(v-for="index in 5", :id="(index - 1) + ''", v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
          .card-body
            .no-data(v-if="!wayBillList.length")
              i.iconfont.icon-car
              p 没有订单数据
            kt-card-item.stress(v-for='wayBill in wayBillList', :key='wayBill.number', :header-left='wayBill.name', :header-right="wayBill.status | wayBillStatusFormat")
              //- span.color-primary(slot='arrow') {{wayBill.status | wayBillStatusFormat}}
              .content
                .content-row 运单编号：{{wayBill.number}}
                .content-row 订单宝号：{{wayBill.orderNumber}}
                .content-row
                  .content-left.flex-item 车辆数量：{{wayBill.vehicleCount}}
                .content-row
                  span.mr10(v-for="item in wayBill.detail") {{item.model}} {{item.price | ktCurrency('', '万元')}} {{item.count}} 辆
              .buttons.text-right.ui-border-t(slot='footer')
                button.ui-border-radius(@click="showVehicleInfo(wayBill)") 车辆信息
                button.ui-border-radius.warning(@click="showWayBillDetail(wayBill)") 运单详情
            .no-more-data(v-if="noMoreData")
              small 已经到底了

</template>

<script>
import MineMixin from '@/views/mine/mixin.js'
import { wayBills } from '@/common/resources.js'
import { debounce } from 'lodash'

export default {
  mixins: [MineMixin],
  async mounted() {
    this.updateContainerHeight()
    this.search()
  },

  created() {
    this.filter = { ...this.filter, ...this.$route.query }
    this._fetchData()
  },

  methods: {
    // 计算container高度
    updateContainerHeight() {
      let navBarHeight = 0
      let headerHeight = 0
      const $app = this.$root.$children[0]

      this.$nextTick(() => {
        navBarHeight = this.$refs.navBar.$el.getBoundingClientRect().height
        if ($app.headerShow) {
          headerHeight = $app.$refs.header.$el.getBoundingClientRect().height
        }
        this.$refs.tabContainer.$el.style.height = `${window.innerHeight - navBarHeight - headerHeight}px`
      })
    },

    showVehicleInfo(model) {
      this.$router.push({ name: 'wayBillVehicles', params: { id: model.id } })
    },

    showWayBillDetail(model) {
      this.$router.push({ name: 'wayBillDetail', params: { id: model.id } })
    },

    loadMore: debounce(function() {
      this._fetchData(true)
    }, 500),

    search() {
      this.noMoreData = false
      this.$router.replace({
        name: this.$route.name,
        query: { ...this.filter, page: 1 }
      })
    },

    async _fetchData(isMore) {
      if (isMore) this.filter.page = +this.filter.page + 1
      else this.filter.page = 1

      this.loading = true
      if (this.filter.status === '0') this.filter.status = null

      const res = await wayBills.get(this.pruneParams(this.filter)).then(res => res.json()).catch(res => {
        this.loading = false
        throw res
      })

      if (isMore) this.wayBillList = this.wayBillList.concat(res.data.data)
      else this.wayBillList = res.data.data

      if (res.data.data.length) {
        this.loading = false
      } else {
        this.loading = true
        if (this.wayBillList.length) this.noMoreData = true
      }
    }
  },

  watch: {
    tabActive() {
      if (this.tabActive !== '0') {
        this.filter.status = this.tabActive
      } else {
        this.filter.status = null
      }
      this.search()
    },
    $route() {
      this._fetchData()
    }
  },

  data() {
    return {
      filter: {
        page: 1,
        size: 10,
        status: '0'
      },
      loading: false,
      noMoreData: false,
      wayBillList: [],
      tabActive: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-more-data {
  text-align: center;
  padding: 10px;
}
</style>
