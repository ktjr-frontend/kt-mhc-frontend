<template lang="pug">
  section.order-detail
    section.body
      mt-navbar(v-model='tabActive')
        mt-tab-item#1 订单信息
        mt-tab-item#2 车辆信息
        mt-tab-item#3 物流信息
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
                  span(slot="title") 供应商信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 供应商：{{order.provider}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 订单备注
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | {{order.desc}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 订单资料
                //- mt-cell(:class="{'empty': !order.purchaseContract}", :value="order.purchaseContract ? '已上传' : '未上传'")
                  div(slot="title") 采购合同照片
                mt-cell(:is-link="!order.paymentCert", @click.native="showPaymentCert", :class="{'empty': !order.paymentCert}", :value="order.paymentCert ? '已添加' : '未添加'")
                  div(slot="title") 定金凭证
                mt-cell(:is-link="!order.depositCert", @click.native="showDepositAction", :class="{'empty': !order.depositCert}", :value="order.depositCert ? '已上传' : '未上传'")
                  div(slot="title") 保证金凭证
                //- mt-cell(:class="{'empty': !order.handingLetter}", :value="order.handingLetter ? '已上传' : '未上传'")
                  div(slot="title") 手续承诺函照片

        mt-tab-container-item#2
          //- .no-data
            i.iconfont.icon-car
            p 暂无数据
          kt-card-item.stress(:header-left='order.wayBillVehicle.model', :header-right="order.wayBillVehicle.status | wayBillVehicleStatusFormat")
            //- span.color-primary(slot='arrow') {{order.wayBillVehicle.status | wayBillVehicleStatusFormat}}
            .content
              .content-row 车架号：{{order.wayBillVehicle.frameNo}}
              .content-row 外观内饰：{{order.wayBillVehicle.appearTrim}}
              .content-row 发动机排量（ML）：{{order.wayBillVehicle.displacement}}
              .content-row 生产日期：2018年12月03日
              .content-row 指导价：{{order.wayBillVehicle.price}}万元
              .content-row.ui-border-t.mt10.pt10
                small
                  span 发车日期：2018年12月03日
              .content-row
                small
                  span 出库日期：2018年11月03日
              .content-row
                small
                  span 仓库：北京-昌平区-测试车库1
            .buttons.text-right.ui-border-t(slot='footer')
              button.ui-border-radius.warning(@click="showVehiclePhoto(order.wayBillVehicle)") 验车照片
        mt-tab-container-item#3
          //- .no-data
          //-   i.iconfont.icon-car
          //-   p 暂无数据
          .body.mt10
            section
              .fields
                mt-cell.title-cell
                  span(slot="title") 物流信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 入库地址：测试地址
                    p.title-hint
                      | 入库时间：2018-08-12
                    p.title-hint
                      | 预计运达时间：2019-12-12
                    p.title-hint
                      | 实际运达时间：2019-12-12
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
    mt-popup.popup-box(v-model='paymentCertVisible', position='right')
      payment-cert(ref="paymentCert", :close="closePaymentCert", @popup-confirmed="paymentCertConfirm")
    mt-popup.popup-box(v-model='depositCertVisible', position='right')
      deposit-cert(ref="depositCert", :close="closeDepositCert", @popup-confirmed="depositCertConfirm")
    mt-popup.popup-box(v-model="photosVisible", position="right")
      mt-header(ref="header", title="验车照片")
        //- mt-button(icon="back", slot="left", @click.prevent="photosVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="photosVisible = false")
      vehicle-photo(:photos="activePhotos", ref="vehiclePhoto", :close="() => {photosVisible = false}")
</template>

<script>
import OrderMixin from '@/views/order/mixin.js'
import PaymentCert from '@/views/order/PaymentCert.vue'
import DepositCert from '@/views/order/DepositCert.vue'
import VehiclePhoto from '@/views/mine/VehiclePhoto.vue'
import MineMixin from '@/views/mine/mixin.js'

export default {
  mixins: [OrderMixin, MineMixin],
  components: { PaymentCert, DepositCert, VehiclePhoto },
  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.photosVisible) {
        this.$refs.vehiclePhoto.backButtonAction()
      } else if (this.paymentCertVisible) {
        this.paymentCertVisible = false
      } else if (this.depositCertVisible) {
        this.depositCertVisible = false
      } else {
        this.routerBack()
      }
    },
    // 支付凭证
    showPaymentCert() {
      this.$refs.paymentCert.init(this.order.paymentCert)
      this.paymentCertVisible = true
    },

    closePaymentCert() {
      this.paymentCertVisible = false
    },

    paymentCertConfirm(paymentCert = {}) {
      this.order.paymentCert = paymentCert
      // this.modelShow.paymentCert = '已上传'
      this.paymentCertVisible = false
    },

    // 保证金凭证
    showDepositCert(type) {
      this.$refs.depositCert.init(this.order.depositCert, type)
      this.depositCertVisible = true
    },

    // 选项
    showDepositAction() {
      this.showDepositCert('offline_bank')
      // this.depositSheetVisible = true
    },

    closeDepositCert() {
      this.depositCertVisible = false
    },

    depositCertConfirm(depositCert = {}) {
      this.order.depositCert = depositCert
      // this.modelShow.depositCert = '已上传'
      this.depositCertVisible = false
    },

    showVehiclePhoto(model) {
      this.activePhotos = model.photos
      this.photosVisible = true
    }
  },

  data() {
    return {
      photosVisible: false,
      activePhotos: { normal: {} },
      paymentCertVisible: false,
      depositCertVisible: false,
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
        paymentCert: null,
        depositCert: null,
        wayBillVehicle: {
          id: '1',
          model: '中规/国产 安凯客车 宝斯通',
          status: '1',
          frameNo: 'LSVHH1771123111101',
          price: 32.00,
          displacement: 2000,
          transportFee: 4500,
          insuranceFee: 1000,
          appearTrim: '白色/棕色',
          photos: {
            normal: {
              front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
              back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
              inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
              odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
              nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
            },
            exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
          }
        },
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
