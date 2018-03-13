<template lang="pug">
  section.cash-deposit-list
    mt-header(ref="header", title="保证金凭证列表")
      mt-button(slot="right", @click.prevent="add('offline_bank')", size="small") 新增
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="backButtonAction")
    .body.overflow-scroll(ref="popBoxContainer")
      .card-body
        .no-data(v-if="!currentCashDepositList.length")
          i.iconfont.icon-car
          p 没有支付凭证
        kt-card-item(v-for='cashDeposit in currentCashDepositList', :key='cashDeposit.id', :arrow-visible="false")
          //- span(slot="headerRight")
            i.iconfont.icon-edit.ft14.smaller(@click="$router.push({name: 'cashDepositEdit', params: {id: cashDeposit.id}})")
          span(slot="headerLeft")
            | 打款序号：{{cashDeposit.financingApplicationNo}}
            .smaller.ml5 {{cashDeposit.paymentTime | moment("YYYY-MM-DD")}}
          //- span.color-primary(@click="goToDetail(cashDeposit)", slot='arrow') {{cashDeposit.status | cashDepositStatusFormat}}
          .content(@click="goToDetail(cashDeposit)")
            .content-row 支付金额：{{cashDeposit.amount | ktCurrency}}
            .content-row 支付账户：{{cashDeposit.outAccountName}}
            .content-row 银行账号：{{cashDeposit.outAccountBankCardNo}}
            .content-row 开户银行：{{cashDeposit.outAccountBankName}}
          .buttons.flex.ui-bcashDeposit-t(slot='footer')
            .text-left.flex-item
              button.ui-bcashDeposit-radius(@click="del(cashDeposit)") 删除
              //- button.ui-bcashDeposit-radius( @click="closecashDeposit(cashDeposit)") 删除
    mt-popup.popup-box(v-model='cashDepositAddressVisible', position='right')
      cash-deposit-address(ref="cashDepositAddress", :close="closeCashDepositAddress", @popup-confirmed="cashDepositAddressConfirm")
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 完成
</template>

<script>
import CashDepositAddress from '@/views/order/CashDepositAddress.vue'
import { remove } from 'lodash'

export default {
  components: { CashDepositAddress },
  props: {
    close: Function,
    cashDepositList: {
      type: Array,
      default () { return [] }
    }
  },

  methods: {
    backButtonAction() {
      if (this.cashDepositAddressVisible) {
        this.cashDepositAddressVisible = false
      } else {
        this.close()
      }
    },

    init(cashDepositList = []) {
      this.currentCashDepositList = [].concat(cashDepositList)
    },

    // add() {
    //   this.$refs.cashDepositAddress.init({}, '1')
    // },

    submit() {
      this.$emit('popup-confirmed', this.currentCashDepositList)
    },

    del(cashDeposit) {
      remove(this.currentCashDepositList, v => v.id === cashDeposit.id)
    },

    // 添加保证金凭证
    add(type) {
      this.$refs.cashDepositAddress.init({}, type)
      this.cashDepositAddressVisible = true
      this.$nextTick(() => {
        this.$refs.cashDepositAddress.updatePopBoxHeight(44) // 44 is bottom button height
      })
    },

    closeCashDepositAddress() {
      this.cashDepositAddressVisible = false
    },

    cashDepositAddressConfirm(cashDepositAddress = {}) {
      this.currentCashDepositList.push(cashDepositAddress)
      // this.modelShow.cashDepositAddress = '已上传'
      this.cashDepositAddressVisible = false
    }
  },

  watch: {
    cashDepositList() {
      this.currentCashDepositList = [].concat(this.cashDepositList)
    }
  },

  data() {
    return {
      cashDepositAddressVisible: false,
      currentCashDepositList: [].concat(this.cashDepositList)
    }
  }
}
</script>
