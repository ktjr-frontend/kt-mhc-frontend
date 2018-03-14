<template lang="pug">
  section.search-vehicles
    mt-header(ref="header", title="车辆信息", v-if="mtHeaderVisible")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    //- header.flex.search-header
      form.search-input.flex-item.flex(@submit.prevent="search")
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @input="searchInputChange($event)", @keyup.13.prevent="search", :value="filter.frameNo", placeholder="输入车架号快速搜索")
        i.iconfont.icon-qingchu(v-if="filter.frameNo", @click="clearSearch")
      button.cancel-btn(@click="close") 取消
    //- .header-sub.ui-borderNo
      //- .custom-model(v-if="repositoryListVisible", @click="repositoryListVisible = false")
      .select-repository
        div.select-value(@click="repositoryListVisible = !repositoryListVisible")
          div.value(:class="repositoryListVisible ? 'open' : ''") {{selectRepositoryLabel}}
        div.select-list(v-show="repositoryListVisible")
          ul.ui-border-t
            li.ui-border-t(v-for="r in repositoryList", :key="r.value", @click="() => {selectRepository = r.value;repositoryListVisible=false}") {{r.label}}
    section.body.overflow-scroll
      .no-data(v-if="!searchResult.length && filter.price")
        i.iconfont.icon-car
        p 此条件下没有结果
      .search-result(v-if="searchResult.length")
        template(v-for="r in searchResult")
          mt-cell.ui-border-b(title="empty", :key="r.id")
            .custom-title.flex.flex-start(slot="title")
              kt-checkbox.mr10(v-show="!readonly", v-model="r.checked", @change="syncChildStatus(r)")
              //- img.mr10(:src="r.icon", slot="icon", width="18")
              .custom-content
                p {{r.model}}
                small.note 共 {{r.children.length}} 辆
          section
            mt-cell.no-border(v-for="sub in r.children", :key="sub.frameNo", title="empty")
              .custom-title.flex.flex-start(slot="title")
                kt-checkbox.mr10(v-show="!readonly", v-model="sub.checked", @change="syncParentStatus(r, sub)")
                //- img.mr10(:src="r.icon", slot="icon", width="18")
                .custom-content
                  p 车架号：{{sub.frameNo}}
                  small.note 外观内饰：{{sub.appearTrim}}
    .fixed-footer-placeholder
    footer.fixed-footer.flex
      .flex-item.flex-start.pl10(v-show="!readonly")
        kt-checkbox(:value="checked", @input="checkAll")
          span.pl10 全选
          span.pl10 已选 [ {{checkedCar.length}} ]
      .tab-item(v-if="from !== 'interestTransfer'", :style="{width: readonly ? '100%' : '80px'}")
        button(@click.prevent="submit" v-if="!readonly") 提交
        button(@click.prevent="readonly = false" v-else) 申请提车
      template(v-else)
        .tab-item(style="width: 50px;")
          button.simple(@click.prevent="close") 取消
        .tab-item(style="min-width: 80px;")
          button(@click="submit") 转移物权
</template>

<script>
import { vehicleSeries } from '@/common/resources.js'
import { debounce, each, find, every, chain } from 'lodash'

const iconsMap = {
  33: require('@/assets/images/car_brand_icons/33.jpg')
}

export default {
  props: {
    mtHeaderVisible: true,
    close: Function,
    from: String
  },

  methods: {
    clearSearch() {
      this.filter.price = ''
      this.search()
    },

    // reset() {
    //   this.searchResult = []
    //   this.filter.price = ''
    // },

    searchInputChange(event) {
      this.filter.price = event.target.value
      this.search()
    },

    init() {
      if (this.from === 'mine') {
        this.readonly = true
      }
      // this.headerVisible = true
      this.search()
    },

    // 同步选择状态
    syncGlobalStatus() {
      this.checked = every(this.searchResult, sr => sr.checked)
    },

    // 同步父级选择状态
    syncParentStatus(r, sub) {
      r.checked = every(r.children, c => c.checked)
      this.syncGlobalStatus()
    },

    // 同步子集选择状态
    syncChildStatus(r) {
      each(r.children, c => { c.checked = r.checked })
      this.syncGlobalStatus()
    },

    // 全选
    checkAll(val) {
      this.checked = val
      each(this.searchResult, sr => {
        sr.checked = this.checked
        each(sr.children, c => {
          c.checked = this.checked
        })
      })
    },

    search: debounce(async function() {
      const res = await vehicleSeries
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })

      each(res.data.data, r => {
        r.icon = iconsMap[r.iconId]
      })

      this.searchResult = res.data.data || []
    }, 500),

    submit() {
      if (!this.checkedCar.length) {
        this.$toast('请选择车辆', 'error')
        return
      }

      this.$emit('popup-confirmed', { vehicles: this.searchResult, checkedCar: this.checkedCar })
    }
  },

  computed: {
    checkedCar() {
      return chain(this.searchResult).map(sr => sr.children).flatten().filter(c => c.checked).value()
    },

    selectRepositoryLabel() {
      const rp = find(this.repositoryList, r => r.value === this.selectRepository) || {}
      return rp.label || ''
    }
  },

  data() {
    return {
      readonly: false, // 控制是否可以编辑
      checked: [],
      repositoryListVisible: false,
      repositoryList: [{
        label: '测试1号库',
        value: '1'
      }, {
        label: '测试2号库',
        value: '2'
      }],
      selectRepository: '1',
      // headerVisible: true,
      searchResult: [],
      filter: {
        frameNo: ''
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

.header-sub {
  // padding: 10px;
  min-height: 45px;
  line-height: 45px;
  background: white;
}

.search-help {
  padding-top: 100px;
  text-align: center;
  img {
    width: 60vw;
  }
}

.select-value {
  .value {
    position: relative;
    display: inline-block;
    &.open:after {
      transform: rotate(180deg);
      top: 16px;
    }
    &:after {
      content: '';
      position: absolute;
      border-width: 4px;
      top: 20px;
      right: -15px;
      height: 0;
      width: 0;
      border-color: currentColor transparent transparent;
      border-style: solid;
    }
  }
}

.select-repository {
  text-align: center;
  position: relative;
  font-size: $font-size-m;
  z-index: 999;
  ul {
    background: white;
    li {
      padding: 0 10px;
      &:active {
        background-color: rgba(0, 0, 0, .02);
      }
    }
  }
  .select-list {
    position: absolute;
    left: 0;
    top: 45px;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    right: 0;
    text-align: left;
    z-index: 998;
  }
}

.custom-content {
  padding: 10px 0;
  line-height: 1.5em;
  p {
    white-space: normal;
  }
}

.body {
  padding-top: 10px;
}
</style>
