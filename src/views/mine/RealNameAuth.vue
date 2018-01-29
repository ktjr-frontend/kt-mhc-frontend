<template lang="pug">
  section.real-name-auth
    form(@submit.prevent="submit")
      section.top-alert(v-if="user.status !== 'initial'")
        span.el-orange(v-if="user.status === 'checking'") 您的实名认证信息正在审核中
        span.el-green(v-else-if="user.status === 'passed'") 您已经通过了实名认证
        span.el-red(v-else-if="user.status === 'rejected'") 您的实名认证失败
      section
        mt-cell.title-simple-cell.ui-border-b
          span(slot="title") 身份证信息
      section
        kt-field(type="text", :readonly="readonly", :disableClear="readonly", label='empty', placeholder='请输入真实姓名', v-model='model.name', :state="getFieldState('model.name')", @click.native="showFieldError($event, 'model.name')")
          div(slot="label")
            | 真实姓名 <em>*</em>
        kt-field(type="text", :readonly="readonly", :disableClear="readonly", label='empty', placeholder='请输入身份证号码', v-model='model.idCard', :state="getFieldState('model.idCard')", @click.native="showFieldError($event, 'model.idCard')")
          div(slot="label")
            | 身份证号码 <em>*</em>
      section.mt10
        mt-cell.title-simple-cell.ui-border-b
          span(slot="title") 上传名片
        .photo-card
          .photo-card-inner
            .preview.flex
              i.iconfont.icon-qingchu(@click="deletePhoto", v-if="photo.previewUrl && !readonly")
              img(v-if="photo.previewUrl", :src="photo.previewUrl")
            .upload-input.flex
              i.iconfont.icon-paizhao(v-if="!photo.previewUrl")
              span.tip(v-if="!photo.previewUrl") 上传 <em>名片</em> 正面
              span.tip(v-if="photo.previewUrl") 图片仅用于开好车审核
              input(v-if="!readonly", ref="file", type="file", accept="image/*;", @change="photoChange($event)")
      .footer-tips
        p 如您无法提供名片照片，可以提供以下任一材料代替
        ol
          li 包含您姓名、身份证号的在职证明照片
          li 若您是公司法人，也可以上传公司营业执照照片
      .form-buttons-placeholder(v-if="!readonly")
        .button-tip 所有证件图片仅供于开通金额审核
        mt-button.mint-button-block(type='primary', size='large') 提交
      .form-buttons.fixed(v-if="!readonly")
        .button-tip 所有证件图片仅供于开通金额审核
        mt-button.mint-button-block(type='primary', size='large') 提交

</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import lrz from 'lrz'
import { Indicator } from 'mint-ui'
import { mapGetters } from 'vuex'

export default {
  mixins: [ValidatorMixin],
  methods: {
    deletePhoto() {
      this.photo.previewUrl = ''
      this.$refs.file.value = ''
      this.model.businessCard = ''
    },

    showPreview(url) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        this.photo.previewUrl = url
        this.model.businessCard = url
        Indicator.close()
      }
    },

    photoChange(e) {
      const file = e.target.files[0]
      if (!file) return
      Indicator.open()
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        this.photo.rst = rst
        this.showPreview(rst.base64)
      }).catch(err => {
        Indicator.close()
        this.$toast(err || '上传失败', 'error')
      })
    },

    async submit() {
      const valid = await this.$validate()
      if (valid) {
        this.$emit('popup-confirmed', this.model)
        await this.$store.dispatch('updateUser', { ...this.$store.getters.user, ...this.model, status: 'checking' })
        this.routerBack()
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.name' (value) {
      return this.validate(value).required('请输入真实姓名')
    },
    'model.idCard' (value) {
      return this.validate(value).required('请输入身份证号码')
    },
    'model.businessCard' (value) {
      return this.validate(value).required('请上传名片')
    }
  },

  computed: {
    ...mapGetters(['user']),
    readonly() {
      return this.user.status === 'checking' || this.user.status === 'passed'
    }
  },

  data() {
    const user = this.$store.getters.user
    return {
      photo: {
        rst: {},
        file: null,
        previewUrl: user.businessCard || '',
        previewImgStyle: {}
      },
      model: {
        name: user.name,
        idCard: user.idCard,
        businessCard: user.businessCard
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
