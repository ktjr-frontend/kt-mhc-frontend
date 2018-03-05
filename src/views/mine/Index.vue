<template lang="pug">
  section.mine
    section
      mt-cell(is-link, :title="user.name", @click.native="$router.push({name: 'profile'})")
        .custom-title.flex.flex-start(slot="title")
          img.mr10(src="~assets/images/car_brand_icons/1.jpg", slot="icon", width="55", height="55")
          .custom-content
            p {{user.name}}
            small.note {{user.company.name}}
      .cell-append.flex.ui-border-t
        .flex-item.flex.ui-border-r(@click="$router.push({name: 'realNameAuth'})")
          i.iconfont.icon-shiming2
          span(v-if="user.status === 'passed'") 已实名认证
          span(v-else-if="user.status === 'checking'") 实名认证审核中
          span(v-else-if="user.status === 'rejected'") 实名认证失败
          span(v-else-if="user.status === 'initial'") 未实名认证
          i.icon-circle(v-if="user.status !== 'passed'")
        //- .flex-item.flex.ui-border-r(@click="$router.push({name: 'depositAccount', query: {from : 'mine'}})")
          i.iconfont.icon-baozhengjinguanli
          span 保证金账户
        .flex-item.flex(@click="goCompanyCertify")
          i.iconfont.icon-gongsi
          span(v-if="user.company.status === 'passed'") {{user.company.companyType | companyTypeFormat}}
          span(v-else-if="user.company.status === 'checking'") 企业认证审核中
          span(v-else-if="user.company.status === 'rejected'") 企业认证失败
          span(v-else-if="user.company.status === 'initial'") 未企业认证
          i.icon-circle(v-if="user.company.status !== 'passed'")
    section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 全部服务
    section
      mt-cell(is-link, title="我的订单融资", :to="{name: 'orders', query: {from: 'mine'}}")
        i.iconfont.icon-dingdan2.el-blue(slot="icon")
      mt-cell(is-link, title="我的运单", :to="{name: 'wayBills'}")
        i.iconfont.icon-yunshu.el-blue(slot="icon")
      mt-cell(is-link, title="我的车辆", :to="{name: 'myCars'}")
        i.iconfont.icon-cheliang.el-blue(slot="icon")
      mt-cell(is-link, title="我的提车函", :to="{name: 'pickCarLetters'}")
        i.iconfont.icon-dingdan3.el-blue(slot="icon")
      mt-cell(is-link, title="信息认证", :to="{name: 'infoCertify'}")
        i.iconfont.icon-verification.el-blue(slot="icon")
    //- company-auth-rounded(v-model="companyAuthVisible", ref="companyAuthRounded", @popup-confirmed="companyAuthConfirm")
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large', @click="$store.dispatch('logout')") 退出登录
</template>

<script>
import { mapGetters } from 'vuex'
// import CompanyAuthRounded from '@/views/mine/CompanyAuthRounded.vue'
import MineMixin from '@/views/mine/mixin.js'

export default {
  mixins: [MineMixin],
  // components: { CompanyAuthRounded },
  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    // // 自定义顶部标题栏的返回按钮行为
    // backButtonAction() {
    //   if (this.companyAuthVisible) {
    //     this.$refs.companyAuthRounded.backButtonAction()
    //   } else {
    //     this.routerBack()
    //   }
    // },

    // showCompany() {
    //   this.companyAuthVisible = true
    // },

    // companyAuthConfirm(companyAuth = {}) {
    //   this.companyAuth = companyAuth
    //   this.companyAuthVisible = false
    // }
    goCompanyCertify() {
      if (this.user.status === 'passed') {
        this.$router.push({ name: 'companyAuth' })
      } else {
        this.$toast('请先实名认证')
      }
    }
  },

  data() {
    return {
      // companyAuthVisible: false
    }
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
    color: $primary-color;
  }
  .flex-item {
    &:active {
      background-color: rgba(0, 0, 0, .1);
    }
  }
}

.icon-circle {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: $el-red;
  margin-top: -10px;
  margin-left: 3px;
}

.form-buttons {
  padding: 20px 10px;
}
</style>
