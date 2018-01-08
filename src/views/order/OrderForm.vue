<template lang="pug">
  section.order-form
    form(@submit.prevent="submit")
      section
        .fields
          mt-cell.em-cell(title='供应商信息', is-link, :value='model.provider', @click.native="showProviderSearch")
          input(type="hidden", v-model="model.provider")
      section
        .fields-header 带 <em>*</em> 为必填
        .fields
          mt-cell(is-link, :class="{'empty': !model.vehicleInfo}", @click.native="showVehicleList",  :value="model.vehicleInfo || '请选择'")
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
          kt-field.sub-cell.has-hint.input-right(type="number", label='手机号', placeholder='请输入', v-model='model.payAmount', :state="getFieldState('model.payAmount')", @click.native="showFieldError($event, 'model.payAmount')")
            div(slot="label")
              | 已支付金额 <em>*</em>
              p.title-hint 已经支付给供应商的打款金额
            span 元
          kt-field.sub-cell.has-hint.input-right(type="number", label='手机号', placeholder='请输入', v-model='model.bailAmount', :state="getFieldState('model.bailAmount')", @click.native="showFieldError($event, 'model.bailAmount')")
            div(slot="label")
              | 实际打款保证金 <em>*</em>
              p.title-hint 最低为代购金额的20%，请输入您的实际<br>打款保证金金额，多打款不计入订单
            span(slot="input1-append") 元
            template(slot="input2")
              input.mint-field-core(:value="!bailRate ? '' :bailRate | ktCurrency('','')", placeholder="自动计算", readonly)
            span(slot="input2-append") %
          mt-cell.sub-cell.has-hint(:class="{'empty': !payment}")
            span {{!payment ? '自动计算' : payment}}<em>元</em>
            div(slot="title")
              | 垫资金额 <em>*</em>
              p.title-hint 合同金额减去已支付金额
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 上传资料
          mt-cell(is-link, :class="{'empty': !model.contract}",  :value="model.contract || '请选择车辆'")
            span(slot="title") 采购合同 <em>*</em>
          input(type="hidden", v-model="model.contract")
          mt-cell(is-link, :class="{'empty': !model.contract}",  :value="model.contract || '请选择车辆'")
            span(slot="title") 已支付凭证
          input(type="hidden", v-model="model.contract")
          mt-cell(is-link, :class="{'empty': !model.contract}",  :value="model.contract || '请选择车辆'")
            span(slot="title") 保证金凭证 <em>*</em>
          input(type="hidden", v-model="model.contract")
          mt-cell(is-link, :class="{'empty': !model.contract}",  :value="model.contract || '请选择车辆'")
            span(slot="title") 手续函照片
          input(type="hidden", v-model="model.contract")
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 物流信息
          mt-cell(is-link, :class="{'empty': !model.contract}",  :value="model.contract || '请选择'")
            span(slot="title") 选择物流 <em>*</em>
          input(type="hidden", v-model="model.contract")
      .footer-tips
        h4 注意事项
        ol
          li 合同总金额，即纸质合同金额，必须和每辆车金额之和相等。如有出入，请联系供应商修改合同
          li 已支付金额包含打款至供应商的定金，尾款及其他无须开通金融平台垫付的款项，将不计入代购金额，需要后续上传截图证明
          li 保证金需要打款至平台账户，需要后续上传截图证明，实际打款请与填入金额一致，否则会影响放款速度；实际比输入多打不计入订单，如需要退款，请联系相关业务员
      .form-buttons-placeholder
      .form-buttons.fixed
        mt-button.mint-button-block(type='primary', size='large') 提交
    mt-popup.search-box(v-model='providerSearchVisible', position='right')
      provider-search(:close="closeProviderSearch", @provider-confirmed="providerConfirm")
    mt-popup.search-box(v-model='vehicleListVisible', position='right')
      vehicle-list(ref="vehicleList", :close="closeVehicleList", @vehicle-confirmed="vehicleConfirm")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import ProviderSearch from '@/views/order/ProviderSearch.vue'
import VehicleList from '@/views/order/VehicleList.vue'

export default {
  components: { ProviderSearch, VehicleList },
  mixins: [ValidatorMixin],
  validators: {
    'model.provider' (value) {
      return this.validate(value).required('请选择供应商')
    },
    'model.vehicleInfo' (value) {
      return this.validate(value).required('请输入手机号')
    }
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction () {
      if (this.providerSearchVisible) {
        this.providerSearchVisible = false
      } else if (this.vehicleListVisible) {
        if (this.$refs.vehicleList.backButtonAction) {
          this.$refs.vehicleList.backButtonAction()
        } else {
          this.vehicleListVisible = false
        }
      } else {
        this.routerBack()
      }
    },

    showProviderSearch() {
      this.providerSearchVisible = true
    },

    closeProviderSearch() {
      this.providerSearchVisible = false
    },

    providerConfirm(providerName) {
      this.model.provider = providerName || ''
      this.providerSearchVisible = false
    },

    showVehicleList() {
      this.vehicleListVisible = true
    },

    closeVehicleList() {
      this.vehicleListVisible = false
    },

    vehicleConfirm(vehicleName) {
      this.model.provider = vehicleName || ''
      this.providerSearchVisible = false
    },

    async submit() {
      const success = await this.$validate()
      if (success) {

        // to be done
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  computed: {
    payment() {
      return Number(this.model.totalAmount) - Number(this.model.payAmount)
    },
    bailRate() {
      if (!this.model.totalAmount) return null
      return Number(this.model.bailAmount) / Number(this.model.totalAmount)
    }
  },

  data() {
    return {
      providerSearchVisible: false,
      vehicleListVisible: false,
      model: {
        provider: '',
        vehicleInfo: '',
        desc: '',
        totalAmount: null,
        payAmount: null,
        bailAmount: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  height: 100%;
  width: 100%;
  background: $primary-bg-color;
}
</style>
