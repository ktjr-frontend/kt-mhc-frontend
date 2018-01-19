<template lang="pug">
  section.mine
    section
      mt-cell(is-link, :title="user.name", @click.native="$router.push({name: 'profile'})")
        .custom-title.flex.flex-start(slot="title")
          img.mr10(src="~assets/images/car_brand_icons/1.jpg", slot="icon", width="55")
          .custom-content
            p {{user.name}}
            small.note {{user.company}}
      .cell-append.flex.ui-border-t
        .flex-item.flex.ui-border-r
          i.iconfont.icon-shiming2
          | 已实名认证
        .flex-item.flex
          i.iconfont.icon-gongsi
          | 资源公司
    section.mt10
      mt-cell(is-link, title="我的订单宝", :to="{name: 'orders'}")
        i.iconfont.icon-dingdan2.el-blue(slot="icon")
      mt-cell(is-link, title="我的运单")
        i.iconfont.icon-yunshu.el-blue(slot="icon")
    section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 买车
    section
      mt-cell(is-link, title="我的买车订单")
        i.iconfont.icon-dingdan1.el-blue(slot="icon")
    section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 仓储
    section
      mt-cell(is-link, title="我的车辆")
        i.iconfont.icon-cheliang.el-blue(slot="icon")
      mt-cell(is-link, title="我的提车函")
        i.iconfont.icon-dingdan3.el-blue(slot="icon")
      mt-cell(is-link, title="我的转让函")
        i.iconfont.icon-zhuanrang.el-blue(slot="icon")
      mt-cell(is-link, title="我的入库申请")
        i.iconfont.icon-ruku.el-blue(slot="icon")
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large', @click="$store.dispatch('logout')") 退出登录
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
.cell-append {
  background-color: white;
  padding: 10px;
  min-height: 25px;
  .iconfont {
    font-size: 1.8em;
    margin-right: 5px;
    color: $el-blue;
  }
  .flex-item {
    &:active {
      background-color: rgba(0, 0, 0, .01);
    }
  }
}

.form-buttons {
  padding: 20px 10px;
}
</style>
