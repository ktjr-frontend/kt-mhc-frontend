<template lang="pug">
  section.settlement-detail
    .body
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 结算信息
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 结算日期：{{settlement.settlementDate}}
              p.title-hint
                | 结算单号：{{settlement.no}}
              p.title-hint
                | 订单编号：{{settlement.financingApplicationNo}}
              p.title-hint
                | 经销商：{{settlement.supplier}}
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 费用结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 借款总额：{{settlement.financingAmount | ktCurrency}}
              p.title-hint
                | 保证金：{{settlement.cashDeposit | ktCurrency}}
              p.title-hint
                | 费用起始日：{{settlement.gmtCreated | moment('YYYY-MM-DD')}}
              p.title-hint
                | 费用结算日：{{settlement.gmtModified | moment('YYYY-MM-DD')}}
              p.title-hint
                | 计费天数：{{settlement.billingDays}}
              p.title-hint
                | 正常费用总额：{{settlement.firstStepAmount | ktCurrency}}
              p.title-hint
                | 第一阶梯天数：{{settlement.firstStepDays}}
              p.title-hint
                | 阶梯费率/日：{{settlement.firstStepRate}}
              p.title-hint
                | 阶梯费用：{{settlement.firstStepAmount | ktCurrency}}
              p.title-hint
                | 金融结算总额：1000元
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 物流结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 承运商名称：{{settlement.logisticsEnterprise}}
              p.title-hint
                | 物流费用：{{settlement.logisticsCost | ktCurrency}}
              p.title-hint
                | 服务费：{{settlement.otherLogisticsCost | ktCurrency}}
              p.title-hint
                | 物流结算总额：{{settlement.logisticsSettlementAmount | ktCurrency}}
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 仓储结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 本次结算台数：{{settlement.vehicleNumber}}
              p.title-hint
                | 存储费：{{settlement.storageSettlementAmount | ktCurrency}}
              p.title-hint
                | 服务费：{{settlement.otherStorageCost | ktCurrency}}
              p.title-hint
                | 仓储结算总额：{{}}
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 结算合计
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 应收总额：100000元
              p.title-hint
                | 待还款金额：10000元
              p.title-hint
                | 优惠金额：{{settlement.preferentialAmount}}
              p.title-hint
                | 实际应收金额：{{settlement.actualSettlementAmount}}
              p.title-hint
                | 实际应收大写：壹万元整
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 上传支付凭证
          mt-cell(:is-link="!model.depositAddress", @click.native="showDepositAddress", :class="{'empty': !model.depositAddress}", :value="model.depositAddress ? '已上传' : '请上传'", :state="getFieldState('model.depositAddress')")
            span(slot="title") 支付凭证
          input(type="hidden", v-model="model.depositAddress")
      section.mt10
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 完成
    mt-popup.popup-box(v-model='depositAddressVisible', position='right')
      deposit-address(ref="depositAddress", :close="closeDepositAddress", @popup-confirmed="depositAddressConfirm")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import DepositAddress from '@/views/order/DepositAddress.vue'
import { settlements } from '@/common/resources.js'

export default {
  components: { DepositAddress },
  mixins: [ValidatorMixin],
  validators: {
    'model.depositAddress' (value) {
      return this.validate(value).required('请上传支付凭证')
    }
  },

  created() {
    settlements
      .get({
        id: this.$route.params.id
      })
      .then(res => res.json())
      .then(res => {
        this.settlement = res.data
      })
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.depositAddressVisible) {
        this.depositAddressVisible = false
      } else {
        this.routerBack()
      }
    },

    // 支付凭证
    showDepositAddress() {
      this.$refs.depositAddress.init(this.model.depositAddress)
      this.depositAddressVisible = true
    },

    closeDepositAddress() {
      this.depositAddressVisible = false
    },

    depositAddressConfirm(depositAddress = {}) {
      this.model.depositAddress = depositAddress
      // this.modelShow.depositAddress = '已上传'
      this.depositAddressVisible = false
    },

    async submit() {
      const success = await this.$validate()

      if (success) {
        this.$toast('申请成功', 'success')

        this.$router.push({
          name: 'orders'
        })
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    return {
      depositAddressVisible: false,
      settlement: {
        'id': '3ee3a719ad7044f4afcc4db3e2b071ff',
        'no': 'fdb06f676024447b84f41489b34e',
        'financingApplicationNo': 'a719ad7044f4afcc4db3e2b07111',
        'pickUpApplicationNo': '3ee3a719ad7044f4afcc4',
        'supplier': '奥迪总部',
        'dealer': '4S店',
        'financingDate': '2018-03-11',
        'pickUpDate': '2018-03-12',
        'settlementDate': '2018-03-13',
        'cashDeposit': 11111.11,
        'deposit': 11111.11,
        'financingAmount': 2222.22,
        'billingDays': 2,
        'vehicleNumber': 10,
        'firstStepRate': 11.1111,
        'firstStepDays': 30,
        'firstStepAmount': 3333.33,
        'secondStepRate': 13.3333,
        'secondStepDays': 15,
        'secondStepAmount': 34.44,
        'overdueRate': 15.1111,
        'overdueDays': 10,
        'overdueAmount': 150.22,
        'financingSettlementAmount': 11111.11,
        'logisticsEnterprise': '22222.22',
        'conveyance': '火车',
        'logisticsSettlementVehicleNumber': 20,
        'logisticsCost': 3000.33,
        'otherLogisticsCost': 1000.22,
        'logisticsSettlementAmount': 4000.55,
        'warehouseEnterprise': '中国北京',
        'warehouseAddress': '北京市朝阳区',
        'storageStartTime': '2018-01-11 00:00:11',
        'storageEndTime': '2018-03-11 00:00:11',
        'storageDays': 60,
        'storageCostPerVehicle': 100,
        'storageVehicleNumber': 15,
        'otherStorageCost': 100.99,
        'storageSettlementAmount': 33333.33,
        'preferentialAmount': 1000.22,
        'actualSettlementAmount': 32333.11,
        'gmtCreated': '2018-01-11 00:00:11',
        'gmtModified': '2018-03-11 00:00:11',
        'note': '测试用例',
        'page': null,
        'size': null
      },
      model: {
        depositAddress: null
      }
    }
  }
}
</script>
