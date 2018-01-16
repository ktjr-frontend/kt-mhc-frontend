<template lang="pug">
section.logistics-form(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
  form(@submit.prevent="submit")
    section
      .fields
        kt-address-select(:state="getFieldState('model.startAddress')", v-model="model.startAddress")
          span(slot="label") 起始地 <em>*</em>
        kt-address-select(:state="getFieldState('model.endAddress')", v-model="model.endAddress")
          span(slot="label") 目的地 <em>*</em>
    section.mt10
      .fields
        kt-select(:options="tranportTypes", v-model="model.tranportType", :state="getFieldState('model.tranportType')", @click.native="showFieldError($event, 'model.tranportType')")
          span(slot="label") 运输类型 <em>*</em>
    section.mt10
      .fields
        kt-date-picker.input-right(label='empty', :readonly="true" placeholder='请选择', v-model='model.deliverDate', :state="getFieldState('model.deliverDate')", @click.native="showFieldError($event, 'model.deliverDate')")
          div(slot="label")
            | 发运时间 <em>*</em>
        kt-field(type="text", label='empty', placeholder='请输入发运时间', v-model='model.deliverContact', :state="getFieldState('model.deliverContact')", @click.native="showFieldError($event, 'model.deliverContact')")
          div(slot="label")
            | 发货联系人 <em>*</em>
        kt-field(type="number", label='empty', placeholder='发货人姓名', v-model='model.deliverPhone', :state="getFieldState('model.deliverPhone')", @click.native="showFieldError($event, 'model.deliverPhone')")
          div(slot="label")
            | 联系方式 <em>*</em>
        kt-field(type="text", label='empty', :readonly="true", placeholder='同起始地', v-model='model.startAddress')
          div(slot="label")
            | 发货地址 <em>*</em>
        kt-field(type="textarea", label=" ", v-model="model.detailAddress", :state="getFieldState('model.detailAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.detailAddress')")
        kt-field(type="text", label="empty", placeholder='请输入备注', v-model='model.comment')
          div(slot="label")
            | 备注

  .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 提交
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import KtAddressSelect from '@/components/KtAddressSelect.vue'

export default {
  mixins: [ValidatorMixin],
  components: { KtAddressSelect },
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
    'model.startAddress' (value) {
      return this.validate(value).required('请选择起始地址')
    },
    'model.endAddress' (value) {
      return this.validate(value).required('请选择目的地址')
    },
    'model.deliverDate' (value) {
      return this.validate(value).required('请选择发货时间')
    },
    'model.tranportType' (value) {
      return this.validate(value).required('请选择运输类型')
    },
    'model.deliverContact' (value) {
      return this.validate(value).required('请填写发货人')
    },
    'model.deliverPhone' (value) {
      return this.validate(value).required('请填写联系方式')
    },
    'model.detailAddress' (value) {
      return this.validate(value).required('请填写详细地址')
    }
  },

  data() {
    return {
      tranportTypes: [{
        label: '大板车',
        value: '1'
      }, {
        label: '救援车',
        value: '2'
      }],
      model: {
        startAddress: null,
        endAddress: null,
        tranportType: '',
        deliverDate: '',
        deliverContact: '',
        deliverPhone: '',
        detailAddress: '',
        comment: ''
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
.popup-picker {
  height: 30vh;
  left: 0;
  right: 0;
}
</style>
