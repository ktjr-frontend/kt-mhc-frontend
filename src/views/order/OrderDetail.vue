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
                em {{order.orderStatus | orderStatusFormat}}
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
                mt-cell(:is-link="!order.depositAddress.length", @click.native="showDepositAddress", :class="{'empty': !order.depositAddress.length}", :value="order.depositAddress.length ? '已添加' : '未添加'")
                  div(slot="title") 定金凭证
                mt-cell(:is-link="!order.cashDepositAddress.length", @click.native="showDepositAction", :class="{'empty': !order.cashDepositAddress.length}", :value="order.cashDepositAddress.length ? '已上传' : '未上传'")
                  div(slot="title") 保证金凭证
                //- mt-cell(:class="{'empty': !order.handingLetter}", :value="order.handingLetter ? '已上传' : '未上传'")
                  div(slot="title") 手续承诺函照片

        mt-tab-container-item#2
          //- .no-data
            i.iconfont.icon-car
            p 暂无数据
          kt-card-item.stress(v-for="item in order.vehicles")
            span(slot="headerLeft") {{item.brandName}} {{item.seriesName}} {{item.modelName}}
            span.color-primary(slot='headerRight') {{order.orderStatus | orderStatusFormat}}
            //- span.color-primary(slot='arrow') {{order.wayBillVehicle.status | wayBillVehicleStatusFormat}}
            .content
              .content-row 车架号：{{item.vin}}
              .content-row 外观内饰：{{item.bodyColor}} / {{item.interiorColor}}
              .content-row 发动机排量（ML）：{{item.displacement}}
              .content-row 生产日期：{{item.productionDate | moment('YYYY-MM-DD')}}
              .content-row 指导价：{{item.marketPrice}}元
              //- .content-row.ui-border-t.mt10.pt10
              //-   small
              //-     span 发车日期：2018年12月03日
              //- .content-row
              //-   small
              //-     span 出库日期：2018年11月03日
              //- .content-row
              //-   small
              //-     span 仓库：北京-昌平区-测试车库1
            //- .buttons.text-right.ui-border-t(slot='footer')
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
                      | 车架号：
                    p.title-hint
                      | 外观内饰：
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
                      | 打款金额：
                    p.title-hint
                      | 打款日期：
                    p.title-hint
                      | 账号：
                    p.title-hint
                      | 开户行：
                    p.title-hint
                      | 户名：
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
import CashDepositAddress from '@/views/order/CashDepositList.vue'
import VehiclePhoto from '@/views/mine/VehiclePhoto.vue'
import MineMixin from '@/views/mine/mixin.js'
import { orders, logisticsQuery } from '@/common/resources.js'
import { filter } from 'lodash'

export default {
  mixins: [OrderMixin, MineMixin],
  components: { DepositAddress, CashDepositAddress, VehiclePhoto },
  mounted() {
    orders
      .get({ id: this.$route.params.id })
      .then(res => res.json())
      .then(res => {
        const data = res.data.data
        if (data.payments.length) {
          data.depositAddress = filter(data.payments, v => v.type === 1)
          data.cashDepositAddress = filter(data.payments, v => v.type === 2)
        }
        this.order = res.data.data
      })
  },

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

    // 顶部关闭按钮
    headerClose() {
      this.$router.push({
        name: 'orders'
      })
    },

    // 支付凭证
    showDepositAddress() {
      this.$refs.depositAddress.init(this.order.depositAddress)
      this.depositAddressVisible = true
    },

    closeDepositAddress() {
      this.depositAddressVisible = false
    },

    async depositAddressConfirm(depositAddress = {}) {
      this.order.depositAddress = depositAddress
      // this.modelShow.depositAddress = '已上传'
      this.depositAddressVisible = false
      await orders.update({
        id: this.$route.params.id,
        payments: [this.order.depositAddress]
      })
    },

    // 保证金凭证
    showCashDepositAddress(type) {
      this.$refs.cashDepositAddress.init(this.order.cashDepositAddress, type)
      this.cashDepositAddressVisible = true
    },

    // 选项
    showDepositAction() {
      this.showCashDepositAddress('offline_bank')
    },

    closeCashDepositAddress() {
      this.cashDepositAddressVisible = false
    },

    async cashDepositAddressConfirm(cashDepositAddress = {}) {
      this.order.cashDepositAddress = cashDepositAddress
      this.cashDepositAddressVisible = false
      await orders.update({
        id: this.$route.params.id,
        payments: [this.order.cashDepositAddress]
      })
    },

    showVehiclePhoto(model) {
      this.activePhotos = model.photos
      this.photosVisible = true
    },

    async getLogisticsInfo() {
      const res = await logisticsQuery.get({
        orderId: this.$route.params.id
      }).then(res => res.json())
      const data = res.data.data
      this.logisticsInfo = data
    },

    async getFinanceInfo() {

    }
  },

  watch: {
    tabActive(value) {
      if (value === '3') {
        this.getLogisticsInfo()
      }
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
      order: {},
      logisticsInfo: {},
      financinginfo: {},
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
