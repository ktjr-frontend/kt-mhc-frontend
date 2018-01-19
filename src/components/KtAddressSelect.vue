<template lang="pug">
div
  mt-cell(is-link, :class="{'empty': !currentValue}", :state="state", @click.native="showAddressOptions",  :value="currentValue || '请选择'")
    span(slot="title")
      slot(name="label") 起始地 <em>*</em>
    div
      span.va-m {{currentValue || '请选择'}}
      //- span.mint-field-state.is-error(v-if="state === 'error'")
        i.mintui.mintui-field-error
      //- input(type="hidden", v-model="model.endAddress")
  //- 起始地选择
  .custom-model(v-if="addressOptionsVisible", @click="addressOptionsVisible = false")
  mt-popup(v-model="addressOptionsVisible", position="bottom", :showToolbar="true")
    mt-picker.popup-picker(:showToolbar="true", :slots='addressList', @change='onAddressChange')
      .picker-header
        mt-button.fl.cancel.no-border(@click="addressOptionsVisible = false") 取消
        mt-button.fr.confirm.no-border(@click="confirmAddress") 确定
</template>

<script>
import { find, map, includes } from 'lodash'

const addressList = [{
  name: '北京市',
  children: [{
    name: '北京市',
    children: [{
      name: '海淀区'
    }, {
      name: '昌平区'
    }, {
      name: '东城区'
    }]
  }]
}, {
  name: '上海市',
  children: [{
    name: '上海市',
    children: [{
      name: '黄浦区'
    }, {
      name: '卢湾区'
    }, {
      name: '金山区'
    }]
  }]
}, {
  name: '天津市',
  children: [{
    name: '天津市',
    children: [{
      name: '津南区'
    }, {
      name: '河西区'
    }, {
      name: '河东区'
    }]
  }]
}]

export default {
  props: {
    value: String,
    state: String
  },

  methods: {
    // 显示地址选择器
    showAddressOptions() {
      this.addressOptionsVisible = true
    },

    // 地址选择
    onAddressChange(picker, values) {
      let [province, city, region] = values
      const address = find(addressList, addr => addr.name === province)
      const cities = map(address.children, 'name')
      if (!includes(cities, city)) {
        picker.setSlotValues(1, cities)
        picker.setSlotValue(1, cities[0])
        city = cities[0]
      }

      const cityObj = find(address.children, c => c.name === city)
      const regions = map(cityObj.children, 'name')

      if (!includes(regions, region)) {
        picker.setSlotValues(2, regions)
        picker.setSlotValue(2, regions[0])
        region = regions[0]
      }

      this.selectedAddress = `${province}-${city}-${region}`
    },

    // 确定选择地址
    confirmAddress(value) {
      this.currentValue = this.selectedAddress
      this.addressOptionsVisible = false
      // this.$emit('input', this.currentValue)
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

  data() {
    return {
      currentValue: this.value,
      selectedAddress: '黑色-黑色',
      addressOptionsVisible: false,
      addressList: [{
        flex: 1,
        values: map(addressList, 'name'),
        className: 'province',
        textAlign: 'right'
      }, {
        flex: 1,
        values: map(addressList[0].children, 'name'),
        className: 'city',
        textAlign: 'center'
      }, {
        flex: 1,
        values: map(addressList[0].children[0].children, 'name'),
        className: 'region',
        textAlign: 'left'
      }]
    }
  }
}
</script>


<style lang="scss" scoped>
.popup-picker {
  height: 35vh;
  left: 0;
  right: 0;
}
</style>
