<template lang="pug">
div
  mt-cell(:is-link="!readonly", :class="[{'empty': !currentValue}, ...cellClass]", :state="state", @click.native="showOptions", :value="currentValue || '请选择'")
    span(slot="title")
      slot(name="label")
    div
      span.va-m {{currentLabel || '请选择'}}
      //- span.mint-field-state.is-error(v-if="state === 'error'")
        i.mintui.mintui-field-error
  .custom-model(v-if="optionsVisible", @click="optionsVisible = false")
  mt-popup.option-list(v-model="optionsVisible", position="center")
    div
      mt-radio(title="请选择", v-model='currentValue', :options='options')
      .no-data(v-if="!options.length") 没有选项

</template>

<script>
import { find } from 'lodash'

export default {
  name: 'kt-select',
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
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: {}
  },

  methods: {
    showOptions() {
      if (this.readonly) return
      this.optionsVisible = true
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    },

    currentValue(val) {
      this.optionsVisible = false
      this.$emit('input', val)
    }
  },

  computed: {
    currentLabel() {
      const option = find(this.options, o => o.value === this.currentValue)
      return option ? option.label : ''
    }
  },

  data() {
    return {
      optionsVisible: false,
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
  min-height: 20vh;
  margin-top: 20px;
}
</style>
