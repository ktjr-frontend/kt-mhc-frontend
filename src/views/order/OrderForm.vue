<template lang="pug">
  section.order-form
    form(@submit.prevent="submit")
      section
        .fields
          mt-cell.em-cell(title='供应商信息', is-link, :value='model.provider')
          input(type="hidden", v-model="model.provider")
      section
        .fields-header
          //- i.iconfont.icon-fangan
          | 带 <em>*</em> 为必填
        .fields
          mt-cell(is-link, :class="{'empty': !model.vehicleInfo}",  :value="model.vehicleInfo || '请选择'")
            span(slot="title") 车辆信息 <em>*</em>
          input(type="hidden", v-model="model.vehicleInfo")
          kt-field(type='text', label='订单简称', placeholder='请输入备注（非必填）', v-model="model.desc")
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 填写金额
          mt-cell.has-hint(:class="{'empty': !model.totalAmount}", :value="!model.vehicleInfo ? '请选择车辆' : model.totalAmount + '元'")
            div(slot="title")
              | 合同总金额 <em>*</em>
              p.title-hint 采购和通总金额，与纸质合同总金额相等
          kt-field.sub-cell.has-hint.input-right(type="number", label='手机号', placeholder='请输入已支付金额', v-model='model.totalAmount', :state="getFieldState('model.totalAmount')", @click.native="showFieldError($event, 'model.totalAmount')")
            div(slot="label")
              | 已支付金额 <em>*</em>
              p.title-hint 已经支付给供应商的打款金额
            span 元


</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'

export default {
  mixins: [ValidatorMixin],
  validators: {
    'model.provider' (value) {
      return this.validate(value).required('请选择供应用')
    },
    'model.vehicleInfo' (value) {
      return this.validate(value).required('请输入手机号')
    }
  },

  data() {
    return {
      model: {
        provider: '',
        vehicleInfo: '',
        desc: '',
        totalAmount: null
      }
    }
  }
}
</script>
