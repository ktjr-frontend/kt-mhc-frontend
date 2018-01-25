<template lang="pug">
  section.search-vehicles
    //- mt-header(ref="header", title="选择车辆")
    //-   mt-button(icon="back", slot="left", @click.prevent="close") 返回
    header.flex.search-header(v-if="headerVisible")
      form.search-input.flex-item.flex(@submit.prevent="search")
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @input="inputChange($event)", @keyup.13.prevent="search", :value="filter.price", placeholder="输入指导价快速选择车型")
        i.iconfont.icon-qingchu(v-if="filter.price", @click="clearSearch")
      button.cancel-btn(@click="close") 取消
    section.body
      .no-data(v-if="!searchResult.length && filter.price")
        i.iconfont.icon-car
        p 此搜索条件下没有结果
      .search-help(v-if="!searchResult.length && !filter.price")
        img(src="~assets/images/search-vehicle-bg.jpg")
      ul.search-result(v-if="searchResult.length")
        mt-cell.click-active(v-for="r in searchResult", :key="r.id", @click.native="selectResult(r)", title="11")
          .custom-title.flex.flex-start(slot="title")
            img.mr10(:src="r.icon", slot="icon", width="18")
            .custom-content
              p {{r.model}}
              small.note 指导价：{{ r.price }} 万
    //- .form-buttons-placeholder
    //- .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 确定
</template>

<script>
import { vehicles } from '@/common/resources.js'
import { debounce, each } from 'lodash'

const iconsMap = {
  33: require('@/assets/images/car_brand_icons/33.jpg')
}

export default {
  props: {
    close: Function
  },

  methods: {
    clearSearch() {
      this.filter.price = ''
      this.search()
    },

    reset() {
      this.searchResult = []
      this.filter.price = ''
    },

    inputChange(event) {
      this.filter.price = event.target.value
      this.search()
    },

    init(price) {
      if (price) {
        this.headerVisible = false
        this.filter.price = price
        this.search()
      } else {
        this.headerVisible = true
        this.reset()
      }
    },

    search: debounce(async function() {
      const res = await vehicles
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })

      each(res.data.result, r => {
        r.icon = iconsMap[r.iconId]
      })

      this.searchResult = res.data.result || []
    }, 500),

    selectResult(r) {
      this.$emit('select-vehicle', r)
    }
  },

  data() {
    return {
      headerVisible: true,
      searchResult: [],
      filter: {
        price: ''
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

.search-help {
  padding-top: 100px;
  text-align: center;
  img {
    width: 60vw;
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
