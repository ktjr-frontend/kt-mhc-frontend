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
                small {{order.applicationDate | moment('YYYY-MM-DD')}}
            .header-row.flex
              .text-left.flex-item
                div 代购金额 <em>{{order.loanAmount | ktCurrency}}</em>
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
                      | 供应商：{{order.supllier}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 订单备注
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | {{order.note}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 订单资料
                //- mt-cell(:class="{'empty': !order.purchaseContract}", :value="order.purchaseContract ? '已上传' : '未上传'")
                  div(slot="title") 采购合同照片
                mt-cell(:is-link="!order.depositAddress", @click.native="showDepositAddress", :class="{'empty': !order.depositAddress}", :value="order.depositAddress ? '已添加' : '未添加'")
                  div(slot="title") 定金凭证
                mt-cell(:is-link="!order.cashDepositAddress", @click.native="showDepositAction", :class="{'empty': !order.cashDepositAddress}", :value="order.cashDepositAddress ? '已上传' : '未上传'")
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
                  span(slot="title") 基本信息
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
                    p.title-hint.ui-border-t.pt10
                      | 所运输车辆：1 辆
                    p.title-hint
                      | 车架号：{{order.wayBillVehicle.frameNo}}
                    p.title-hint
                      | 外观内饰：{{order.wayBillVehicle.appearTrim}}
            .fields.mt10
              mt-cell.title-cell
                span(slot="title") 在途信息
              mt-cell
                div(slot="title")
                  kt-time-line(:list="transitInfos")

        mt-tab-container-item#4
          .body.mt10
            section
              .fields
                mt-cell.title-cell
                  span(slot="title") 合同信息
                mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 合同金额：{{order.contractAmount | ktCurrency}}
                    p.title-hint
                      | 定金：{{order.deposit | ktCurrency}}
                    p.title-hint
                      | 保证金：{{order.cashDeposit | ktCurrency}}
            section.mt10
              .fields
                mt-cell.title-cell
                  span(slot="title") 供应商打款信息
                mt-cell.has-hint
                  div(slot="title")
                    .supllier-logo.flex
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
                  span(slot="title") 结算单列表
                kt-card-item(v-for='settlement in settlementList', :key='settlement.no', :arrow-visible="false")
                  span(slot="headerRight")
                    i.iconfont.icon-edit.ft14.smaller(@click="$router.push({name: 'settlementEdit', params: {id: settlement.id}})")
                  span(slot="headerLeft")
                    | 结算单号：{{settlement.no}}
                    .smaller.ml5 {{settlement.applicationDate | moment("YYYY-MM-DD")}}
                  //- span.color-primary(@click="goToDetail(settlement)", slot='arrow') {{settlement.status | settlementStatusFormat}}
                  .content(@click="goToDetail(settlement)")
                    .content-row 垫资金额：{{settlement.loanAmount | ktCurrency}}
                    .content-row 供应商：{{settlement.supplier}}
                    //- .content-row.flex
                      //- .content-left.flex-item 订单描述：{{settlement.brandName}} {{settlement.seriesName}} {{settlement.modelName}}
                      //- .content-right 共 {{settlement.vehicleNumber}} 辆
                    //- .content-row 订单简称：{{order.name}}
                  .buttons.flex.ui-border-t(slot='footer')
                    .text-left.flex-item
                      button.ui-border-radius(v-if="canCloseStatus(settlement.status)", @click="$router.push({name: 'settlementDoc', params: {id: settlement.no}})") 上传支付凭证
                //- mt-cell.has-hint
                  div(slot="title")
                    p.title-hint
                      | 采购金额：100万元
    mt-popup.popup-box(v-model='depositAddressVisible', position='right')
      deposit-address(ref="depositAddress", :close="closeDepositAddress", @popup-confirmed="depositAddressConfirm")
    mt-popup.popup-box(v-model='cashDepositAddressVisible', position='right')
      cash-deposit-address(ref="cashDepositAddress", :close="closeCashDepositAddress", @popup-confirmed="cashDepositAddressConfirm")
    mt-popup.popup-box(v-model="photosVisible", position="right")
      mt-header(ref="header", title="验车照片")
        //- mt-button(icon="back", slot="left", @click.prevent="photosVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="photosVisible = false")
      vehicle-photo(:photos="activePhotos", ref="vehiclePhoto", :close="() => {photosVisible = false}")
</template>

<script>
import OrderMixin from '@/views/order/mixin.js'
import DepositAddress from '@/views/order/DepositAddress.vue'
import CashDepositAddress from '@/views/order/CashDepositAddress.vue'
import VehiclePhoto from '@/views/mine/VehiclePhoto.vue'
import MineMixin from '@/views/mine/mixin.js'

export default {
  mixins: [OrderMixin, MineMixin],
  components: { DepositAddress, CashDepositAddress, VehiclePhoto },
  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.photosVisible) {
        this.$refs.vehiclePhoto.backButtonAction()
      } else if (this.depositAddressVisible) {
        this.depositAddressVisible = false
      } else if (this.cashDepositAddressVisible) {
        this.cashDepositAddressVisible = false
      } else {
        this.routerBack()
      }
    },
    // 支付凭证
    showDepositAddress() {
      this.$refs.depositAddress.init(this.order.depositAddress)
      this.depositAddressVisible = true
    },

    closeDepositAddress() {
      this.depositAddressVisible = false
    },

    depositAddressConfirm(depositAddress = {}) {
      this.order.depositAddress = depositAddress
      // this.modelShow.depositAddress = '已上传'
      this.depositAddressVisible = false
    },

    // 保证金凭证
    showCashDepositAddress(type) {
      this.$refs.cashDepositAddress.init(this.order.cashDepositAddress, type)
      this.cashDepositAddressVisible = true
    },

    // 选项
    showDepositAction() {
      this.showCashDepositAddress('offline_bank')
      // this.depositSheetVisible = true
    },

    closeCashDepositAddress() {
      this.cashDepositAddressVisible = false
    },

    cashDepositAddressConfirm(cashDepositAddress = {}) {
      this.order.cashDepositAddress = cashDepositAddress
      // this.modelShow.cashDepositAddress = '已上传'
      this.cashDepositAddressVisible = false
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
      depositAddressVisible: false,
      cashDepositAddressVisible: false,
      settlementList: [],
      transitInfos: [{
        id: 1,
        date: new Date(),
        address: '到达指定地点1'
      }, {
        id: 2,
        date: new Date(),
        address: '到达指定地点2'
      }],
      order: {
        no: 'G20171123118765',
        loanAmount: 160000,
        contractAmount: 10000,
        deposit: 10000,
        cashDeposit: 10000,
        status: '1',
        supllier: '宁波奥宝莱汽车有限公司',
        note: '测试订单',
        purchaseContract: {},
        depositAddress: null,
        cashDepositAddress: null,
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
        applicationDate: new Date()
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

.supllier-logo {
  float: left;
  height: 100px;
  width: 100px;
}

.header-row {
  padding: 5px 0;
}
</style>
