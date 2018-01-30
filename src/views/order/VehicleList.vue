<template lang="pug">
section.vehicle-list
  mt-header(ref="header", title="选择车辆")
    mt-button(icon="back", slot="left", @click.prevent="backButtonAction") 返回
  header.flex.search-header(v-show="activeStep === '1-1' || activeStep === '2-1'")
    //- div.flex-item
    mt-button.mint-button-block(type='primary', size='large', @click="showVehicleSearch('2-1')")
      i.iconfont.icon-sousuo.mr5
      | 快速选择车型（输入指导价）
  section.body
    .step-block(v-show="activeStep === '1-1' || activeStep === '2-1'")
      ul.standard-list
        mt-cell.click-active(v-for="s in standardList", :key="s.id", @click.native="showVehicleList(s)", is-link, :title="s.name")
    .step-block(v-show="activeStep === '1-2'")
      mt-index-list
        mt-index-section(v-for="(item, key) in vehicleList", :key="key", :index="key")
          mt-cell(v-for="v in item", :title='v.name', @click.native="showVehicleSearch('1-2')")
            img(slot='icon', :src='v.icon', width='24', height='24')
    .step-block(v-show="activeStep === '2-2' || activeStep === '1-3'")
      vehicle-search(ref="vehicleSearch", :close="closeVehicleSearch", @select-vehicle="onSelectVehicle")
    .step-block.pt10(v-show="activeStep === '2-3' || activeStep === '1-4'")
      mt-cell.click-active.ui-border-b
        .custom-title.flex.flex-start(slot="title")
          img.mr10(:src="selectedVehicle.icon", slot="icon", width="18")
          .custom-content
            p {{selectedVehicle.model}}
            small.note 指导价：{{ selectedVehicle.price }} 万
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
            kt-field.has-hint.input-right(type="number", label='数量', placeholder='请输入', v-model='model.count', :state="getFieldState('model.count')", @click.native="showFieldError($event, 'model.count')")
              div(slot="label") 数量  <em>*</em>
              span(slot="input1-append") 辆
            kt-field.has-hint.input-right(type="number", label='单辆车合同单价', placeholder='请输入金额', v-model='model.price', :state="getFieldState('model.price')", @click.native="showFieldError($event, 'model.price')")
              div(slot="label") 单辆车合同单价 <em>*</em>
                p.title-hint 给车型批次总价格
              span(slot="input1-append") 元
    //- .step-block(v-show="activeStep === '2-4' || activeStep === '1-5'")
  .custom-model(v-if="appearTrimOptionsVisible", @click="appearTrimOptionsVisible = false")
  mt-popup(v-model="appearTrimOptionsVisible", position="bottom", :showToolbar="true")
    .picker-header.ui-border-b
      mt-button.fl.cancel.no-border(@click="appearTrimOptionsVisible = false") 取消
      mt-button.fr.confirm.no-border(@click="confirmAppearTrim") 确定
    mt-picker.apprear-trim-picker(:slots='appearTrimList' @change='onApprearTrimChange')
  .form-buttons-placeholder
  .form-buttons.fixed
    mt-button.mint-button-block(type='primary', size='large', @click="submit") 提交
</template>

<script>
import VehicleSearch from '@/views/order/VehicleSearch.vue'
import ValidatorMixin from '@/views/validator_mixin.js'

export default {
  mixins: [ValidatorMixin],
  components: {
    VehicleSearch
  },

  props: {
    close: Function
  },

  methods: {
    // 自定义后退按钮行为
    backButtonAction() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      if (+minorStep > 1) {
        this.activeStep = [mainStep, minorStep - 1].join('-')
      } else if (+minorStep === 1) {
        this.close()
      }
    },

    // 重置步骤
    reset() {
      this.activeStep = '1-1'
    },

    // 下一步
    nextStep() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      this.activeStep = [mainStep, +minorStep + 1].join('-')
    },

    // 显示车辆搜索栏
    showVehicleSearch(preStep) {
      if (preStep === '1-2') {
        this.$refs.vehicleSearch.init(133)
        this.activeStep = '1-3'
      } else if (preStep === '2-1') {
        this.$refs.vehicleSearch.init()
        this.activeStep = '2-2'
      }
    },

    // 显示车辆类型一级目录
    showVehicleList() {
      this.activeStep = '1-2'
    },

    // 选择具体车型以后
    onSelectVehicle(vehicle) {
      this.nextStep()
      this.validation.reset()
      this.selectedVehicle = vehicle
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
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.appearTrim' (value) {
      return this.validate(value).required('请选择外观内饰')
    },
    'model.price' (value) {
      return this.validate(value).required('请输入单车金额')
    },
    'model.count' (value) {
      return this.validate(value).required('请输入购买数量')
    }
  },

  data() {
    return {
      selectedAppearTrim: '黑色-黑色',
      activeStep: '1-1', // {主步骤}-{子步骤}
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
        appearTrim: null,
        count: null,
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
      vehicleList: {
        A: [{
          name: '奥迪',
          icon: require('@/assets/images/car_brand_icons/33.jpg')
        }, {
          name: '阿斯顿·马丁',
          icon: require('@/assets/images/car_brand_icons/35.jpg')
        }],
        B: [{
          name: '本田',
          icon: require('@/assets/images/car_brand_icons/14.jpg')
        }, {
          name: '奔驰',
          icon: require('@/assets/images/car_brand_icons/36.jpg')
        }, {
          name: '宝马',
          icon: require('@/assets/images/car_brand_icons/15.jpg')
        }, {
          name: '别克',
          icon: require('@/assets/images/car_brand_icons/38.jpg')
        }, {
          name: '比亚迪',
          icon: require('@/assets/images/car_brand_icons/75.jpg')
        }, {
          name: '宝骏',
          icon: require('@/assets/images/car_brand_icons/120.jpg')
        }, {
          name: '标志',
          icon: require('@/assets/images/car_brand_icons/13.jpg')
        }, {
          name: '保时捷',
          icon: require('@/assets/images/car_brand_icons/40.jpg')
        }, {
          name: '宾利',
          icon: require('@/assets/images/car_brand_icons/39.jpg')
        }, {
          name: '北京',
          icon: require('@/assets/images/car_brand_icons/27.jpg')
        }, {
          name: '奔腾',
          icon: require('@/assets/images/car_brand_icons/95.jpg')
        }],
        C: [{
          name: '长安',
          icon: require('@/assets/images/car_brand_icons/76.jpg')
        }, {
          name: '长城',
          icon: require('@/assets/images/car_brand_icons/77.jpg')
        }, {
          name: '昌河',
          icon: require('@/assets/images/car_brand_icons/79.jpg')
        }, {
          name: '成功汽车',
          icon: require('@/assets/images/car_brand_icons/196.jpg')
        }],
        D: [{
          name: '大众',
          icon: require('@/assets/images/car_brand_icons/1.jpg')
        }, {
          name: '东风',
          icon: require('@/assets/images/car_brand_icons/32.jpg')
        }, {
          name: '东南',
          icon: require('@/assets/images/car_brand_icons/81.jpg')
        }, {
          name: '道奇',
          icon: require('@/assets/images/car_brand_icons/41.jpg')
        }],
        F: [{
          name: '福特',
          icon: require('@/assets/images/car_brand_icons/8.jpg')
        }, {
          name: '丰田',
          icon: require('@/assets/images/car_brand_icons/3.jpg')
        }, {
          name: '法拉利',
          icon: require('@/assets/images/car_brand_icons/42.jpg')
        }, {
          name: '菲亚特',
          icon: require('@/assets/images/car_brand_icons/96.jpg')
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
