<template lang="pug">
  section.letters
    mt-header(ref="header", title="取消订单原因")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    header
      | 取消订单原因：
    form.overflow-scroll(ref="popBoxContainer", @submit.prevent="submit")
      section.mt10
        .fields
          mt-radio.first-no-border.cell-radiolist(:state="getFieldState('model.reason')", v-model='model.reason', :options="reasonList")
          input(type="hidden", v-model="model.reason")
          //- section(v-if="model.reason === '其他'")
          //- .fields.ui-border-t
          kt-field(v-if="model.reason === '其他'", type="textarea", label="自定义原因：", v-model="model.otherReason", :state="getFieldState('model.otherReason')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.otherReason')")
            //- div(slot="label")
              | 详细地址
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 确定
</template>

<script>
// import { remove } from 'lodash'
// import { fileUploader, userPhotos } from '@/common/resources.js'
// import { Indicator } from 'mint-ui'
import ValidatorMixin from '@/views/validator_mixin.js'

// const FILE_NOT_EMPTY = 'has_file'

export default {
  mixins: [ValidatorMixin],
  props: {
    close: Function
  },

  methods: {
    init(order = {}) {
      this.order = order
    },

    async submit() {
      const valid = await this.$validate()
      console.log(valid)
      if (valid) {
        this.$emit('popup-confirmed', {
          order: this.order,
          reason: this.model
        })
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.reason' (value) {
      return this.validate(value).required('请选择取消原因')
    },
    'model.otherReason' (value) {
      return this.validate(value).custom(() => {
        if (this.model.reason === '其他' && !value) {
          return '请填写其他原因'
        }
      })
    }
  },

  data() {
    return {
      order: null,
      model: {
        reason: null,
        otherReason: null
      },
      reasonList: [{
        label: '价格不合适',
        value: '价格不合适'
      }, {
        label: '无法异地购车',
        value: '无法异地购车'
      }, {
        label: '其他',
        value: '其他'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~views/order/uploader-card.scss";
</style>
