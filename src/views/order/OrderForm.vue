<template lang="pug">
  section.order-form
    form(@submit.prevent="submit")
      section
        .fields
          mt-cell(title='供应商信息', :state="getFieldState('model.supplier')", :class="{'empty': !model.supplier}", :is-link="!readonly", @click.native="showSupplierSearch")
            span {{model.supplier || '请选择'}}
          input(type="hidden", v-model="model.supplier")
      section.mt10
        //- .fields-header 带 <em>*</em> 为必填
        .fields
          mt-cell(:is-link="!readonly", :class="{'empty': !model.vehicles.length}", :state="getFieldState('model.vehicles.length')", @click.native="showVehicleList", :value="model.vehicles.length ? (model.vehicles.length + '辆') : '请选择'")
            span(slot="title") 车辆信息 <em>*</em>
          input(type="hidden", v-model="model.vehicles.length")
          mt-cell(:is-link="!readonly", @click.native="showLogistics", :class="{'empty': !model.logistics}",  :value="model.logistics ? '已添加' : '请选择'", :state="getFieldState('model.logistics')")
            span(slot="title") 选择物流 <em>*</em>
          input(type="hidden", v-model="model.logistics")
          //- mt-cell(is-link, @click.native="showVehiclePhoto", :class="{'empty': !modelShow.vehiclePhoto}",  :value="modelShow.vehiclePhoto ? '已上传' : '请上传'", :state="getFieldState('model.vehiclePhoto')")
            span(slot="title") 实车照片 <em>*</em>
          //- kt-field(type='textarea', label='订单简称', placeholder='请输入备注（非必填）', v-model="model.desc")
      section.mt10
        .fields
          //- mt-cell.title-cell
            span(slot="title") 填写金额
          mt-cell.has-hint(:class="{'empty': !model.contractAmount}", :value="!model.vehicles.length ? '自动计算' : model.contractAmount + '万元'")
            div(slot="title")
              | 车辆采购金额 <em>*</em>
              p.title-hint 采购和通总金额，与纸质合同总金额相等
          //- kt-field.has-hint.input-right(type="number", :readonly="readonly", :disableClear="readonly", :disabled="!model.vehicles.length", label='empty', placeholder='请输入', v-model='model.contractAmount', :state="getFieldState('model.contractAmount')", @click.native="showFieldError($event, 'model.contractAmount')")
            div(slot="label")
              | 车辆采购金额 <em>*</em>
              p.title-hint 采购和通总金额，与纸质合同总金额相等
            span(slot="input1-append") 万元
          mt-cell.has-hint(:class="{'empty': !model.cashDeposit}", :value="!model.vehicles.length ? '自动计算' : model.cashDeposit + '万元'")
            div(slot="title")
              | 保证金金额 <em>*</em>
              p.title-hint 最低为代购金额的20%，请输入您的实际<br>打款保证金金额，多打款不计入订单
          //- kt-field.has-hint.input-right(type="number", :readonly="readonly", :disableClear="readonly", :disabled="!model.vehicles.length", label='empty', placeholder='请输入', v-model='model.cashDeposit', :state="getFieldState('model.cashDeposit')", @click.native="showFieldError($event, 'model.cashDeposit')")
            div(slot="label")
              | 保证金金额 <em>*</em>
              p.title-hint 最低为代购金额的20%，请输入您的实际<br>打款保证金金额，多打款不计入订单
            span(slot="input1-append") 万元
            //- template(slot="input2")
              input.mint-field-core(:value="!bailRate ? '' :bailRate | ktCurrency('','')", placeholder="自动计算", readonly)
            //- span(slot="input2-append") %
          mt-cell.has-hint(:class="{'empty': !loanAmount}")
            span {{!loanAmount ? '自动计算' : loanAmount + '万元'}}
            //- span
            div(slot="title")
              | 垫资金额 <em>*</em>
              p.title-hint 合同金额减去已支付金额
          kt-field.has-hint.input-right(type="number", :readonly="readonly", :disableClear="readonly", :disabled="!model.vehicles.length", label='empty', placeholder='请输入', v-model='model.deposit', :state="getFieldState('model.deposit')", @click.native="showFieldError($event, 'model.deposit')")
            div(slot="label")
              | 定金金额
              p.title-hint 已经支付给供应商的打款金额
            span(slot="input1-append") 万元
          kt-field(type='input', label='订单备注', :readonly="readonly", :disableClear="readonly", placeholder='请输入备注（非必填）', v-model="model.note")
      section.mt10
        .fields
          //- mt-cell.title-cell
            span(slot="title") 上传资料
          //- mt-cell(is-link, @click.native="showPurchaseContract", :class="{'empty': !modelShow.purchaseContract}",  :value="modelShow.purchaseContract ? '已上传' : '请上传'", :state="getFieldState('model.purchaseContract')")
            span(slot="title") 采购合同 <em>*</em>
          //- input(type="hidden", v-model="model.purchaseContract")
          kt-field.has-hint.input-right(type="number", :readonly="readonly", :disableClear="readonly", :disabled="!model.vehicles.length", label='empty', placeholder='请输入', v-model='model.contractNo', :state="getFieldState('model.contractNo')", @click.native="showFieldError($event, 'model.contractNo')")
            div(slot="label")
              | 填写合同号 <em>*</em>
              p.title-hint 经销商与平台签订
          mt-cell(:is-link="true", @click.native="showDepositAction", :class="{'empty': !model.cashDepositAddress.length}",  :value="model.cashDepositAddress.length ? '已添加' : '请添加'", :state="getFieldState('model.cashDepositAddress')")
            span(slot="title") 保证金凭证
          input(type="hidden", v-model="model.cashDepositAddress")
          mt-cell(:is-link="true", @click.native="showDepositAddress", :class="{'empty': !model.depositAddress.length}", :value="model.depositAddress.length ? '已上传' : '请上传'", :state="getFieldState('model.depositAddress')")
            span(slot="title") 定金凭证
          input(type="hidden", v-model="model.depositAddress")
          //- mt-cell(is-link, @click.native="showHandingLetter", :class="{'empty': !modelShow.handingLetter}",  :value="modelShow.handingLetter ? '已上传' : '请上传'", :state="getFieldState('model.handingLetter')")
          //-   span(slot="title") 手续函照片
          //- input(type="hidden", v-model="model.handingLetter")
      //- section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 物流信息
          mt-cell(is-link, @click.native="showLogistics", :class="{'empty': !modelShow.logistics}",  :value="modelShow.logistics || '请选择'", :state="getFieldState('model.handingLetter')")
            span(slot="title") 选择物流 <em>*</em>
          input(type="hidden", v-model="model.logistics")
      .footer-tips
        h4 注意事项
        ol
          li 合同总金额，即纸质合同金额，必须和每辆车金额之和相等。如有出入，请联系供应商修改合同
          li 已支付金额包含打款至供应商的定金，尾款及其他无须开好车平台垫付的款项，将不计入代购金额，需要后续上传截图证明
          li 保证金需要打款至平台账户，需要后续上传截图证明，实际打款请与填入金额一致，否则会影响放款速度；实际比输入多打不计入订单，如需要退款，请联系相关业务员
      .form-buttons-placeholder
      .form-buttons.fixed
        mt-button.mint-button-block(type='primary', size='large') 提交
    //- kt-actionsheet(:actions='depositActions', v-model='depositSheetVisible')
    mt-popup.popup-box(v-model='supplierSearchVisible', position='right')
      supplier-search(:close="closeSupplierSearch", @popup-confirmed="supplierConfirm")
    mt-popup.popup-box(v-model='vehicleListVisible', position='right')
      vehicle-list(ref="vehicleList", :close="closeVehicleList", @popup-confirmed="vehicleConfirm")
    mt-popup.popup-box(v-model='logisticsVisible', position='right')
      logistics(ref="logistics", :close="closeLogistics", @popup-confirmed="logisticsConfirm")
    //- mt-popup.popup-box(v-model='vehiclePhotoVisible', position='right')
      vehicle-photo(ref="vehiclePhoto", :close="closeVehiclePhoto", @popup-confirmed="vehiclePhotoConfirm")
    //- mt-popup.popup-box(v-model='purchaseContractVisible', position='right')
      purchase-contract(ref="purchaseContract", :close="closePurchaseContract", @popup-confirmed="purchaseContractConfirm")
    //- mt-popup.popup-box(v-model='handingLetterVisible', position='right')
      handing-letter(ref="handingLetter", :close="closeHandingLetter", @popup-confirmed="handingLetterConfirm")
    mt-popup.popup-box(v-model='depositAddressVisible', position='right')
      deposit-address(ref="depositAddress", :close="closeDepositAddress", @popup-confirmed="depositAddressConfirm")
    mt-popup.popup-box(v-model='cashDepositAddressVisible', position='right')
      cash-deposit-address(ref="cashDepositAddress", :close="closeCashDepositAddress", @popup-confirmed="cashDepositAddressConfirm", :cash-deposit-list="model.cashDepositAddress")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import SupplierSearch from '@/views/order/SupplierSearch.vue'
import VehicleList from '@/views/order/VehicleList.vue'
import Logistics from '@/views/order/Logistics.vue'
import PurchaseContract from '@/views/order/PurchaseContract.vue'
import VehiclePhoto from '@/views/order/VehiclePhoto.vue'
import HandingLetter from '@/views/order/HandingLetter.vue'
import DepositAddress from '@/views/order/DepositAddress.vue'
import CashDepositAddress from '@/views/order/CashDepositList.vue'
import { titleUpdater } from '@/common/crossers.js'
import { orders } from '@/common/resources.js'
import { cloneDeep, filter } from 'lodash'

export default {
  components: {
    SupplierSearch,
    VehicleList,
    Logistics,
    PurchaseContract,
    VehiclePhoto,
    HandingLetter,
    DepositAddress,
    CashDepositAddress
  },
  mixins: [ValidatorMixin],
  validators: {
    'model.supplier' (value) {
      return this.validate(value).required('请选择供应商')
    },
    'model.vehicles.length' (value) {
      return this.validate(value).required('请选择车辆')
    },
    'model.logistics' (value) {
      return this.validate(value).required('请填写物流信息')
    },
    'model.contractAmount' (value) {
      return this.validate(value).required('请输入采购金额')
    },
    // 'model.deposit' (value) {
    //   return this.validate(value).required('请输入已支付金额')
    // },
    'model.cashDeposit' (value) {
      return this.validate(value).required('请输入保证金金额')
    },
    'model.contractNo' (value) {
      return this.validate(value).required('请输入合同号')
    },
    // 'model.vehiclePhoto' (value) {
    //   return this.validate(value).required('请上传实车照片')
    // },
    // 'model.purchaseContract' (value) {
    //   return this.validate(value).required('请上传采购合同')
    // },
    // 'model.cashDepositAddress' (value) {
    //   return this.validate(value).required('请添加保证金凭证')
    // },
    'model.depositAddress' (value) {
      return this.validate(value).custom(() => {
        if (this.model.deposit && !value) {
          return '请上传定金凭证'
        }
      })
    }
    // 'model.handingLetter' (value) {
    //   return this.validate(value).required('请添加手续函照片')
    // }
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.supplierSearchVisible) {
        this.supplierSearchVisible = false
      } else if (this.logisticsVisible) {
        this.logisticsVisible = false
        // } else if (this.vehiclePhotoVisible) {
        // this.vehiclePhotoVisible = false
        // } else if (this.purchaseContractVisible) {
        //   this.purchaseContractVisible = false
        // } else if (this.handingLetterVisible) {
        //   this.handingLetterVisible = false
      } else if (this.depositAddressVisible) {
        this.depositAddressVisible = false
      } else if (this.cashDepositAddressVisible) {
        this.cashDepositAddressVisible = false
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
    showSupplierSearch() {
      if (this.readonly) return
      this.supplierSearchVisible = true
    },

    closeSupplierSearch() {
      this.supplierSearchVisible = false
    },

    supplierConfirm(supplierName) {
      this.model.supplier = supplierName || ''
      this.supplierSearchVisible = false
    },

    // 车辆信息
    showVehicleList() {
      if (this.readonly) return
      if (!this.model.supplier) {
        this.$toast('请选择供应商')
        return
      }

      this.$refs.vehicleList.reset()
      this.vehicleListVisible = true
      this.$nextTick(() => {
        this.$refs.vehicleList.updatePopBoxHeight(44) // 44 is bottom button height
      })
    },

    closeVehicleList() {
      this.vehicleListVisible = false
    },

    vehicleConfirm(vehicle) {
      this.model.vehicles.push(vehicle)
      this.model.contractAmount = vehicle.vehicleNumber * vehicle.price
      this.vehicleListVisible = false
    },

    // 物料信息
    showLogistics() {
      if (this.readonly) return
      if (!this.model.vehicles.length) {
        this.$toast('请选择车辆')
        return
      }

      this.$refs.logistics.init(this.model.logistics)
      this.logisticsVisible = true
      this.$nextTick(() => {
        this.$refs.logistics.updatePopBoxHeight(44) // 44 is bottom button height
      })
    },

    closeLogistics() {
      this.logisticsVisible = false
    },

    logisticsConfirm(logistics = {}) {
      this.model.logistics = logistics
      // this.modelShow.logistics = '已设置'
      this.logisticsVisible = false
    },

    // 车辆照片
    // showVehiclePhoto() {
    //   if (!this.model.vehicles.length) {
    //     this.$toast('请选择车辆')
    //     return
    //   }

    //   this.$refs.vehiclePhoto.init(this.model.vehiclePhoto)
    //   this.vehiclePhotoVisible = true
    // },

    // closeVehiclePhoto() {
    //   this.vehiclePhotoVisible = false
    // },

    // vehiclePhotoConfirm(vehiclePhoto = {}) {
    //   this.model.vehiclePhoto = vehiclePhoto
    //   this.modelShow.vehiclePhoto = '已上传'
    //   this.vehiclePhotoVisible = false
    // },

    // 合同信息
    // showPurchaseContract() {
    //   if (!this.model.vehicles.length) {
    //     this.$toast('请选择车辆')
    //     return
    //   }

    //   this.$refs.purchaseContract.init(this.model.purchaseContract)
    //   this.purchaseContractVisible = true
    // },

    // closePurchaseContract() {
    //   this.purchaseContractVisible = false
    // },

    // purchaseContractConfirm(purchaseContract = {}) {
    //   this.model.purchaseContract = purchaseContract
    //   this.modelShow.purchaseContract = '已上传'
    //   this.purchaseContractVisible = false
    // },

    // // 手续函照片
    // showHandingLetter() {
    //   if (!this.model.vehicles.length) {
    //     this.$toast('请选择车辆')
    //     return
    //   }

    //   this.$refs.handingLetter.init(this.model.handingLetter)
    //   this.handingLetterVisible = true
    // },

    // closeHandingLetter() {
    //   this.handingLetterVisible = false
    // },

    // handingLetterConfirm(handingLetter = {}) {
    //   this.model.handingLetter = handingLetter
    //   this.modelShow.handingLetter = '已上传'
    //   this.handingLetterVisible = false
    // },

    // 支付凭证
    showDepositAddress() {
      // if (this.readonly && this.model.depositAddress) return
      if (!this.model.vehicles.length) {
        this.$toast('请选择车辆')
        return
      }

      this.$refs.depositAddress.init(this.model.depositAddress)
      this.depositAddressVisible = true
    },

    closeDepositAddress() {
      this.depositAddressVisible = false
    },

    depositAddressConfirm(depositAddress = {}) {
      this.model.depositAddress.push(depositAddress)
      // this.modelShow.depositAddress = '已上传'
      this.depositAddressVisible = false
      this.$nextTick(() => {
        this.$refs.depositAddress.updatePopBoxHeight(44) // 44 is bottom button height
      })
    },

    // 保证金凭证
    showCashDepositAddress(type) {
      if (!this.model.vehicles.length) {
        this.$toast('请选择车辆')
        return
      }

      this.$refs.cashDepositAddress.init(this.model.cashDepositAddress, type)
      this.cashDepositAddressVisible = true
      this.$nextTick(() => {
        this.$refs.cashDepositAddress.updatePopBoxHeight(44) // 44 is bottom button height
      })
    },

    // 选项
    showDepositAction() {
      // if (this.readonly && this.model.cashDepositAddress) return
      if (!this.model.vehicles.length) {
        this.$toast('请选择车辆')
        return
      }
      this.showCashDepositAddress('offline_bank')
      // this.depositSheetVisible = true
    },

    closeCashDepositAddress() {
      this.cashDepositAddressVisible = false
    },

    cashDepositAddressConfirm(cashDepositAddress = {}) {
      this.model.cashDepositAddress.push(cashDepositAddress)
      // this.modelShow.cashDepositAddress = '已上传'
      this.cashDepositAddressVisible = false
    },

    async submit() {
      const success = await this.$validate()

      // // 保证主要内容填写
      // const inValid = some(this.validation.errors, err => {
      //   return includes(['model.supplier', 'model.vehicles.length', 'model.deposit', 'cashDeposit'], err.field)
      // })

      // if (inValid) {
      //   this.$toast('请填写主要订单信息', 'error')
      //   return
      // }

      if (success) {
        const model = cloneDeep(this.model)
        model.payments = [].concat(model.depositAddress).concat(model.cashDepositAddress)
        delete model.depositAddress
        delete model.cashDepositAddress
        const res = await orders.save(model).then(res => res.json())
        if (res.code === this.RET_CODE_MAP.OK) {
          this.$router.back()
        } else {
          this.$toast('保存失败', 'error')
        }
        // to be done
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  created() {
    const orderId = this.$route.params.id
    if (orderId !== 'add') {
      orders
        .get({ id: this.$route.params.id })
        .then(res => res.json())
        .then(res => {
          this.model.cashDepositAddress = filter(res.data.payments, v => v.type === 1)
          this.model.depositAddress = filter(res.data.payments, v => v.type === 2)
        })

      // this.model =
      this.model = {
        ...this.model,
        supplier: '宁波奥宝莱汽车有限公司',
        vehicles: [{ vehicleNumber: 4 }],
        contractNo: '1123111',
        logistics: {},
        // purchaseContract: {},
        // handingLetter: {},
        // depositAddress: {},
        // cashDepositAddress: {},
        // note: '奥迪A3 2018款 30周周年年型 Sportback 40T',
        contractAmount: 160000,
        deposit: 10000,
        cashDeposit: 150000
      }
      console.log(this.model)
      titleUpdater.$emit('updatetitle', '编辑订单')
    } else {
      titleUpdater.$emit('updatetitle', '添加订单')
    }
  },

  computed: {
    loanAmount() {
      const loanAmount = Number(this.model.contractAmount) - Number(this.model.deposit)
      this.model.loanAmount = loanAmount
      return loanAmount
    },
    readonly() {
      return this.$route.params.id !== 'add'
    }
    // bailRate() {
    //   if (!this.model.contractAmount) return null
    //   return Number(this.model.cashDeposit) / Number(this.model.contractAmount)
    // }
  },

  watch: {

  },

  data() {
    const _self = this
    return {
      depositSheetVisible: false,
      supplierSearchVisible: false,
      vehicleListVisible: false,
      logisticsVisible: false,
      // vehiclePhotoVisible: false,
      // purchaseContractVisible: false,
      // handingLetterVisible: false,
      depositAddressVisible: false,
      cashDepositAddressVisible: false,
      depositActions: [{
        name: '线下银行卡',
        method() {
          _self.depositSheetVisible = true
          _self.showCashDepositAddress('offline_bank')
          // _self.$router.push({ name: 'pickCar' })
        }
      }, {
        name: '线下非银行卡',
        method() {
          _self.depositSheetVisible = true
          _self.showCashDepositAddress('offline_not_bank')
          // _self.$router.push({ name: 'interestTransfer' })
        }
      }],
      // modelShow: {
      //   logistics: '',
      //   // vehiclePhoto: '',
      //   // purchaseContract: '',
      //   // handingLetter: '',
      //   depositAddress: '',
      //   cashDepositAddress: ''
      // },
      model: {
        supplier: '',
        vehicles: [],
        logistics: null,
        contractNo: null,
        // vehiclePhoto: null,
        // purchaseContract: null,
        depositAddress: [], // 定金
        cashDepositAddress: [], // 保证金
        // handingLetter: null,
        note: '',
        loanAmount: null,
        contractAmount: null,
        deposit: null,
        cashDeposit: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
