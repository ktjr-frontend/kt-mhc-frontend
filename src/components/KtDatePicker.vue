<template lang="pug">
div
  mt-cell(is-link, :class="{'empty': !currentValue}", :state="state", @click.native="showPicker", :value="currentValue || '请选择'")
    span(slot="title")
      slot(name="label")
    div
      span.va-m {{currentValue || '请选择'}}
      //- span.mint-field-state.is-error(v-if="state === 'error'")
      //-   i.mintui.mintui-field-error
  .custom-model(v-if="pickerVisible && customModelVisible", @click="closePicker")
  mt-datetime-picker(ref="datePicker", :value='currentValue', @confirm="confirm", type='date', year-format='{value} 年', month-format='{value} 月', date-format='{value} 日')
</template>

<script>
import moment from 'moment'

export default {
  name: 'kt-date-picker',
  props: {
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    customModelVisible: Boolean,
    state: {
      type: String,
      default: 'default'
    },
    value: {}
  },

  methods: {
    showPicker() {
      this.$refs.datePicker.open()
      this.pickerVisible = true
    },

    closePicker() {
      this.pickerVisible = false
      this.$refs.datePicker.close()
    },

    confirm(date) {
      this.currentValue = moment(date).format('YYYY-MM-DD')
      this.$emit('input', this.currentValue)
      this.pickerVisible = false
      this.$refs.datePicker.close()
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    }
  },

  data() {
    return {
      pickerVisible: false,
      currentValue: this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.option-list {
  padding: 10px 0;
  width: 100%;
  min-height: 100px;
}

.no-data {
  text-align: center;
  margin-top: 20px;
}
</style>
