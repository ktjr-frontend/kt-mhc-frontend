<template lang="pug">
  section.info-certify
    section
      kt-card-item(header-left="empty", @click="$router.push({name: 'realNameAuth'})")
        span(slot="headerLeft")
          .stress
            i.iconfont.icon-shiming2.mr5
            | 实名认证
        span.ml5.color-primary(slot='headerRight')
          | {{user.status | certifyStatusFormat}}
          i.iconfont.icon-you.ft14
        .content
          .content-row.minor-content
            ul.list-disc.lh0_6_3
              li 基本信息认证
      kt-card-item(header-left="empty", @click="goCompanyCertify")
        span(slot="headerLeft")
          .stress
            i.iconfont.icon-gongsi.mr5
            | 企业认证
        span.ml5.color-primary(slot='headerRight')
          | {{user.company.status | certifyStatusFormat}}
          i.iconfont.icon-you.ft14
        .content
          .content-row.minor-content
            ul.list-disc.lh0_6_3
              li 包含 <em>实名认证</em> 所有权限
              li 企业基本信息认证
              //- li 搜索排序加权，车源更靠前
              //- li 企业认证专属标识，提示信任度
      kt-card-item(header-left="empty", @click="goAdvancedCertify")
        span(slot="headerLeft")
          .stress
            i.iconfont.icon-yanzhengma.mr5(style="font-size: 1.3em;")
            | 高级认证
        span.ml5.color-primary(slot='headerRight')
          | {{user.advancedCertify.status | certifyStatusFormat}}
          i.iconfont.icon-you.ft14
        .content
          .content-row.minor-content
            ul.list-disc.lh0_6_3
              li 包含 <em>企业认证</em> 所有权限
              li 可以申请订单
</template>

<script>
import MineMixin from '@/views/mine/mixin.js'
import { mapGetters } from 'vuex'

export default {
  mixins: [MineMixin],
  methods: {
    goCompanyCertify() {
      if (this.user.status === 'passed') {
        this.$router.push({ name: 'companyAuth' })
      } else {
        this.$toast('请先实名认证')
      }
    },

    goAdvancedCertify() {
      if (this.user.company.status === 'passed') {
        this.$router.push({ name: 'advancedCertify' })
      } else if (this.user.status !== 'passed') {
        this.$toast('请先实名认证')
      } else {
        this.$toast('请先完成企业认证')
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
