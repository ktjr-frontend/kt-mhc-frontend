<template lang="pug">
section.vehicle-list(:class="this.$root.$children[0].headerShow ? this.$style.hasHeader : ''")
  header.flex(v-show="activeStep === '1-1'")
    //- div.flex-item
    mt-button.mint-button-block(type='primary', size='large', @click="submit")
      i.iconfont.icon-sousuo.mr5
      | 快速选择车型（输入指导价）
  section.body
    .step-block(v-show="activeStep === '1-1' || activeStep === '2-1'")
      ul.standard-list
        mt-cell.click-active(v-for="s in standardList", :key="s.id", @click.native="showVehicleList(s)", is-link, :title="s.name")
    .step-block(v-show="activeStep === '1-2'")
      mt-index-list
        mt-index-section(v-for="(item, key) in vehicleList", :key="key", :index="key")
          mt-cell(v-for="v in item", :title='v.name')
            img(slot='icon', :src='v.icon' width='24' height='24')
    .step-block(v-show="activeStep === '2-2'")
      vehicle-search(:close="closeVehicleSearch", @select-vehicle="onSelectVehicle")
</template>

<script>
import VehicleSearch from '@/views/order/VehicleSearch.vue'

export default {
  components: {
    VehicleSearch
  },

  props: {
    close: Function
  },

  methods: {
    clearSearch() {
      this.filter.value = ''
      this.search()
    },

    backButtonAction() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      if (+minorStep > 1) {
        this.activeStep = [mainStep, minorStep - 1].join('-')
      } else if (+minorStep === 1) {
        this.close()
      }
    },

    nextStep() {
      const [mainStep, minorStep] = this.activeStep.split('-')
      this.activeStep = [mainStep, minorStep + 1].join('-')
    },

    showVehicleList() {
      this.activeStep = '1-2'
    },

    onSelectVehicle(vehicle) {
      this.nextStep()
    },

    closeVehicleSearch() {
      this.backButtonAction()
    },

    submit() {
      this.$emit('vehicle-confirmed', this.filter.providerName)
    }
  },

  data() {
    return {
      activeStep: '1-1', // {主步骤}-{子步骤}
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
          icon: '//x.autoimg.cn/m/news/brand/33.jpg'
        }, {
          name: '阿斯顿·马丁',
          icon: '//x.autoimg.cn/m/news/brand/35.jpg'
        }],
        B: [{
          name: '本田',
          icon: '//x.autoimg.cn/m/news/brand/14.jpg'
        }, {
          name: '奔驰',
          icon: '//x.autoimg.cn/m/news/brand/36.jpg'
        }, {
          name: '宝马',
          icon: '//x.autoimg.cn/m/news/brand/15.jpg'
        }, {
          name: '别克',
          icon: '//x.autoimg.cn/m/news/brand/38.jpg'
        }, {
          name: '比亚迪',
          icon: '//x.autoimg.cn/m/news/brand/75.jpg'
        }, {
          name: '宝骏',
          icon: '//x.autoimg.cn/m/news/brand/120.jpg'
        }, {
          name: '标志',
          icon: '//x.autoimg.cn/m/news/brand/13.jpg'
        }, {
          name: '保时捷',
          icon: '//x.autoimg.cn/m/news/brand/40.jpg'
        }, {
          name: '宾利',
          icon: '//x.autoimg.cn/m/news/brand/39.jpg'
        }, {
          name: '北京',
          icon: '//x.autoimg.cn/m/news/brand/27.jpg'
        }, {
          name: '奔腾',
          icon: '//x.autoimg.cn/m/news/brand/95.jpg'
        }],
        C: [{
          name: '长安',
          icon: '//x.autoimg.cn/m/news/brand/76.jpg'
        }, {
          name: '长城',
          icon: '//x.autoimg.cn/m/news/brand/77.jpg'
        }, {
          name: '昌河',
          icon: '//x.autoimg.cn/m/news/brand/79.jpg'
        }, {
          name: '成功汽车',
          icon: '//x.autoimg.cn/m/news/brand/196.jpg'
        }],
        D: [{
          name: '大众',
          icon: '//x.autoimg.cn/m/news/brand/1.jpg'
        }, {
          name: '东风',
          icon: '//x.autoimg.cn/m/news/brand/32.jpg'
        }, {
          name: '东南',
          icon: '//x.autoimg.cn/m/news/brand/81.jpg'
        }, {
          name: '道奇',
          icon: '//x.autoimg.cn/m/news/brand/41.jpg'
        }],
        F: [{
          name: '福特',
          icon: '//x.autoimg.cn/m/news/brand/8.jpg'
        }, {
          name: '丰田',
          icon: '//x.autoimg.cn/m/news/brand/3.jpg'
        }, {
          name: '法拉利',
          icon: '//x.autoimg.cn/m/news/brand/42.jpg'
        }, {
          name: '菲亚特',
          icon: '//x.autoimg.cn/m/news/brand/96.jpg'
        }]
      },
      filter: {
        providerName: ''
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
  height: 45px;
  padding: 10px;
  background: white;
}

.cancel-btn {
  width: 50px;
  color: $primary-color;
}

.body {
  margin-top: 10px;
}
</style>
