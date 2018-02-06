<template lang="pug">
section.logistics-form
  mt-header(ref="header", title="物流信息")
    //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
    div(slot="left")
      i.p10.iconfont.icon-guanbi(@click.prevent="close")
  form.overflow-scroll(ref="popBoxContainer", @submit.prevent="submit")
    section
      .fields
        kt-address-select(:state="getFieldState('model.startAddress')", v-model="model.startAddress")
          span(slot="label") 起始地 <em>*</em>
        kt-field(type="textarea", label=" ", v-model="model.detailAddress", :state="getFieldState('model.detailAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.detailAddress')")
          //- div(slot="label")
            | 详细地址
    section.mt10
      .fields
        kt-address-select(:state="getFieldState('model.endAddress')", v-model="model.endAddress")
          span(slot="label") 目的地 <em>*</em>
        //- mt-cell(title="empty")
      .fields
        mt-radio.cell-radiolist(slot="title", :state="getFieldState('model.endWareHouse')", v-model='model.endWareHouse', :options="endWareHouseList")
        .text-center.color-warning.bg-white.pt10.pb10(v-if="!endWareHouseList.length && model.endAddress") 该地区没有仓库地址，建议选择海淀区
        input(type="hidden", v-model="model.endWareHouse")
    section.mt10
      .fields
        kt-select(:options="transportTypeList", v-model="model.tranportType", :state="getFieldState('model.tranportType')", @click.native="showFieldError($event, 'model.tranportType')")
          span(slot="label") 运输类型 <em>*</em>
    section.mt10
      .fields
        kt-date-picker.input-right(label='empty', :custom-model-visible="true", :readonly="true" placeholder='请选择', v-model='model.deliverDate', :state="getFieldState('model.deliverDate')", @click.native="showFieldError($event, 'model.deliverDate')")
          div(slot="label")
            | 发运时间 <em>*</em>
        kt-field(type="text", label='empty', placeholder='请输入发货联系人', v-model='model.deliverContact', :state="getFieldState('model.deliverContact')", @click.native="showFieldError($event, 'model.deliverContact')")
          div(slot="label")
            | 发货联系人 <em>*</em>
        kt-field(type="number", label='empty', placeholder='发货人联系方式', v-model='model.deliverPhone', :state="getFieldState('model.deliverPhone')", @click.native="showFieldError($event, 'model.deliverPhone')")
          div(slot="label")
            | 联系方式 <em>*</em>
        //- kt-field(type="text", label='empty', :readonly="true", placeholder='同起始地', v-model='model.startAddress')
        //-   div(slot="label")
        //-     | 发货地址 <em>*</em>
        //- kt-field(type="textarea", label=" ", v-model="model.detailAddress", :state="getFieldState('model.detailAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.detailAddress')")
        kt-field(type="text", label="empty", :readonly="true", placeholder='自动计算', v-model='transportFee')
          div(slot="label")
            | 运输费用
          span(slot="input1-append") 元
        kt-field(type="text", label="empty", placeholder='请输入备注', v-model='model.comment')
          div(slot="label")
            | 备注
        .note-line
          kt-checkbox(v-model="agreement", :value="false", :state="getFieldState('agreement')")
            span.pl10 我已阅读并同意
            a
              |《物流信息服务协议》

  .form-buttons-placeholder
  .form-buttons.fixed
    mt-button.mint-button-block(type='primary', size='large', @click="submit") 提交
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import MineMixin from '@/views/mine/mixin.js'
import { filter } from 'lodash'

export default {
  mixins: [ValidatorMixin, MineMixin],
  props: {
    close: Function
  },

  methods: {
    init() {

    },
    async submit() {
      const success = await this.$validate()
      if (success) {
        this.$emit('popup-confirmed', this.model)
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.startAddress' (value) {
      return this.validate(value).required('请选择起始地址')
    },
    'model.detailAddress' (value) {
      return this.validate(value).required('请填写详细地址')
    },
    'model.endAddress' (value) {
      return this.validate(value).required('请选择目的地址')
    },
    'model.endWareHouse' (value) {
      return this.validate(value).required('请选择目的地仓库')
    },
    'model.deliverDate' (value) {
      return this.validate(value).required('请选择发货时间')
    },
    'model.tranportType' (value) {
      return this.validate(value).required('请选择运输类型')
    },
    'model.deliverContact' (value) {
      return this.validate(value).required('请填写发货人')
    },
    'model.deliverPhone' (value) {
      return this.validate(value).required('请填写联系方式')
    },
    'agreement' (value) {
      return this.validate(value).custom(() => {
        if (!this.agreement) {
          return '请阅读并同意《物流信息服务协议》'
        }
      })
    }
  },

  computed: {
    transportFee() {
      if (this.model.startAddress && this.model.endAddress && this.model.endWareHouse) {
        return 2123
      }
    },

    endWareHouseList() {
      console.log(this.model.endAddress)
      let area = ''
      let addrs = []

      if (this.model.endAddress) addrs = this.model.endAddress.split('-')
      if (addrs.length) area = addrs[2]

      this.model.endWareHouse = ''

      return filter([{
        area: '海淀区',
        label: '测试仓库1号',
        value: '1'
      }, {
        area: '海淀区',
        label: '测试仓库2号',
        value: '2'
      }], v => v.area === area)
    }
  },

  data() {
    return {
      agreement: false,
      // tranportTypeList: ,
      model: {
        startAddress: null,
        endAddress: null,
        endWareHouse: '',
        tranportType: '',
        deliverDate: '',
        deliverContact: '',
        deliverPhone: '',
        transportFee: null,
        detailAddress: '',
        comment: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.note-line {
  padding: 15px 10px;
}

.popup-picker {
  height: 30vh;
  left: 0;
  right: 0;
}
</style>
