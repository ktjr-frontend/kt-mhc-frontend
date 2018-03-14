<template lang="pug">
section.forget-password
  form.form(@submit.prevent='submit()')
    .fields-header
      h3 找回密码
    .fields
      kt-field(type="number", label='手机号', placeholder='请输入您的手机号', v-model='user.phone', :state="getFieldState('user.phone')", @click.native="showFieldError($event, 'user.phone')")
        span(slot="label")
          i.iconfont.icon-yonghu
      kt-field.ui-border-b(type="number", label='验证码', placeholder='请输入验证码', v-model='user.captcha', :state="getFieldState('user.captcha')", @click.native="showFieldError($event, 'user.captcha')")
        span(slot="label")
          i.iconfont.icon-yanzhengma
        mt-button(type='default', @click.stop.prevent='toGetMsgCode()', :disabled='countdownVisible')
          span(v-show='!countdownVisible') 获取验证码
          kt-countdown(ref='fnCountdown', v-show='countdownVisible', @countdown-over='onCountdownOver()')
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large') 下一步

</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import CommonMixin from '@/views/common_mixin.js'

import {
  STORE_KEY_LAST_LOGINED_PHONE
} from '@/constants.js'

import {
  mapActions
} from 'vuex'

import { read } from '@/storage'

export default {
  mixins: [CommonMixin, ValidatorMixin],
  validators: {
    'user.phone' (value) {
      return this.validate(value).required('请输入手机号').digit('请输入正确手机号').regex('^1[3-9]\\d{9}$', '请输入正确手机号')
    },
    'user.captcha' (value) {
      return this.validate(value).required('请输入验证码').digit('请输入正确验证码').length(6, '请输入正确验证码')
    }
  },

  mounted() {
    this.user.phone = this.$store.getters.user.phone || read(STORE_KEY_LAST_LOGINED_PHONE) || ''
  },

  methods: {
    ...mapActions(['login']),
    async submit() {
      const success = await this.$validate()
      if (success) {
        // const data = await this.login(this.user)
        this.$router.push({
          name: 'forgetPasswordStep2'
        })
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    return {
      user: {
        phone: '',
        captcha: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "~views/common/login-register.scss";
</style>
