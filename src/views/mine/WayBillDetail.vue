<template lang="pug">
  section.way-bill-detail
    section
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 运单编号：{{wayBill.number}}
    section.kt-cell
      .kt-cell-row
        .kt-cell-th 始发地
        .kt-cell-td {{wayBill.startAddress}}
      .kt-cell-row
        .kt-cell-th 目的地
        .kt-cell-td {{wayBill.endAddress}}
      .kt-cell-row
        .kt-cell-th 运输类型
        .kt-cell-td {{wayBill.transportType | transportTypeFormat}}
      .kt-cell-row
        .kt-cell-th 下单时间
        .kt-cell-td {{wayBill.orderDate | moment('YYYY-MM-DD HH:mm:ss')}}
    section.mt10
      mt-cell.title-simple-cell
        span(slot="title") 订单宝号：{{wayBill.orderNumber}}
        small 已绑定
    section.mt10
      mt-cell.title-simple-cell(is-link, :to="{name: 'wayBillVehicle', params: {id: wayBill.vehicleId}}")
        span(slot="title") 车辆信息
    section
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 费用信息
    section.kt-cell
      .kt-cell-row
        .kt-cell-th 运价
        .kt-cell-td {{wayBill.transportFee | ktCurrency}}
      .kt-cell-row
        .kt-cell-th 保险费含运输险
        .kt-cell-td {{wayBill.insuranceFee | ktCurrency}}
      .kt-cell-row
        .kt-cell-th 税费
        .kt-cell-td {{wayBill.taxFee | ktCurrency}}
      .kt-cell-row.ui-border-t
        .kt-cell-th 总价
        .kt-cell-td {{totalFee | ktCurrency}}

</template>

<script>
import MineMixin from '@/views/mine/mixin.js'

export default {
  mixins: [MineMixin],
  computed: {
    totalFee() {
      return this.wayBill.transportFee + this.wayBill.insuranceFee + this.wayBill.taxFee
    }
  },

  data() {
    return {
      wayBill: {
        number: 'YD201801301111001',
        startAddress: '北京市朝阳区三元桥',
        endAddress: '吉林省长春市宽城区',
        transportType: '1',
        orderDate: new Date(),
        orderNumber: 'GD201801010007',
        transportFee: 8000,
        insuranceFee: 1000,
        taxFee: 1000,
        vehicleId: '1',
        carryCompany: '开好车物流测试公司1号',
        carryContact: '王二',
        carryPhone: 18812311231,
        beginDate: new Date(),
        beginContact: '张三',
        beginPhone: 18812311111,
        beginAddress: '北京市朝阳区三元桥开好车车库1号',
        desc: '备注信息测试'
      }
    }
  }
}
</script>

<style lang="scss">
.kt-cell {
  background: white;
  padding: 10px 15px;
}

.kt-cell-row {
  display: flex;
  padding: 5px 0;
}

.kt-cell-th {
  width: 5em;
  color: $placeholder-color;
}

.kt-cell-td {
  padding-left: 1em;
}
</style>
