<template lang="pug">
  section.choose-buyer-form(:class="$root.$children[0].headerShow ? this.$style.hasHeader : ''")
    form
      section
        .fields
          kt-select.has-border(:cell-class="['em-cell']", :options="buyerList", v-model="model.buyer", :state="getFieldState('model.buyer')", @click.native="showFieldError($event, 'model.buyer')")
            span(slot="label") 下游买家
      section.mt10
        .fields
          mt-cell.title-cell
            span(slot="title") 本次提车车辆
            span 共 <em>{{checkedCar.length}}</em> 辆
          mt-cell.has-hint(v-for="item in vehicles", :key="item.id")
            div.wrap-title(slot="title")
              p {{item.model}}
              p.title-hint(v-for="subItem in item.children", :key="subItem.frameNo")
                span 车架号：{{subItem.frameNo}} {{subItem.appearTrim}}
    .fixed-footer-placeholder
    footer.fixed-footer
      .tab-item.flex1.tab-btn
        button(@click="submit") 确定转移物权
</template>

<style lang="scss" module>
.has-header {
  margin-top: $header-height;
}
</style>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'

export default {
  mixins: [ValidatorMixin],

  validators: {
    'model.buyer' (value) {
      return this.validate(value).required('请选项下游提车公司')
    }
  },

  methods: {
    init(vehicles = [], checkedCar = []) {
      this.vehicles = vehicles
      this.checkedCar = checkedCar
    },

    async submit() {
      const valid = await this.$validate()
      if (valid) {
        this.$router.back()
        this.$emit('popup-confirmed', this.model)
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    return {
      buyerList: [{
        label: '下游公司一',
        value: '1'
      }, {
        label: '下游公司二',
        value: '2'
      }, {
        label: '下游公司三',
        value: '3'
      }],
      vehicles: [],
      checkedCar: [],
      model: {
        buyer: ''
      }
    }
  }
}
</script>
