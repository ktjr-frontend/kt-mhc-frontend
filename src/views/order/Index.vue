<template lang="pug">
  section.orders
    header
      h2 我的额度（元）
      p.amount 0
      button.show-amount-tip(@click="showAmountTip") 额度说明
    .search-column.flex.scroll-fixed(ref="searchColumn")
      .flex-item
        button(@click="showSearchBox") 搜索车架号、供应商/经销商、车型等关键词
      .order-status.flex-item(@click="toggleStatusFilter")
        i.iconfont.icon-filter
        | 订单状态
      .order-status-body(:style="statusFilterStyle", v-show="statusFilterVisible")
        ul.order-status-list.flex.flex-start.flex-wrap
          li(v-for="item in orderStatusList", :key="item.value")
            .inner.ui-border-radius(@click="search(item)", :class="{'selected': filter.status === item.value}") {{item.name}}
    .card-body(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
      kt-card-item(v-for='order in orderList', :key='order.number', :header-left='"订单号：" + order.number', :header-right='order.createDate | moment("YYYY-MM-DD")', :arrow='order.status | orderStatusFormat')
        span.color-primary(slot='arrow') {{order.status | orderStatusFormat}}
        .content
          .content-row 垫资金额：{{order.amount | ktCurrency}}
          .content-row 供应商：{{order.provider}}
          .content-row.flex
            .content-left.flex-item 订单描述：{{order.desc}}
            .content-right 共 {{order.count}} 辆
          .content-row 订单简称：{{order.name}}
        .buttons.text-right.ui-border-t(slot='footer')
          button.ui-border-radius 关闭订单
          button.ui-border-radius.warning 编辑资料
    mt-popup.search-box(v-model='searchBoxVisible', position='right')
      search(:close="closeSearchBox")
    .fixed-footer-placeholder
    footer.fixed-footer
      .tab-item.flex1
        i.iconfont.icon-car
        p 申请提车
      .tab-item.flex1.ui-border-l
        i.iconfont.icon-key
        p 申请手续
      .tab-item.flex2.tab-btn
        button(@click="$router.push({name: 'orderAdd'})") 申请订单宝

</template>

<script>
import KtCardItem from '@/components/KtCardItem.vue'
import Search from '@/views/order/Search.vue'
import { orders } from '@/common/resources.js'
import { debounce } from 'lodash'
import OrderMixin from '@/views/order/mixin.js'

export default {
  mixins: [OrderMixin],
  components: { KtCardItem, Search },
  methods: {
    showAmountTip() {
      this.$msgBox({
        title: '额度详细说明',
        message: `
          <section class="dialog-message">
            <p>我的额度为以下两种模式之和：</p>
            <p>对于代购车辆&le;2辆车的订单，累计额度为<em>150万</em>；</p>
            <p>对于订购车辆&gt;2辆车的订单，累计额度为<em>400万</em>；</p>
          </section>
        `
      })
    },

    // 显示搜索框
    showSearchBox() {
      console.log('open search box')
      this.searchBoxVisible = true
    },

    closeSearchBox() {
      console.log('close search box')
      this.searchBoxVisible = false
    },

    // 筛选
    search(item) {
      this.filter.status = item.value
      this.filter.page = 1
      this.$router.push({
        name: this.$route.name,
        query: this.filter
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

    async _fetchData(isMore) {
      if (isMore) this.filter.page += 1

      this.loading = true
      const res = await orders
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })

      if (res.data.result.length) {
        this.loading = false
      }

      if (isMore) this.orderList = this.orderList.concat(res.data.result)
      else this.orderList = res.data.result
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
    return {
      statusFilterVisible: false,
      statusFilterStyle: {},
      searchBoxVisible: false, // 搜索层显示控制
      loading: false,
      filter: {
        status: '0',
        page: 1,
        size: 10
      },
      orderList: []
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 74px;
  background-color: $primary-color;
  background-image: linear-gradient(135deg, #509ff6 0%, #007af0 100%);
  color: white;
  padding: 18px;
  position: relative;
  h2 {
    font-size: 14px;
  }
}

.buttons {
  padding: 10px 0;
  button {
    background: none;
    margin-left: 10px;
    line-height: 20px;
  }
}

.search-box {
  height: 100%;
  width: 100%;
  background: $primary-bg-color;
}

.amount {
  font-size: 30px;
  font-family: franklin;
  margin-top: 15px;
}

.show-amount-tip {
  position: absolute;
  right: 20px;
  bottom: 20px;
  border: 0;
  border-radius: 100px;
  padding: 3px 8px;
  background: rgba(0, 0, 0, .3);
}

.search-column {
  padding: 10px;
  background: white;
  position: relative;
  z-index: 9;
  button {
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
  color: $font-color-em;
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