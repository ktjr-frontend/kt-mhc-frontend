<template lang="pug">
  section.search-providers
    mt-header(ref="header", title="选择供应商")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    header.flex.search-header
      form.search-input.flex-item.flex(@submit.prevent="search")
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @input="inputChange($event)", @keyup.13.prevent="search", :value="filter.name", placeholder="搜索")
        i.iconfont.icon-qingchu(v-if="filter.value", @click="clearSearch")
      button.cancel-btn(@click="close") 取消
    section.body
      ul.search-result
        mt-cell.click-active(v-for="r in searchResult", :key="r.id", @click.native="selectResult(r)", :title="r.name")
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 确定
</template>

<script>
import { cooperators } from '@/common/resources.js'
import { debounce } from 'lodash'

export default {
  props: {
    close: Function
  },

  methods: {
    clearSearch() {
      this.filter.value = ''
      this.search()
    },

    inputChange(event) {
      this.filter.name = event.target.value
      this.search()
    },

    search: debounce(async function() {
      if (!this.filter.name) return
      const res = await cooperators
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })
      this.searchResult = res.data || []
    }, 300),

    selectResult(r) {
      this.filter.name = r.name
    },

    submit() {
      this.$emit('popup-confirmed', this.filter.name)
    }
  },

  data() {
    return {
      searchResult: [],
      filter: {
        name: ''
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

.body {
  padding-top: 10px;
}
</style>
