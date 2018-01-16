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
          mt-cell(is-link, :class="{'empty': !model.vehicle.count}", @click.native="showVehicleList",  :value="model.vehicle.count ? (model.vehicle.count + '辆') : '请选择'")
            span(slot="title") 车辆信息 <em>*</em>
          input(type="hidden", v-model="model.vehicle.count")
          kt-field(type='text', label='订单简称', placeholder='请输入备注（非必填）', v-model="model.desc")
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 填写金额
          mt-cell.has-hint(:class="{'empty': !model.totalAmount}", :value="!model.vehicle.count ? '请选择车辆' : model.totalAmount + '元'")
            div(slot="title")
              | 合同总金额 <em>*</em>
              p.title-hint 采购和通总金额，与纸质合同总金额相等
          kt-field.sub-cell.has-hint.input-right(type="number", :disabled="!model.vehicle.count", label='empty', placeholder='请输入', v-model='model.payAmount', :state="getFieldState('model.payAmount')", @click.native="showFieldError($event, 'model.payAmount')")
            div(slot="label")
              | 已支付金额 <em>*</em>
              p.title-hint 已经支付给供应商的打款金额
            span 元
          kt-field.sub-cell.has-hint.input-right(type="number", :disabled="!model.vehicle.count", label='empty', placeholder='请输入', v-model='model.bailAmount', :state="getFieldState('model.bailAmount')", @click.native="showFieldError($event, 'model.bailAmount')")
            div(slot="label")
              | 实际打款保证金 <em>*</em>
              p.title-hint 最低为代购金额的20%，请输入您的实际<br>打款保证金金额，多打款不计入订单
            span(slot="input1-append") 元
            template(slot="input2")
              input.mint-field-core(:value="!bailRate ? '' :bailRate | ktCurrency('','')", placeholder="自动计算", readonly)
            span(slot="input2-append") %
          mt-cell.sub-cell.has-hint(:class="{'empty': !advanceMoney}")
            span {{!advanceMoney ? '自动计算' : advanceMoney}}<span>元</span>
            div(slot="title")
              | 垫资金额 <em>*</em>
              p.title-hint 合同金额减去已支付金额
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 上传资料
          mt-cell(is-link, @click.native="showPurchaseContract", :class="{'empty': !modelShow.purchaseContract}",  :value="modelShow.purchaseContract ? '已上传' : '请上传'")
            span(slot="title") 采购合同 <em>*</em>
          input(type="hidden", v-model="model.purchaseContract")
          mt-cell(is-link, @click.native="showPaymentCert", :class="{'empty': !modelShow.paymentCert}",  :value="modelShow.paymentCert ? '已上传' : '请上传'")
            span(slot="title") 已支付凭证 <em>*</em>
          input(type="hidden", v-model="model.paymentCert")
          mt-cell(is-link, @click.native="showDepositCert", :class="{'empty': !modelShow.depositCert}",  :value="modelShow.depositCert ? '已添加' : '请添加'")
            span(slot="title") 保证金凭证 <em>*</em>
          input(type="hidden", v-model="model.depositCert")
          mt-cell(is-link, @click.native="showHandingLetter", :class="{'empty': !modelShow.handingLetter}",  :value="modelShow.handingLetter ? '已上传' : '请上传'")
            span(slot="title") 手续函照片 <em>*</em>
          input(type="hidden", v-model="model.handingLetter")
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 物流信息
          mt-cell(is-link, @click.native="showLogistics", :class="{'empty': !modelShow.logistics}",  :value="modelShow.logistics || '请选择'")
            span(slot="title") 选择物流 <em>*</em>
          input(type="hidden", v-model="model.logistics")
      .footer-tips
        h4 注意事项
        ol
          li 合同总金额，即纸质合同金额，必须和每辆车金额之和相等。如有出入，请联系供应商修改合同
          li 已支付金额包含打款至供应商的定金，尾款及其他无须开通金融平台垫付的款项，将不计入代购金额，需要后续上传截图证明
          li 保证金需要打款至平台账户，需要后续上传截图证明，实际打款请与填入金额一致，否则会影响放款速度；实际比输入多打不计入订单，如需要退款，请联系相关业务员
      .form-buttons-placeholder
      .form-buttons.fixed
        mt-button.mint-button-block(type='primary', size='large') 提交
    mt-popup.popup-box(v-model='providerSearchVisible', position='right')
      provider-search(:close="closeProviderSearch", @popup-confirmed="providerConfirm")
    mt-popup.popup-box(v-model='vehicleListVisible', position='right')
      vehicle-list(ref="vehicleList", :close="closeVehicleList", @popup-confirmed="vehicleConfirm")
    mt-popup.popup-box(v-model='logisticsVisible', position='right')
      logistics(ref="logistics", :close="closeLogistics", @popup-confirmed="logisticsConfirm")
    mt-popup.popup-box(v-model='purchaseContractVisible', position='right')
      purchase-contract(ref="purchaseContract", :close="closePurchaseContract", @popup-confirmed="purchaseContractConfirm")
    mt-popup.popup-box(v-model='handingLetterVisible', position='right')
      handing-letter(ref="handingLetter", :close="closeHandingLetter", @popup-confirmed="handingLetterConfirm")
    mt-popup.popup-box(v-model='paymentCertVisible', position='right')
      payment-cert(ref="paymentCert", :close="closePaymentCert", @popup-confirmed="paymentCertConfirm")
    mt-popup.popup-box(v-model='depositCertVisible', position='right')
      deposit-cert(ref="depositCert", :close="closeDepositCert", @popup-confirmed="depositCertConfirm")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import ProviderSearch from '@/views/order/ProviderSearch.vue'
import VehicleList from '@/views/order/VehicleList.vue'
import Logistics from '@/views/order/Logistics.vue'
import PurchaseContract from '@/views/order/PurchaseContract.vue'
import HandingLetter from '@/views/order/HandingLetter.vue'
import PaymentCert from '@/views/order/PaymentCert.vue'
import DepositCert from '@/views/order/DepositCert.vue'

export default {
  components: { ProviderSearch, VehicleList, Logistics, PurchaseContract, HandingLetter, PaymentCert, DepositCert },
  mixins: [ValidatorMixin],
  validators: {
    'model.provider' (value) {
      return this.validate(value).required('请选择供应商')
    },
    'model.vehicle.count' (value) {
      return this.validate(value).required('请选择车辆')
    },
    'model.payAmount' (value) {
      return this.validate(value).required('请输入已支付金额')
    },
    'model.bailAmount' (value) {
      return this.validate(value).required('请输入实际打款保证金')
    },
    'model.purchaseContract' (value) {
      return this.validate(value).required('请上传采购合同')
    },
    'model.depositCert' (value) {
      return this.validate(value).required('请添加保证金凭证')
    }
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.providerSearchVisible) {
        this.providerSearchVisible = false
      } else if (this.logisticsVisible) {
        this.logisticsVisible = false
      } else if (this.purchaseContractVisible) {
        this.purchaseContractVisible = false
      } else if (this.handingLetterVisible) {
        this.handingLetterVisible = false
      } else if (this.paymentCertVisible) {
        this.paymentCertVisible = false
      } else if (this.depositCertVisible) {
        this.depositCertVisible = false
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

    // 供应商信息
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

    // 车辆信息
    showVehicleList() {
      if (!this.model.provider) {
        this.$toast('请选择供应商')
        return
      }

      this.$refs.vehicleList.reset()
      this.vehicleListVisible = true
    },

    closeVehicleList() {
      this.vehicleListVisible = false
    },

    vehicleConfirm(vehicle) {
      this.model.vehicle = vehicle
      this.model.totalAmount = vehicle.count * vehicle.price
      this.vehicleListVisible = false
    },

    // 物料信息
    showLogistics() {
      // if (!this.model.vehicle.count) {
      //   this.$toast('请选择车辆')
      //   return
      // }

      this.$refs.logistics.init(this.model.logistics)
      this.logisticsVisible = true
    },

    closeLogistics() {
      this.logisticsVisible = false
    },

    logisticsConfirm(logistics = {}) {
      this.model.logistics = logistics
      this.modelShow.logistics = '已设置'
      this.logisticsVisible = false
    },

    // 合同信息
    showPurchaseContract() {
      // if (!this.model.vehicle.count) {
      //   this.$toast('请选择车辆')
      //   return
      // }

      this.$refs.purchaseContract.init(this.model.purchaseContract)
      this.purchaseContractVisible = true
    },

    closePurchaseContract() {
      this.purchaseContractVisible = false
    },

    purchaseContractConfirm(purchaseContract = {}) {
      this.model.purchaseContract = purchaseContract
      this.modelShow.purchaseContract = '已上传'
      this.purchaseContractVisible = false
    },

    // 手续函照片
    showHandingLetter() {
      // if (!this.model.vehicle.count) {
      //   this.$toast('请选择车辆')
      //   return
      // }

      this.$refs.handingLetter.init(this.model.handingLetter)
      this.handingLetterVisible = true
    },

    closeHandingLetter() {
      this.handingLetterVisible = false
    },

    handingLetterConfirm(handingLetter = {}) {
      this.model.handingLetter = handingLetter
      this.modelShow.handingLetter = '已上传'
      this.handingLetterVisible = false
    },

    // 支付凭证
    showPaymentCert() {
      // if (!this.model.vehicle.count) {
      //   this.$toast('请选择车辆')
      //   return
      // }

      this.$refs.paymentCert.init(this.model.paymentCert)
      this.paymentCertVisible = true
    },

    closePaymentCert() {
      this.paymentCertVisible = false
    },

    paymentCertConfirm(paymentCert = {}) {
      this.model.paymentCert = paymentCert
      this.modelShow.paymentCert = '已上传'
      this.paymentCertVisible = false
    },

    // 保证金凭证
    showDepositCert() {
      // if (!this.model.vehicle.count) {
      //   this.$toast('请选择车辆')
      //   return
      // }

      this.$refs.depositCert.init(this.model.depositCert)
      this.depositCertVisible = true
    },

    closeDepositCert() {
      this.depositCertVisible = false
    },

    depositCertConfirm(depositCert = {}) {
      this.model.depositCert = depositCert
      this.modelShow.depositCert = '已上传'
      this.depositCertVisible = false
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
    advanceMoney() {
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
      logisticsVisible: false,
      purchaseContractVisible: false,
      handingLetterVisible: false,
      paymentCertVisible: false,
      depositCertVisible: false,
      modelShow: {
        logistics: '',
        purchaseContract: '',
        paymentCert: '',
        depositCert: ''
      },
      model: {
        provider: '',
        vehicle: { count: 0 },
        logistics: {},
        purchaseContract: {},
        paymentCert: {},
        depositCert: {},
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
</style>
