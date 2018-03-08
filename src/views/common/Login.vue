<template lang="pug">
section.login
  .logo
    img(src="~assets/images/logo.svg")
  form.form(@submit.prevent='submit()')
    //- .fields-header
      h3 登录
    .fields
      kt-field.icon-title(type="number", label='手机号', placeholder='请输入用户名（手机号）', v-model='user.phone', :state="getFieldState('user.phone')", @click.native="showFieldError($event, 'user.phone')")
        span(slot="label")
          i.iconfont.icon-yonghu
      kt-field.icon-title.ui-border-b(type="number", label='mima', placeholder='请输入密码', v-model='user.password', :state="getFieldState('user.password')", @click.native="showFieldError($event, 'user.password')")
        span(slot="label")
          i.iconfont.icon-yanzhengma
    .fields.mt10.of-h
      router-link.fr.color-gray(:to="{name: 'forgetPasswordStep1'}") 忘记密码？
        //- mt-button(type='default', @click.stop.prevent='toGetMsgCode()', :disabled='countdownVisible')
          span(v-show='!countdownVisible') 获取验证码
          kt-countdown(ref='fnCountdown', v-show='countdownVisible', @countdown-over='onCountdownOver()')
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large') 登录
      .note-line.text-center
        | 没有账号？
        router-link(:to="{name: 'registerStep1'}") 立即注册
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import CommonMixin from '@/views/common_mixin.js'
import {
  RET_CODE_MAP,
  STORE_KEY_LAST_LOGINED_PHONE
} from '@/constants.js'
import {
  mapActions
} from 'vuex'
import { read } from '@/storage'
import store from '@/store'

export default {
  mixins: [CommonMixin, ValidatorMixin],
  validators: {
    'agreement' (value) {
      return this.validate(value).custom(() => {
        if (!this.agreement) {
          return '请阅读并同意《注册与服务合同》'
        }
      })
    },
    'user.phone' (value) {
      return this.validate(value).required('请输入手机号').digit('请正确输入手机号').regex('^1[3-9]\\d{9}$', '请正确输入手机号')
    },
    'user.password' (value) {
      return this.validate(value).required('请输入密码').digit('请正确输入密码').length(6, '请正确输入密码')
    }
  },

  async beforeRouteEnter(to, from, next) {
    if (to.query.accesstoken) {
      (to.query.accesstoken)
      store.dispatch('updateToken', to.query.accesstoken)
      await store.dispatch('getUser')
      next({
        name: to.query.to || 'menu'
      })
    } else {
      next()
    }
  },

  mounted() {
    this.redirect = decodeURIComponent(this.$route.query.redirect || '')
    this.user.phone = this.$store.getters.user.phone || read(STORE_KEY_LAST_LOGINED_PHONE) || ''
  },

  methods: {
    ...mapActions(['login', 'getUser', 'updateToken']),
    async submit() {
      const success = await this.$validate()
      if (success) {
        const data = await this.login(this.user)
        if (data.code === RET_CODE_MAP.OK) {
          this.$router.push({
            path: this.redirect || '/'
          })
        }
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    // const NODE_ENV = process.env.NODE_ENV
    return {
      redirect: null, //登录后跳转页面
      agreement: true,
      user: {
        phone: '',
        password: ''
        // loginType: this.isWeixin() ? 2 : (~NODE_ENV.indexOf('app') ? 1 : 0)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~views/common/login-register.scss";
</style>
