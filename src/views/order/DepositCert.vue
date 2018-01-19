<template lang="pug">
section.deposit-form(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
  form(@submit.prevent="submit")
    section
      .fields
        kt-field.input-right(type="number", label='empty', placeholder='请输入', v-model='model.payCount', :state="getFieldState('model.payCount')", @click.native="showFieldError($event, 'model.payCount')")
          div(slot="label")
            | 打款笔数 <em>*</em>
          span 笔
    section.mt10
      .fields
        kt-date-picker.input-right(label='empty', :readonly="true" placeholder='请选择', v-model='model.payDate', :state="getFieldState('model.payDate')", @click.native="showFieldError($event, 'model.payDate')")
          div(slot="label")
            | 支付日期 <em>*</em>
        kt-field.input-right(type="number", label='empty', placeholder='请输入', v-model='model.payAmount', :state="getFieldState('model.payAmount')", @click.native="showFieldError($event, 'model.payAmount')")
          div(slot="label")
            | 支付金额 <em>*</em>
          span 元
      .fields.mt10
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

export default {
  mixins: [ValidatorMixin],
  props: {
    close: Function
  },

  methods: {
    init() {

    },
    async submit() {
      const success = await this.$validate()
      if (success) {
        this.$emit('popup-confirmed', this.model)
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
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
      return this.validate(value).required('请填写付款账户')
    },
    'model.bankCard' (value) {
      return this.validate(value).required('请填写银行账号')
    },
    'model.bankName' (value) {
      return this.validate(value).required('请填写开户银行')
    }
  },

  data() {
    return {
      model: {
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

</style>
