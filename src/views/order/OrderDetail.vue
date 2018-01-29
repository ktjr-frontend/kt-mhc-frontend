<template lang="pug">
  section.order-detail
    section.body
      mt-navbar(v-model='tabActive')
        mt-tab-item#1 订单信息
        mt-tab-item#2 车辆信息
        mt-tab-item#3 在途信息
        mt-tab-item#4 资金信息
      mt-tab-container(v-model='tabActive', :swipeable="true", disable-swipe)
        mt-tab-container-item#1
          .order-info-header.ui-border-t
            .header-row.flex
              .text-left.flex-item
                small 订单号：{{order.no}}
              .text-right.flex-item
                small {{order.createDate | moment('YYYY-MM-DD')}}
            .header-row.flex
              .text-left.flex-item
                div 代购金额 <em>{{order.amount | ktCurrency}}</em>
              .text-right.flex-item
                em {{order.status | orderStatusFormat}}
          .body.mt10
            section
              .fields
                mt-cell.title-cell
                  span(slot="title") 基本信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 供应商：{{order.provider}}
                    p.title-hint
                      | 订单备注：{{order.desc}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 订单资料
                mt-cell(:class="{'empty': !order.purchaseContract}", :value="order.purchaseContract ? '已上传' : '未上传'")
                  div(slot="title") 采购合同照片
                mt-cell(:class="{'empty': !order.paymentCert}", :value="order.paymentCert ? '已填写' : '未填写'")
                  div(slot="title") 已支付凭证
                mt-cell(:class="{'empty': !order.depositCert}", :value="order.depositCert ? '已填写' : '未上传'")
                  div(slot="title") 保证金凭证
                mt-cell(:class="{'empty': !order.handingLetter}", :value="order.handingLetter ? '已上传' : '未上传'")
                  div(slot="title") 手续承诺函照片

        mt-tab-container-item#2
          .no-data
            i.iconfont.icon-car
            p 暂无数据
        mt-tab-container-item#3
          .no-data
            i.iconfont.icon-car
            p 暂无数据
        mt-tab-container-item#4
          .body.mt10
            section
              .fields
                mt-cell.title-cell
                  span(slot="title") 合同信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 合同金额：{{order.contactAmount | ktCurrency}}
                    p.title-hint
                      | 定金：{{order.payAmount | ktCurrency}}
                    p.title-hint
                      | 保证金：{{order.bailAmount | ktCurrency}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 供应商打款信息
                mt-cell.has-hint
                  div(slot="title")
                    .provider-logo.flex
                      img(src="~assets/images/color.png")
                    p.title-hint
                      | 打款金额：{{order.fullPayment.amount | ktCurrency}}
                    p.title-hint
                      | 打款日期：{{order.fullPayment.date | moment('YYYY-MM-DD')}}
                    p.title-hint
                      | 账号：{{order.fullPayment.account}}
                    p.title-hint
                      | 开户行：{{order.fullPayment.bankName}}
                    p.title-hint
                      | 户名：{{order.fullPayment.bankUserName}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 结算信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 无内容
</template>

<script>
import OrderMixin from '@/views/order/mixin.js'

export default {
  mixins: [OrderMixin],
  methods: {

  },

  data() {
    return {
      order: {
        no: 'G20171123118765',
        amount: 160000,
        contactAmount: 10000,
        payAmount: 10000,
        bailAmount: 10000,
        status: '1',
        provider: '宁波奥宝莱汽车有限公司',
        desc: '测试订单',
        purchaseContract: {},
        fullPayment: {
          amount: 150000,
          date: new Date(),
          account: 1231121111111,
          bankName: '招商银行',
          bankUserName: '测试账户'
        },
        createDate: new Date()
      },
      tabActive: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-info-header {
  padding: 10px;
  background-color: white;
}

.provider-logo {
  float: left;
  height: 100px;
  width: 100px;
}

.header-row {
  padding: 5px 0;
}
</style>
