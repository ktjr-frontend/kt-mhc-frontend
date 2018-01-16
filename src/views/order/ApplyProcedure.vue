<template lang="pug">
  section.order-detail(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
    section.body
      mt-navbar(v-model='tabActive')
        mt-tab-item#1 可申请
        mt-tab-item#2 已申请
      mt-tab-container(v-model='tabActive')
        mt-tab-container-item#1
          .no-data
            i.iconfont.icon-car
            p 暂无数据
        mt-tab-container-item#2
          .no-data
            i.iconfont.icon-car
            p 暂无数据

</template>

<script>
export default {
  methods: {

  },

  data() {
    return {
      tabActive: '1'
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
.iconfont {
  width: 30px;
  text-align: center; // float: left;
}
</style>
