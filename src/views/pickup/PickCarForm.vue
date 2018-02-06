<template lang="pug">
  section.order-form
    form(@submit.prevent="submit")
      section
        //- .fields-header 带 <em>*</em> 为必填
        .fields
          mt-cell(is-link, :class="{'empty': !model.vehicle.count}", :state="getFieldState('model.vehicle.count')", @click.native="showVehicleList",  :value="model.vehicle.count ? ('已选择' + model.vehicle.count + '辆') : '请选择'")
            span(slot="title") 车辆信息 <em>*</em>
          input(type="hidden", v-model="model.vehicle.count")
          kt-date-picker.has-border.input-right(:custom-model-visible="false", label='empty', :readonly="true" placeholder='请选择', v-model='model.pickDate', :state="getFieldState('model.pickDate')", @click.native="showFieldError($event, 'model.pickDate')")
            div(slot="label")
              | 预计提车时间 <em>*</em>
          //- kt-select.has-border(:options="pickCompanies", v-model="model.pickCompany", :state="getFieldState('model.pickCompany')", @click.native="showFieldError($event, 'model.pickCompany')")
            span(slot="label") 选择提车公司 <em>*</em>
          //- .note-row
            .inner
              h3 提车公司说明
              p 请填写本次提车的下游买家公司名称；如果是自提，请填写您所在公司名称
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 提车人信息
          kt-field(type="text", label='empty', placeholder='请输入姓名', v-model='model.pickerName', :state="getFieldState('model.pickerName')", @click.native="showFieldError($event, 'model.pickerName')")
            div(slot="label")
              | 提车人姓名 <em>*</em>
            mt-button(@click.prevent.stop="pickerListVisible = true") 选择提车人
          kt-field(type="text", label='empty', placeholder='请输入身份证号', v-model='model.pickerIdCard', :state="getFieldState('model.pickerIdCard')", @click.native="showFieldError($event, 'model.pickerIdCard')")
            div(slot="label")
              | 身份证号码 <em>*</em>
          kt-field(type="number", label='empty', placeholder='请输入手机号', v-model='model.pickerPhone', :state="getFieldState('model.pickerPhone')", @click.native="showFieldError($event, 'model.pickerPhone')")
            div(slot="label")
              | 手机号号码 <em>*</em>
          .form-buttons.text-center.pt20
            a.underline(@click.prevent="showPickTemplate") 获取提车函模板
      //- .footer-tips
        h4 温馨提示：
        ol
          li 仓管费用需要在仓库进行结算，提车前需要结算清仓管费用。
          li 若签章人暂时无法签章，可选择打印纸质委托函，盖章后拍照上传。
    .fixed-footer-placeholder
    footer.fixed-footer
      //- .tab-item.flex1(@click="showPickTemplate")
        p 下载提车函模板
      .tab-item.flex2.tab-btn
        button(@click="submit") 提交
    mt-popup.popup-box.popup-box-top(v-model='pickTemplateVisible', position='top')
      mt-header(ref="header", title="获取提车函模板")
        //- mt-button(icon="back", slot="left", @click.prevent="pickTemplateVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="pickTemplateVisible = false")
      .picker-body
        .picker-row.flex
          input.flex-item.mr5(placeholder="请输入邮箱账号", v-model="receiveEmail")
          mt-button(type="primary", size="small", @click.prevent="sendToEmail") 发送至邮箱
    mt-popup.popup-box(v-model='vehicleListVisible', position='right')
      vehicle-list(ref="vehicleList", :mt-header-visible="true", from="pickup", :close="closeVehicleList", @popup-confirmed="vehicleConfirm")
    mt-popup.picker-box(v-model="pickerListVisible", position="bottom")
      .picker-header.ui-border-b
        mt-button.fr.cancel.no-border(@click.prevent="pickerListVisible = false") 关闭
      .picker-list
        mt-cell.has-hint(v-for="p in pickerList", @click.prevent.native="onSelectPicker(p)")
          div(slot="title") {{p.name}}
            p.title-hint
              small {{p.idCard}}
              small  | {{p.phone}}
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import VehicleList from '@/views/pickup/VehicleList.vue'
// import { chain } from 'lodash'

export default {
  components: { VehicleList },
  mixins: [ValidatorMixin],
  validators: {
    'model.vehicle.count' (value) {
      return this.validate(value).required('请选择车辆')
    },
    'model.pickDate' (value) {
      return this.validate(value).required('请选择提车时间')
    },
    // 'model.pickCompany' (value) {
    //   return this.validate(value).required('请选择提车公司')
    // },
    'model.pickerName' (value) {
      return this.validate(value).required('请填写提车人姓名')
    },
    'model.pickerPhone' (value) {
      return this.validate(value).required('请填写手机号')
    },
    'model.pickerIdCard' (value) {
      return this.validate(value).required('请填写身份证号')
    }
  },

  mounted() {
    this.model.vehicle = this.$route.params.vehicle || { count: null }
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.vehicleListVisible) {
        this.vehicleListVisible = false
      } else if (this.pickTemplateVisible) {
        this.pickTemplateVisible = false
      } else {
        this.routerBack()
      }
    },

    // 提车函模板
    showPickTemplate() {
      this.pickTemplateVisible = true
    },

    // 发送提车函模板到邮箱
    sendToEmail() {
      if (!this.receiveEmail.match(/[0-9a-zA-Z_]+@\w+/)) {
        this.$toast('邮箱格式不正确', 'error')
        return
      }
      this.pickTemplateVisible = false
      this.$toast('已发送，请注意查收', 'success')
    },

    // 选择提车人
    onSelectPicker(picker) {
      this.model.pickerName = picker.name
      this.model.pickerPhone = picker.phone
      this.model.pickerIdCard = picker.idCard
      this.pickerListVisible = false
    },

    // 车辆信息
    showVehicleList() {
      this.$refs.vehicleList.init()
      this.vehicleListVisible = true
    },

    closeVehicleList() {
      this.vehicleListVisible = false
    },

    vehicleConfirm({ vehicles, checkedCar }) {
      this.model.vehicle = {
        count: checkedCar.length,
        vehicles: vehicles
      }
      this.vehicleListVisible = false
    },

    async submit() {
      const success = await this.$validate()

      if (success) {
        this.$router.back()
        // this.$router.push({
        //   name: 'orders'
        // })
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
      receiveEmail: '',
      vehicleListVisible: false,
      pickerListVisible: false,
      pickTemplateVisible: false,
      pickCompanies: [{
        label: '北京测试公司一',
        value: '1'
      }, {
        label: '北京测试公司二',
        value: '2'
      }, {
        label: '北京测试公司三',
        value: '3'
      }],
      pickerList: [{
        name: '张三',
        idCard: '110221198808912781',
        phone: '13319879999'
      }, {
        name: '李四',
        idCard: '120221198808912781',
        phone: '13319879997'
      }, {
        name: '王二',
        idCard: '130221198808912781',
        phone: '13319879969'
      }, {
        name: '赵四',
        idCard: '140221198808912781',
        phone: '13319879998'
      }, {
        name: '李武',
        idCard: '150221198808912781',
        phone: '13319879990'
      }],
      model: {
        provider: '',
        vehicle: { count: null },
        pickDate: '',
        // pickCompany: '',
        pickerName: '',
        pickerPhone: '',
        pickerIdCard: ''
      }
    }
  }
}
</script>


<style lang="scss" module>
.has-header {
  margin-top: $header-height;
}
</style>

<style lang="scss" scoped>
.picker-list {
  min-height: 30vh;
  max-height: 40vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.note-row {
  padding: 5px 10px 10px 15px;
  background: white;
  color: $gray-color;
  text-align: center;
  .inner {
    background: $minor-bg-color;
    padding: 10px 15px 15px;
  }
  p {
    text-align: left;
  }
  h3 {
    font-weight: normal;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
    font-size: $font-size-s;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 2.2em;
      background-color: currentColor;
      top: 50%;
      transform: translateY(-50%);
    }
    &:before {
      left: -2.6em;
    }
    &:after {
      right: -2.6em;
    }
  }
}
</style>
