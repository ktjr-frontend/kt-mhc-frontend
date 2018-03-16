<template lang="pug">
  section.search-vehicles
    //- mt-header(ref="header", title="选择车辆")
    //-   mt-button(icon="back", slot="left", @click.prevent="close") 返回
    header.flex.search-header(v-if="headerVisible")
      form.search-input.flex-item.flex(@submit.prevent="search")
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @input="inputChange($event)", @keyup.13.prevent="search", :value="filter.key", placeholder="输入品牌、车系、车型搜索")
        i.iconfont.icon-qingchu(v-if="filter.key", @click="clearSearch")
      button.cancel-btn(@click="close") 取消
    section.body
      .no-data(v-if="!searchResult.length && !filter.key")
        i.iconfont.icon-car
        p 此搜索条件下没有结果
      //- .search-help(v-if="!searchResult.length && !filter.key")
      //-   img(src="~assets/images/search-vehicle-bg.jpg")
      ul.search-result(v-if="searchResult.length")
        mt-cell.click-active(v-for="r in searchResult", :key="r.id", @click.native="selectResult(r)", title="11")
          .custom-title.flex.flex-start(slot="title")
            img.mr10(:src="r.brandLogo", slot="icon", width="18", v-if="r.brandLogo")
            .custom-content
              p {{r.brandName}} {{r.seriesName}} {{r.modelName}}
              small.note 指导价：{{ r.manufacturerGuidancePrice }} 元
    //- .form-buttons-placeholder
    //- .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 确定
</template>

<script>
import { vehicleSeries } from '@/common/resources.js'
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
      this.filter.key = ''
      this.search()
    },

    reset() {
      this.searchResult = []
      this.filter.key = ''
    },

    inputChange(event) {
      this.filter.key = event.target.value
      this.search()
    },

    init(brand) {
      if (brand) {
        this.headerVisible = true
        this.filter.brandName = brand.brandName
        console.log(this.filter, 'filter')
        this.search()
      } else {
        this.headerVisible = true
        this.reset()
      }
    },

    search: debounce(async function() {
      const res = await vehicleSeries
        .get(this.filter)
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })

      each(res.data, r => {
        r.icon = iconsMap[r.iconId]
      })

      this.searchResult = res.data || []
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
        brandName: '',
        key: ''
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
