<template lang="pug">
  section.search-orders(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
    header.flex
      .search-input.flex-item.flex
        i.iconfont.icon-sousuo
        input.flex-item(type="search", @keyup.13="search", v-model="filter.value", placeholder="搜索")
        i.iconfont.icon-qingchu(v-if="filter.value", @click="clearSearch")
      button.cancel-btn(@click="close") 取消
    section.body
      mt-navbar(v-model='tabActive')
        mt-tab-item#1 车架号后6位
        mt-tab-item#2 车型
        mt-tab-item#3 供应商/经销商
      mt-tab-container(v-model='tabActive')
        mt-tab-container-item#1
          .no-data()
            i.iconfont.icon-car
            p 此搜索条件下没有结果
        mt-tab-container-item#2
          .no-data()
            i.iconfont.icon-car
            p 此搜索条件下没有结果
        mt-tab-container-item#3
          .no-data()
            i.iconfont.icon-car
            p 此搜索条件下没有结果

</template>

<script>
import { orders } from '@/common/resources.js'

export default {
  props: {
    close: Function
  },

  methods: {
    clearSearch() {
      this.filter.value = ''
      this.search()
    },

    async search() {
      const res = await orders
        .get(this.pruneParams(this.filter))
        .then(res => res.json())
        .catch(res => {
          this.loading = false
          throw res
        })
      console.log(res)
    }
  },

  watch: {
    tabActive() {
      this.search()
    }
  },

  data() {
    return {
      tabActive: '1',
      filter: {
        value: ''
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