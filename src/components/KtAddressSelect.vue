<template lang="pug">
div
  mt-cell(:is-link="!readonly", :class="{'empty': !currentValue}", :state="state", @click.native="showAddressOptions",  :value="currentValue || '请选择'")
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
    mt-picker.popup-picker(:showToolbar="true", value-key="name", :slots='addressList', @change='onAddressChange')
      .picker-header.ui-border-b
        mt-button.fl.cancel.no-border(@click="addressOptionsVisible = false") 取消
        mt-button.fr.confirm.no-border(@click="confirmAddress") 确定
</template>

<script>
import { find, includes } from 'lodash'
// import { mapGetters } from 'lodash'

export default {
  name: 'kt-address-select',
  props: {
    readonly: Boolean,
    value: String,
    state: String
  },

  methods: {
    // 显示地址选择器
    showAddressOptions() {
      if (this.readonly) return
      this.addressOptionsVisible = true
    },

    // 地址选择
    onAddressChange(picker, values) {
      console.log(picker, values)
      let [province, city, region] = values
      if (province) {
        const address = find(this.regions, addr => addr.name === province.name)
        const cities = address.children
        if (!includes(cities, city)) {
          picker.setSlotValues(1, cities)
          picker.setSlotValue(1, cities[0])
          city = cities[0]
        }

        const cityObj = find(address.children, c => c.name === city.name)
        const regions = cityObj.children

        if (!includes(regions, region)) {
          picker.setSlotValues(2, regions)
          picker.setSlotValue(2, regions[0])
          region = regions[0]
        }

        this.selectedAddress = `${province.name}-${city.name}-${region.name}`
        this.selectedValues = values
      }
    },

    // 确定选择地址
    confirmAddress() {
      this.currentValue = this.selectedAddress
      this.addressOptionsVisible = false
      this.$emit('input2', this.selectedValues)
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
    const regions = this.$store.getters.regions
    console.log(regions)
    return {
      regions,
      currentValue: this.value,
      selectedValues: [],
      selectedAddress: '黑色-黑色',
      addressOptionsVisible: false,
      addressList: [{
        flex: 1,
        values: regions,
        className: 'province',
        textAlign: 'right'
      }, {
        flex: 1,
        values: regions[0].children,
        className: 'city',
        textAlign: 'center'
      }, {
        flex: 1,
        values: regions[0].children[0].children,
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
