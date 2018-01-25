<template lang="pug">
  label.kt-checkbox
    input(type="checkbox", v-model="currentValue", @change="onInput")
    span.checkbox-label
      slot
    span.mint-field-state(:class="stateClass")
      i.mintui(:class="fieldStateClass")

</template>

<script>
export default {
  name: 'kt-checkbox',
  props: {
    value: '',
    state: ''
  },

  computed: {
    stateClass() {
      if (this.state) {
        return `is-${this.state}`
      }
      return ''
    },
    fieldStateClass() {
      if (this.state) {
        return `mintui-field-${this.state}`
      }
      return ''
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    }

    // currentValue(val) {
    //   this.$emit('input', val)
    //   this.$emit('change', val)
    // }
  },

  methods: {
    // 用change事件替代 watch方式，避免全选与子选择之间的逻辑问题
    onInput(event) {
      this.$emit('input', event.target.checked)
      this.$emit('change', event.target.checked)
    }
  },

  data() {
    return {
      currentValue: this.value
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~assets/scss/_variables.scss";
.kt-checkbox {
  font-size: inherit;
  .mint-field-state .mintui {
    vertical-align: -2px;
  }
  .checkbox-label:before {
    color: $primary-color;
    content: '\e626';
    font-family: 'iconfont';
    font-size: $font-size-m;
  }
  a {
    color: $primary-color;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked+.checkbox-label:before {
    content: '\e625';
  }
}
</style>
