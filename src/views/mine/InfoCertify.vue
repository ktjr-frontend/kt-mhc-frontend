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
              li 可以发布寻车，给寻车报价
      kt-card-item(header-left="empty", @click="$router.push({name: 'companyAuth'})")
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
              li 可以发布车源
              li 搜索排序加权，车源更靠前
              li 企业认证专属标识，提示信任度
</template>

<script>
import MineMixin from '@/views/mine/mixin.js'
import { mapGetters } from 'vuex'

export default {
  mixins: [MineMixin],
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
