<template lang="pug">
section.vehicle-list
  mt-header(ref="header", title="选择车辆")
    //- mt-button(icon="back", slot="left", @click.prevent="backButtonAction") 返回
    div(slot="left")
      i.p10.iconfont.icon-guanbi(@click.prevent="backButtonAction")
  //- header.flex.search-header(v-show="activeStep === '1-1' || activeStep === '2-1'")
    //- div.flex-item
    mt-button.mint-button-block(type='primary', size='large', @click="showVehicleSearch('2-1')")
      i.iconfont.icon-sousuo.mr5
      | 快速选择车型（输入指导价）
  section.body.overflow-scroll(ref="popBoxContainer")
    //- .step-block(v-show="activeStep === '1-1' || activeStep === '2-1'")
      ul.standard-list
        mt-cell.click-active(v-for="s in standardList", :key="s.id", @click.native="showBrandList(s)", is-link, :title="s.name")
    .step-block(v-show="activeStep === '1-2'")
      mt-index-list
        mt-index-section(v-for="(item, key) in brandList", :key="key", :index="key")
          mt-cell(v-for="v in item", :title='v.brandName', @click.native="showVehicleSearch('1-2', v)")
            img(slot='icon', :src='v.brandLogo', width='24', height='24')
    .step-block(v-show="activeStep === '2-2' || activeStep === '1-3'")
      vehicle-search(ref="vehicleSearch", :close="closeVehicleSearch", @select-vehicle="onSelectVehicle")
    .step-block.pt10(v-show="activeStep === '2-3' || activeStep === '1-4'")
      mt-cell.click-active.ui-border-b
        .custom-title.flex.flex-start(slot="title")
          img.mr10(:src="selectedVehicle.brandLogo", slot="icon", width="18")
          .custom-content
            p {{selectedVehicle.brandName}} {{selectedVehicle.seriesName}} {{selectedVehicle.modelName}}
            small.note 指导价：{{ selectedVehicle.manufacturerGuidancePrice }} 万
      form(@submit.prevent="submit")
        section
          .fields
            mt-cell(is-link, :class="{'empty': !model.appearTrim}", :state="getFieldState('model.appearTrim')", @click.native="showAppearTrimOptions", :value="model.appearTrim || '请选择'")
              span(slot="title") 外观内饰 <em>*</em>
              div
                span.va-m {{model.appearTrim || '请选择'}}
                //- span.mint-field-state.is-error(v-if="getFieldState('model.appearTrim') === 'error'")
                  i.mintui.mintui-field-error
            input(type="hidden", v-model="model.appearTrim")
            kt-field.has-hint.input-right(type="number", label='数量', placeholder='请输入', v-model='model.vehicleNumber', :state="getFieldState('model.vehicleNumber')", @click.native="showFieldError($event, 'model.vehicleNumber')")
              div(slot="label") 数量 <em>*</em>
              span(slot="input1-append") 辆
            kt-field.has-hint.input-right(type="number", label='单辆车合同单价', placeholder='请输入金额', v-model='model.price', :state="getFieldState('model.price')", @click.native="showFieldError($event, 'model.price')")
              div(slot="label") 单辆车合同单价 <em>*</em>
                p.title-hint 给车型批次总价格
              span(slot="input1-append") 万元
          .fields.mt10
            kt-field.has-hint.input-right(type="text", v-for="n in +model.vehicleNumber", label='车架号', placeholder='请输入车架号', :value="getFrameNo(n)", @input="updateFrameNo($event, n)", :state="getFieldState('model.vins')", @click.native="showFieldError($event, 'model.vins')")
              div(slot="label") 车架号{{n}} <em>*</em>
            input(type="hidden", v-model="model.vins")
    //- .step-block(v-show="activeStep === '2-4' || activeStep === '1-5'")
  .custom-model(v-if="appearTrimOptionsVisible", @click="appearTrimOptionsVisible = false")
  mt-popup(v-model="appearTrimOptionsVisible", position="bottom", :showToolbar="true")
    .picker-header.ui-border-b
      mt-button.fl.cancel.no-border(@click="appearTrimOptionsVisible = false") 取消
      mt-button.fr.confirm.no-border(@click="confirmAppearTrim") 确定
    mt-picker.apprear-trim-picker(:slots='appearTrimList', @change='onApprearTrimChange')
  .form-buttons-placeholder
  .form-buttons.fixed
    mt-button.mint-button-block(type='primary', size='large', @click="submit") 提交
</template>

<script>
import VehicleSearch from '@/views/order/VehicleSearch.vue'
import ValidatorMixin from '@/views/validator_mixin.js'
import { some } from 'lodash'
import { vehicleBrands, vehicleColors } from '@/common/resources.js'

export default {
  mixins: [ValidatorMixin],
  components: {
    VehicleSearch
  },

  props: {
    close: Function
  },

  created() {
    vehicleBrands.get()
      .then(res => res.json())
      .then(res => {
        this.brandList = res.data.data
      })
  },

  methods: {
    // 自定义后退按钮行为
    backButtonAction() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      if (+minorStep > 2) {
        this.activeStep = [mainStep, minorStep - 1].join('-')
      } else if (+minorStep === 2) {
        this.close()
      }
    },

    getFrameNo(index) {
      return this.model.vins[index - 1] || ''
    },

    updateFrameNo(value, index) {
      console.log(index, value)
      this.model.vins[index - 1] = value
    },

    // 重置步骤
    reset() {
      this.activeStep = '1-2'
    },

    // 下一步
    nextStep() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      this.activeStep = [mainStep, +minorStep + 1].join('-')
    },

    // 显示车辆搜索栏
    showVehicleSearch(preStep, brand) {
      if (preStep === '1-2') {
        this.$refs.vehicleSearch.init(brand)
        this.activeStep = '1-3'
      }
      // else if (preStep === '2-1') {
      //   this.$refs.vehicleSearch.init()
      //   this.activeStep = '2-2'
      // }
    },

    // 显示车辆类型一级目录
    showBrandList() {
      this.activeStep = '1-2'
    },

    // 选择具体车型以后
    onSelectVehicle(vehicle) {
      this.nextStep()
      this.validation.reset()
      this.selectedVehicle = vehicle
      this.getAppearTrim(vehicle)
    },

    async getAppearTrim(vehicle) {
      const res = await vehicleColors.get({
        brandName: vehicle.brandName,
        seriesName: vehicle.seriesName,
        modelName: vehicle.modelName
      }).then(res => res.json())
      const data = res.data.data

      this.appearTrimList = [{
        flex: 1,
        values: data.bodyColorList,
        className: 'apprear',
        textAlign: 'right'
      }, {
        divider: true,
        content: '-',
        className: 'divider'
      }, {
        flex: 1,
        values: data.interiorColorList,
        className: 'trim',
        textAlign: 'left'
      }]
    },

    // 关闭车辆搜索栏
    closeVehicleSearch() {
      this.backButtonAction()
    },

    // 显示外观颜色选择框
    showAppearTrimOptions() {
      this.appearTrimOptionsVisible = true
      // this.$nextTick(() => {
      //   this.$refs.appearTrimPick
      // })
    },

    // 外观颜色选择
    onApprearTrimChange(picker, values) {
      this.selectedAppearTrim = values.join('-')
    },

    // 确定选择
    confirmAppearTrim(value) {
      this.model.appearTrim = this.selectedAppearTrim
      this.appearTrimOptionsVisible = false
    },

    // 填写具体购买车型信息提交
    async submit() {
      const success = await this.$validate()
      if (success) {
        this.$emit('popup-confirmed', this.model)
      } else {
        console.log(this.validation)
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.appearTrim ' (value) {
      return this.validate(value).required('请选择外观内饰')
    },
    'model.price' (value) {
      return this.validate(value).required('请输入单车金额')
    },
    'model.vehicleNumber' (value) {
      return this.validate(value).required('请输入购买数量')
    },
    'model.vins' (value) {
      console.log(value)
      return this.validate(value).custom(() => {
        if (value.length < this.model.vehicleNumber || some(value, v => !v)) {
          return '请填写所有车架号'
        }
      })
    }
  },

  watch: {
    'model.appearTrim' () {
      const arr = this.model.appearTrim.split('-')
      if (arr.length > 1) {
        this.model.bodyColor = arr[0]
        this.model.interiorColor = arr[0]
      }
    }
  },

  data() {
    return {
      selectedAppearTrim: '黑色-黑色',
      activeStep: '1-2', // {主步骤}-{子步骤}
      selectedVehicle: {},
      appearTrimOptionsVisible: false,
      appearTrimList: [{
        flex: 1,
        values: ['黑色', '北极白', '宝石蓝', '粉笔白', '铁黑', '钻石白'],
        className: 'apprear',
        textAlign: 'right'
      }, {
        divider: true,
        content: '-',
        className: 'divider'
      }, {
        flex: 1,
        values: ['黑色', '黑色/辣椒红色', '黑色/铂金珠光白', '黑色/瓷器黄色'],
        className: 'trim',
        textAlign: 'left'
      }],
      model: {
        vins: [],
        appearTrim: null,
        bodyColor: null,
        interiorColor: null,
        vehicleNumber: null,
        price: null
      },
      standardList: [{
        id: 1,
        name: '中规/国产'
      }, {
        id: 2,
        name: '美规'
      }, {
        id: 3,
        name: '加规'
      }, {
        id: 4,
        name: '中东'
      }, {
        id: 5,
        name: '欧规'
      }, {
        id: 6,
        name: '墨版'
      }],
      brandList: {
        A: [{
          id: 1,
          brandName: '奥迪',
          brandLogo: require('@/assets/images/car_brand_icons/33.jpg')
        }, {
          id: 2,
          brandName: '阿斯顿·马丁',
          brandLogo: require('@/assets/images/car_brand_icons/35.jpg')
        }],
        B: [{
          id: 3,
          brandName: '本田',
          brandLogo: require('@/assets/images/car_brand_icons/14.jpg')
        }, {
          id: 4,
          brandName: '奔驰',
          brandLogo: require('@/assets/images/car_brand_icons/36.jpg')
        }]
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
header {
  padding: 10px;
}

.custom-content {
  padding: 10px 0;
  line-height: 1.5em;
  p {
    white-space: normal;
  }
}

.apprear-trim-picker {
  height: 30vh;
  left: 0;
  right: 0;
}
</style>
