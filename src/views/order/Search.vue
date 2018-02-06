<template lang="pug">
  section.search-orders
    mt-header(ref="header", title="订单搜索", v-if="openType === 'popup'")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    header.flex.search-header(ref="searchHeader")
      .search-input.flex-item.flex
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @input="inputChange($event)" @keyup.13="search", :value="filter.value", placeholder="搜索")
        i.iconfont.icon-qingchu(v-if="filter.value", @click="clearSearch")
      button.cancel-btn(@click.prevent="cancel") 取消
    section.body
      mt-navbar(v-model='filter.tabActive', ref="navBar")
        mt-tab-item#frameNo 车架号后6位
        mt-tab-item#model 车型
        mt-tab-item#provider 供应商/经销商
      mt-tab-container.overflow-scroll(v-model='filter.tabActive', :swipeable="true", disable-swipe, ref="tabContainer")
        mt-tab-container-item(v-for="id in ['frameNo', 'model', 'provider']", :id="id", v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
          .no-data(v-if="!orderList.length")
            i.iconfont.icon-car
            p 此搜索条件下没有结果
          kt-card-item(v-for='order in orderList', :key='order.number', :header-left='"订单号：" + order.number', :header-right='order.createDate | moment("YYYY-MM-DD")', :arrow-visible="true", :arrow='order.status | orderStatusFormat')
            span.color-primary(@click="goToDetail(order)", slot='arrow') {{order.status | orderStatusFormat}}
            .content(@click="goToDetail(order)")
              .content-row 垫资金额：{{order.amount | ktCurrency}}
              .content-row 供应商：{{order.provider}}
              .content-row.flex
                .content-left.flex-item 订单描述：{{order.desc}}
                .content-right 共 {{order.count}} 辆
              //- .content-row 订单简称：{{order.name}}
            .buttons.text-right.ui-border-t(slot='footer', v-if="canCloseStatus(order.status) || canEditStatus(order.status)")
              button.ui-border-radius(v-if="canCloseStatus(order.status)", @click="closeOrder(order)") 关闭订单
              button.ui-border-radius.warning(v-if="canEditStatus(order.status)", @click="editOrder(order)") 编辑资料
          .no-more-data(v-if="noMoreData")
            small 已经到底了

</template>

<script>
import { orders } from '@/common/resources.js'
import { debounce } from 'lodash'
import OrderMixin from '@/views/order/mixin.js'

export default {
  mixins: [OrderMixin],
  props: {
    close: Function
  },

  mounted() {
    if (this.openType === 'page') {
      this.updateContainerHeight()
    }
  },

  created() {
    this.filter = { ...this.filter, ...this.$route.query }
    this._fetchData()
  },

  methods: {
    // 点击取消
    cancel() {
      if (this.close) {
        this.close()
      } else {
        this.routerBack()
      }
    },

    clearSearch() {
      this.filter.value = ''
      this.orderList = []
      this.search()
    },

    // 计算container高度
    updateContainerHeight() {
      let searchHeaderHeight = 0
      let navBarHeight = 0
      let headerHeight = 0
      const $app = this.$root.$children[0]

      this.$nextTick(() => {
        searchHeaderHeight = this.$refs.searchHeader.getBoundingClientRect().height
        navBarHeight = this.$refs.navBar.$el.getBoundingClientRect().height
        if ($app.headerShow) {
          headerHeight = $app.$refs.header.$el.getBoundingClientRect().height
        }
        this.$refs.tabContainer.$el.style.height = `${window.innerHeight - navBarHeight - headerHeight - searchHeaderHeight}px`
      })
    },

    inputChange(event) {
      this.filter.value = event.target.value
      this.search()
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

    _fetchData: debounce(async function(isMore) {
      if (!this.filter.value) {
        this.orderList = []
        return
      }

      if (isMore) {
        this.filter.page = +this.filter.page + 1
      } else {
        this.filter.page = 1
      }

      const params = {
        page: this.filter.page,
        size: this.filter.size
      }

      params[this.filter.tabActive] = this.filter.value

      this.loading = true
      const res = await orders
        .get(this.pruneParams(params))
        .then(res => res.json()).catch(res => {
          this.loading = false
          throw res
        })

      if (isMore) this.orderList = this.orderList.concat(res.data.result)
      else this.orderList = res.data.result

      if (res.data.result.length) {
        this.loading = false
      } else {
        this.loading = true
        if (this.orderList.length) this.noMoreData = true
      }
    }, 300)
  },

  watch: {
    'filter.tabActive' () {
      this.search()
    },
    $route() {
      this._fetchData()
    }
  },

  data() {
    return {
      openType: 'page',
      loading: false,
      noMoreData: false,
      orderList: [],
      filter: {
        tabActive: 'frameNo',
        page: 1,
        size: 10,
        value: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  width: 30px;
  text-align: center; // float: left;
}
</style>
