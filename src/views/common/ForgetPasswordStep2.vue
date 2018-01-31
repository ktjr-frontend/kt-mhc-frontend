<template lang="pug">
section.forget-password
  form.form(@submit.prevent='submit()')
    .fields-header
      h3 重设密码
    .fields
      kt-field.ui-border-b(:type="passwordVisible ? 'text' : 'password'", label='密码', placeholder='请输入密码', v-model='user.password', :state="getFieldState('user.password')", @click.native="showFieldError($event, 'user.password')")
        span(slot="label") 密码
        span
          i.iconfont.icon-yincang.ft20.ml10(v-if="!passwordVisible", @click="passwordVisible = true")
          i.iconfont.icon-xianshi.ft20.ml10(v-else-if="passwordVisible", @click="passwordVisible = false")
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large') 确定
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import CommonMixin from '@/views/common_mixin.js'
import {
  mapActions
} from 'vuex'

export default {
  mixins: [CommonMixin, ValidatorMixin],
  validators: {
    'user.password' (value) {
      return this.validate(value).required('请输入密码').length(6, '最少6位密码')
    }
  },

  methods: {
    ...mapActions(['login']),
    async submit() {
      const success = await this.$validate()
      if (success) {
        // const data = await this.login(this.user)
        this.$router.push({
          name: 'login'
        })
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    return {
      passwordVisible: false,
      user: {
        password: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "~views/common/login-register.scss";
</style>
