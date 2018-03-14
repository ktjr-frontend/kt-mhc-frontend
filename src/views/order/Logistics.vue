<template lang="pug">
section.logistics-form
  mt-header(ref="header", title="物流信息")
    //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
    div(slot="left")
      i.p10.iconfont.icon-guanbi(@click.prevent="close")
  form.overflow-scroll(ref="popBoxContainer", @submit.prevent="submit")
    section
      .fields
        kt-select(:options="deliverTypeList", v-model="model.deliverType", :state="getFieldState('model.deliverType')", @click.native="showFieldError($event, 'model.deliverType')")
          span(slot="label") 产品类型 <em>*</em>
    section.mt10
      .fields
        kt-address-select(:state="getFieldState('model.startingCity')", v-model="model.startingCity")
          span(slot="label") 起始地 <em>*</em>
        kt-field(type="textarea", label="详细地址", v-model="model.startingAddress", :state="getFieldState('model.startingAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.startingAddress')")
          div(slot="label")
            | 详细地址 <em>*</em>
    section.mt10
      .fields
        //- kt-select(:options="deliverTypeList", v-model="model.deliverType", :state="getFieldState('model.deliverType')", @click.native="showFieldError($event, 'model.deliverType')")
          span(slot="label") 物流类型 <em>*</em>
        kt-address-select(:state="getFieldState('model.destinationCity')", v-model="model.destinationCity")
          span(slot="label") 目的地 <em>*</em>
        //- mt-cell(title="empty")
      template(v-if="model.deliverType === '1'")
        mt-radio.cell-radiolist(slot="title", :state="getFieldState('model.destinationAddress')", v-model='model.destinationAddress', :options="endWareHouseList")
        .text-center.color-warning.bg-white.pt10.pb10(v-if="!endWareHouseList.length && model.destinationCity") 该地区没有仓库地址，建议选择其他地区
        input(type="hidden", v-model="model.destinationAddress")
      template(v-else-if="model.deliverType === '2'")
        kt-field(type="textarea", label="详细地址", v-model="model.destinationAddress", :state="getFieldState('model.destinationAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.destinationAddress')")
          div(slot="label")
            | 收货地址 <em>*</em>
        kt-field(type="text", label='empty', placeholder='请输入收货联系人', v-model='model.consignee', :state="getFieldState('model.consignee')", @click.native="showFieldError($event, 'model.consignee')")
          div(slot="label")
            | 收货联系人 <em>*</em>
        kt-field(type="number", label='empty', placeholder='收货人联系方式', v-model='model.consigneePhoneNumber', :state="getFieldState('model.consigneePhoneNumber')", @click.native="showFieldError($event, 'model.consigneePhoneNumber')")
          div(slot="label")
            | 联系方式 <em>*</em>
        kt-field(type="text", label='empty', placeholder='收货人身份证号', v-model='model.consigneeIdNo', :state="getFieldState('model.consigneeIdNo')", @click.native="showFieldError($event, 'model.consigneeIdNo')")
          div(slot="label")
            | 身份证号 <em>*</em>
    //- section.mt10
      .fields
        kt-select(:options="transportTypeList", v-model="model.tranportType", :state="getFieldState('model.tranportType')", @click.native="showFieldError($event, 'model.tranportType')")
          span(slot="label") 运输类型 <em>*</em>
    section.mt10
      .fields
        kt-date-picker.input-right(label='empty', :custom-model-visible="true", :readonly="true" placeholder='请选择', v-model='model.transportationDate', :state="getFieldState('model.transportationDate')", @click.native="showFieldError($event, 'model.transportationDate')")
          div(slot="label")
            | 发运时间 <em>*</em>
        kt-field(type="text", label='empty', placeholder='请输入发货联系人', v-model='model.consigner', :state="getFieldState('model.consigner')", @click.native="showFieldError($event, 'model.consigner')")
          div(slot="label")
            | 发货联系人 <em>*</em>
        kt-field(type="number", label='empty', placeholder='发货人联系方式', v-model='model.consignerPhoneNumber', :state="getFieldState('model.consignerPhoneNumber')", @click.native="showFieldError($event, 'model.consignerPhoneNumber')")
          div(slot="label")
            | 联系方式 <em>*</em>
        //- kt-field(type="text", label='empty', :readonly="true", placeholder='同起始地', v-model='model.startingCity')
        //-   div(slot="label")
        //-     | 发货地址 <em>*</em>
        //- kt-field(type="textarea", label=" ", v-model="model.startingAddress", :state="getFieldState('model.startingAddress')", placeholder="详细地址（街道，门牌号等）", @click.native="showFieldError($event, 'model.startingAddress')")
        kt-field(type="text", label="empty", :readonly="true", placeholder='自动计算', :value='totalCost')
          div(slot="label")
            | 预估运输费用
            p.title-hint 以实际发生为准
          span(slot="input1-append") 元
        kt-field(type="text", label="empty", placeholder='请输入备注', v-model='model.note')
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
import { map } from 'lodash'
import { warehouses } from '@/common/resources.js'

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
    },

    getWarehouses() {
      if (this.model.destinationCity && this.model.deliverType === '1') {
        const addrs = this.model.destinationCity.split('-')
        warehouses
          .get({
            province: addrs[0],
            city: addrs[1],
            county: addrs[2]
          })
          .then(res => res.json())
          .then(res => {
            this.endWareHouseList = map(res.data.data, d => ({ label: d.warehouseName, value: d.warehouseName }))
          })
      }
    }
  },

  validators: {
    'model.startingCity' (value) {
      return this.validate(value).required('请选择起始地址')
    },
    'model.startingAddress' (value) {
      return this.validate(value).required('请填写详细发货地址')
    },
    'model.destinationCity' (value) {
      return this.validate(value).required('请选择目的地址')
    },
    'model.destinationAddress' (value) {
      return this.validate(value).custom(() => {
        if (!value) {
          return this.model.deliverType === '1' ? '请选择目的地仓库' : '请填写详细收货地址'
        }
      })
    },
    // 'model.destinationAddress' (value) {
    //   return this.validate(value).custom(() => {
    //     if (this.model.deliverType === '1' && !value) {
    //       return '请选择目的地仓库'
    //     }
    //   })
    // },
    'model.consignee' (value) {
      return this.validate(value).custom(() => {
        if (this.model.deliverType === '2' && !value) {
          return '请填写收货人'
        }
      })
    },
    'model.consigneePhoneNumber' (value) {
      return this.validate(value).custom(() => {
        if (this.model.deliverType === '2' && !value) {
          return '请填写收货人联系方式'
        }
      })
    },
    'model.consigneeIdNo' (value) {
      return this.validate(value).custom(() => {
        if (this.model.deliverType === '2' && !value) {
          return '请填写收货人身份证号'
        }
      })
    },
    'model.transportationDate' (value) {
      return this.validate(value).required('请选择发货时间')
    },
    'model.deliverType' (value) {
      return this.validate(value).required('请选择发货类型')
    },
    // 'model.tranportType' (value) {
    //   return this.validate(value).required('请选择运输类型')
    // },
    'model.consigner' (value) {
      return this.validate(value).required('请填写发货人')
    },
    'model.consignerPhoneNumber' (value) {
      return this.validate(value).required('请填写发货人联系方式')
    },
    'agreement' (value) {
      return this.validate(value).custom(() => {
        if (!this.agreement) {
          return '请阅读并同意《物流信息服务协议》'
        }
      })
    }
  },

  watch: {
    'model.deliverType' (value) {
      this.getWarehouses()
    },
    'model.destinationCity' () {
      this.getWarehouses()
    }
  },

  computed: {
    totalCost() {
      if (this.model.startingCity && this.model.destinationCity && this.model.destinationAddress) {
        return 2123
      }
    }

    // endWareHouseList() {
    //   console.log(this.model.destinationCity)
    //   let area = ''
    //   let addrs = []

    //   if (this.model.destinationCity) addrs = this.model.destinationCity.split('-')
    //   if (addrs.length) area = addrs[2]

    //   this.model.destinationAddress = ''

    //   return filter([{
    //     area: '海淀区',
    //     label: '测试仓库1号',
    //     value: '1'
    //   }, {
    //     area: '海淀区',
    //     label: '测试仓库2号',
    //     value: '2'
    //   }], v => v.area === area)
    // }
  },

  data() {
    return {
      endWareHouseList: [],
      agreement: false,
      // tranportTypeList: ,
      model: {
        startingCity: null,
        destinationCity: null,
        destinationAddress: '',
        deliverType: '',
        // tranportType: '',
        transportationDate: '',
        consigner: '',
        consignerPhoneNumber: '',
        consignee: '',
        consigneePhoneNumber: '',
        consigneeIdNo: '',
        totalCost: null,
        startingAddress: '',
        // destinationAddress: '',
        note: ''
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
