import { RET_CODE_MAP } from '@/constants.js'
import { mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  methods: {
    ...mapActions(['getMsgCode']),

    // 获取验证码
    async toGetMsgCode() {
      const success = await this.$validate(this.validatePhoneModel)
      if (success) {
        const data = await this.getMsgCode({
          phone: get(this, this.validatePhoneModel),
          label: this.$route.meta.captchaSendType || ''
        })
        if (data.code === RET_CODE_MAP.OK) {
          this.countdownVisible = true
          this.$refs.fnCountdown.start()
        }
      } else {
        this.$toast(this.validation.firstError(this.validatePhoneModel), 'error')
      }
    },

    // 定时器结束 隐藏定时器
    onCountdownOver() {
      this.countdownVisible = false
    }
  },

  data() {
    return {
      validatePhoneModel: 'user.phone', // 获取验证码前验证手机号
      countdownVisible: false
    }
  }
}
