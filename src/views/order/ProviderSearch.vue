<template lang="pug">
  section.search-providers(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
    header.flex
      form.search-input.flex-item.flex(@submit.prevent="search")
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @keyup.13.prevent="search", v-model="filter.providerName", placeholder="搜索")
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
import { providers } from '@/common/resources.js'
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

    search: debounce(async function() {
      const res = await providers
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })
      this.searchResult = res.data.result || []
    }, 300),

    selectResult(r) {
      this.filter.providerName = r.name
    },

    submit() {
      this.$emit('provider-confirmed', this.filter.providerName)
    }
  },

  data() {
    return {
      searchResult: [],
      filter: {
        providerName: ''
      }
    }
  }
}
</script>

<style lang="scss" module>
.has-header {
  margin-top: $header-height;
}
</style>

<style lang="scss" scoped>
header {
  height: 45px;
  padding: 0 10px;
  background: white;
}

.cancel-btn {
  width: 50px;
  color: $primary-color;
}

.iconfont {
  width: 30px;
  text-align: center; // float: left;
}

.search-input {
  height: 30px;
  background: $small-gray-color;
  border-radius: $border-radius;
  input {
    -webkit-appearance: none;
    background: none;
    border: none;
    height: 100%; // width: 100%;
  }
}

.body {
  margin-top: 1px;
}

.no-data {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $placeholder-color;
  .icon-car {
    margin: 10px 0;
    padding: 10px;
    font-size: 2em;
    background: $border-color;
    border-radius: 50%;
  }
}
</style>
