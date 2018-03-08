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
                | 结算日期：2018-09-12
              p.title-hint
                | 结算单号： 222s1231231zzz
              p.title-hint
                | 订单编号：123131131
              p.title-hint
                | 经销商：测试经销商
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 费用结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 借款总额：20000元
              p.title-hint
                | 保证金：1000元
              p.title-hint
                | 费用起始日：2018-09-01
              p.title-hint
                | 费用结算日：2018-09-01
              p.title-hint
                | 计费天数：201
              p.title-hint
                | 正常费用总额：10000元
              p.title-hint
                | 第一阶梯天数：100
              p.title-hint
                | 阶梯费率/日：10%
              p.title-hint
                | 阶梯费用：100元
              p.title-hint
                | 金融结算总额：1000元
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 物流结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 承运商名称：哈哈测试承运
              p.title-hint
                | 物流费用：1000元
              p.title-hint
                | 服务费：1000元
              p.title-hint
                | 物流结算总额：100元
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 仓储结算
          mt-cell.has-hint
            div(slot="title")
              p.title-hint
                | 本次结算台数：12
              p.title-hint
                | 存储费：1000元
              p.title-hint
                | 服务费：1000元
              p.title-hint
                | 仓储结算总额：1000元
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
                | 优惠金额：10000元
              p.title-hint
                | 实际应收金额：10000元
              p.title-hint
                | 实际应收大写：壹万元整
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 上传支付凭证
          mt-cell(:is-link="!model.depositAddress", @click.native="showDepositAddress", :class="{'empty': !modelShow.depositAddress}", :value="modelShow.depositAddress ? '已上传' : '请上传'", :state="getFieldState('model.depositAddress')")
            span(slot="title") 支付凭证
          input(type="hidden", v-model="model.depositAddress")
      section.mt10
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 完成
    mt-popup.popup-box(v-model='depositAddressVisible', position='right')
      payment-cert(ref="depositAddress", :close="closeDepositAddress", @popup-confirmed="depositAddressConfirm")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import DepositAddress from '@/views/order/DepositAddress.vue'

export default {
  components: { DepositAddress },
  mixins: [ValidatorMixin],
  validators: {
    'model.depositAddress' (value) {
      return this.validate(value).required('请上传支付凭证')
    }
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
      this.modelShow.depositAddress = '已上传'
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
      modelShow: {
        depositAddress: ''
      },
      model: {
        depositAddress: null
      }
    }
  }
}
</script>
