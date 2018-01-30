<template lang="pug">
section.vehicle-model-select
  mt-cell(:is-link="!readonly", :class="[{'empty': !currentValue}, ...cellClass]", :state="state", @click.native="showOptions", :value="currentValue || '请选择'")
    span(slot="title")
      slot(name="label")
    div
      span.va-m {{currentLabel || '请选择'}}
      //- span.mint-field-state.is-error(v-if="state === 'error'")
        i.mintui.mintui-field-error
  //- .custom-model(v-if="popupVisible", @click="popupVisible = false")
  mt-popup.popup-box(v-model='popupVisible', position='right')
    mt-header(ref="header", title="主营品牌")
      mt-button(icon="back", slot="left", @click.prevent="popupVisible = false") 返回
    .overflow-scroll(ref="popBoxContainer")
      template(v-for="(value, key) in vehicleList")
        section.mt10
          mt-cell.no-border.title-simple-cell.ui-border-b
            span(slot="title") {{key}}
        section.no-border
          mt-cell(v-for="r in value", title="empty", :key="r.id")
            kt-checkbox.mr10(v-model="r.checked", @change="syncCheckedList")
            .custom-title.flex.flex-start(slot="title")
              img.mr10(:src="r.icon", slot="icon", width="18")
              .custom-content
                p {{r.name}}
    .fixed-footer-placeholder
    footer.fixed-footer.flex
      .flex-item.flex-start.pl10(:class="{'el-red': checkedList.length > 3}")
        span.pr10 最多选3个
        span.pl10 已选 [ {{checkedList.length}} ]
      .tab-item.flex-item
        button(@click.prevent="submit") 提交
</template>

<script>
import { chain } from 'lodash'

export default {
  props: {
    label: String,
    readonly: Boolean,
    // placeholder: String,
    // disabled: Boolean,
    // disableClear: Boolean,
    state: {
      type: String,
      default: 'default'
    },
    cellClass: {
      type: Array,
      default () { return [] }
    },
    value: {}
  },

  methods: {
    showOptions() {
      if (this.readonly) return
      this.popupVisible = true
      this.$nextTick(() => {
        this.updatePopBoxHeight()
      })
    },

    syncCheckedList() {
      this.checkedList = chain(this.vehicleList).map(v => v).flatten().filter(v => v.checked).map('name').value()
    },

    submit() {
      if (!this.checkedList.length) {
        this.$toast('请选择主营品牌', 'error')
        return
      } else if (this.checkedList.length > 3) {
        this.$toast('最多选择3个', 'error')
        return
      }
      this.currentValue = this.checkedList
      // this.$emit('input', this.checkedList)
      this.popupVisible = false
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    },

    currentValue(val) {
      this.$emit('input', val)
    }
  },

  computed: {
    currentLabel() {
      return this.currentValue.join('；')
    }
  },

  data() {
    return {
      popupVisible: false,
      currentValue: [],
      checkedList: [],
      vehicleList: {
        A: [{
          name: '奥迪',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/33.jpg')
        }, {
          name: '阿斯顿·马丁',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/35.jpg')
        }],
        B: [{
          name: '本田',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/14.jpg')
        }, {
          name: '奔驰',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/36.jpg')
        }, {
          name: '宝马',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/15.jpg')
        }, {
          name: '别克',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/38.jpg')
        }, {
          name: '比亚迪',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/75.jpg')
        }, {
          name: '宝骏',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/120.jpg')
        }, {
          name: '标志',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/13.jpg')
        }, {
          name: '保时捷',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/40.jpg')
        }, {
          name: '宾利',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/39.jpg')
        }, {
          name: '北京',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/27.jpg')
        }, {
          name: '奔腾',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/95.jpg')
        }],
        C: [{
          name: '长安',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/76.jpg')
        }, {
          name: '长城',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/77.jpg')
        }, {
          name: '昌河',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/79.jpg')
        }, {
          name: '成功汽车',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/196.jpg')
        }],
        D: [{
          name: '大众',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/1.jpg')
        }, {
          name: '东风',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/32.jpg')
        }, {
          name: '东南',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/81.jpg')
        }, {
          name: '道奇',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/41.jpg')
        }],
        F: [{
          name: '福特',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/8.jpg')
        }, {
          name: '丰田',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/3.jpg')
        }, {
          name: '法拉利',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/42.jpg')
        }, {
          name: '菲亚特',
          checked: false,
          icon: require('@/assets/images/car_brand_icons/96.jpg')
        }]
      }
    }
  }
}
</script>
