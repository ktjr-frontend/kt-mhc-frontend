<template lang="pug">
  section.deposit-accounts
    section.mt10
      mt-cell(title="账户名称", value="开好车")
      mt-cell(title="开户银行", value="中国民生银行")
      mt-cell(title="银行账号", value="6226091112331111")
</template>

<script>
export default {
  methods: {
    headerClose() {
      this.$router.push({ name: this.$route.query.from || 'menu' })
    }
  }
}
</script>
