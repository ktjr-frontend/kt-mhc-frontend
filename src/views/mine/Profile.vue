<template lang="pug">
  section.profile
    section
      mt-cell(is-link, title="个人头像")
        img(src="~assets/images/car_brand_icons/1.jpg", width="65")
      mt-cell(is-link, title="个人简介", value="中国公民")
    section.mt10
      mt-cell(is-link, title="真实姓名", :value="user.name")
      mt-cell(is-link, title="公司全称", :value="user.company")
    section.mt10
      mt-cell(is-link, title="联系方式", :value="user.phone")
      mt-cell(is-link, title="邮箱")
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
