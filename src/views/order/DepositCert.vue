<template lang="pug">
section.deposit-form
  mt-header(ref="header", title="保证金凭证")
    mt-button(icon="back", slot="left", @click.prevent="close") 返回
  form(@submit.prevent="submit")
    section
      .fields
        kt-field.input-right(type="number", label='empty', placeholder='请输入', v-model='model.payCount', :state="getFieldState('model.payCount')", @click.native="showFieldError($event, 'model.payCount')")
          div(slot="label")
            | 打款笔数 <em>*</em>
          span 笔
    section.mt10
      .fields
        kt-date-picker.input-right(label='empty', :custom-model-visible="true", :readonly="true" placeholder='请选择', v-model='model.payDate', :state="getFieldState('model.payDate')", @click.native="showFieldError($event, 'model.payDate')")
          div(slot="label")
            | 支付日期 <em>*</em>
        kt-field.input-right(type="number", label='empty', placeholder='请输入', v-model='model.payAmount', :state="getFieldState('model.payAmount')", @click.native="showFieldError($event, 'model.payAmount')")
          div(slot="label")
            | 支付金额 <em>*</em>
          span 元
      .fields.mt10(v-if="depositType === 'offline_not_bank'")
        mt-cell.title-cell
          span(slot="title") 支付凭证
        .photo-body.ui-border-t.flex.flex-wrap.flex-start
          .preview(v-for="photo in model.photos")
            i.iconfont.icon-qingchu(@click="deletePhoto(photo)")
            img(v-if="photo.previewUrl", :src="photo.previewUrl")
          .upload-input
            i.iconfont.icon-paizhao
            input(ref="file", type="file", accept="image/*;", @change="photoChange($event)")
      .fields.mt10(v-else-if="depositType === 'offline_bank'")
        mt-cell.title-cell
          span(slot="title") 付款人信息
            small （打款时使用的信息）
        kt-field.input-right(type="text", label='empty', placeholder='请输入', v-model='model.account', :state="getFieldState('model.account')", @click.native="showFieldError($event, 'model.account')")
          div(slot="label")
            | 付款账户 <em>*</em>
        kt-field.input-right(type="text", label='empty', placeholder='请输入', v-model='model.bankCard', :state="getFieldState('model.bankCard')", @click.native="showFieldError($event, 'model.bankCard')")
          div(slot="label")
            | 银行账号 <em>*</em>
        kt-field.input-right(type="text", label='empty', placeholder='请输入', v-model='model.bankName', :state="getFieldState('model.bankName')", @click.native="showFieldError($event, 'model.bankName')")
          div(slot="label")
            | 开户银行 <em>*</em>
  .footer
    .note-line
      h4 注意事项：
      ol
        li
          em 支持同一账户、同一日期多笔打款信息合并添加
        li 非同一账户、同一日期需要添加多个还款信息
        li 财务会根据打款信息来进行比对，请按照要求提交，避免因为信息不正确导致财务无法确认的情况
  .form-buttons-placeholder
  .form-buttons.fixed
    mt-button.mint-button-block(type='primary', size='large', @click="submit") 提交
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import lrz from 'lrz'
import { remove } from 'lodash'
// import { fileUploader, userPhotos } from '@/common/resources.js'
import { Indicator } from 'mint-ui'

// const FILE_NOT_EMPTY = 'has_file'

export default {
  mixins: [ValidatorMixin],
  props: {
    close: Function
  },

  methods: {
    init(depositCert, type = 'offline_bank') {
      this.depositType = type
    },

    deletePhoto(photo) {
      this.model.photos = remove(this.model.photos, c => c !== photo)
      this.$refs.file.value = ''
    },

    showPreview(url, photo) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        photo.previewUrl = url
        this.model.photos.push(photo)
        // photo.img = img
        Indicator.close()
        // const maxW = this.$els[ns].getBoundingClientRect().width
        // this[ns].previewImgStyle = {
        //   maxWidth: `${maxW}px`
        // }
      }
    },

    photoChange(e) {
      const file = e.target.files[0]
      if (!file) return
      Indicator.open()
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        const photo = {}
        photo.rst = rst
        this.showPreview(rst.base64, photo)
      }).catch(err => {
        Indicator.close()
        this.$toast(err || '上传失败', 'error')
      })
    },

    async submit() {
      // if (!this.model.photos.length) {
      //   this.$toast('请上传实车照片', 'error')
      //   return
      // }

      const success = await this.$validate()

      if (success) {
        this.$emit('popup-confirmed', this.model)
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.photos' (value) {
      return this.validate(value).custom(() => {
        if (this.depositType === 'offline_not_bank' && (!value || !value.length)) {
          return '请上传保证金凭证'
        }
      })
    },

    'model.payCount' (value) {
      return this.validate(value).required('前填写打款笔数')
    },
    'model.payDate' (value) {
      return this.validate(value).required('前填写打款日期')
    },
    'model.payAmount' (value) {
      return this.validate(value).required('请填写支付金额')
    },
    'model.account' (value) {
      return this.validate(value).custom(() => {
        if (this.depositType === 'offline_bank' && !value) {
          return '请填写付款账户'
        }
      })
    },
    'model.bankCard' (value) {
      return this.validate(value).custom(() => {
        if (this.depositType === 'offline_bank' && !value) {
          return '请填写银行账号'
        }
      })
    },
    'model.bankName' (value) {
      return this.validate(value).custom(() => {
        if (this.depositType === 'offline_bank' && !value) {
          return '请填写开户银行'
        }
      })
    }
  },

  data() {
    return {
      depositType: '',
      photos: [{
        rst: {},
        file: null,
        previewUrl: '',
        previewImgStyle: {}
      }],
      model: {
        photos: [],
        payCount: null,
        payDate: '',
        payAmount: null,
        account: '',
        bankCard: '',
        bankName: ''
      }
    }
  }
}
</script>

<style lang="scss" module>
.has-header {
  margin-top: $header-height;
}
</style>

<style lang="scss" scoped>
@import "~views/order/uploader-card.scss";
.photo-body {
  background-color: white;
}
</style>
