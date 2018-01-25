<template lang="pug">
mt-popup.popup-box(v-model='popupVisible', position='right')
  slot(name="header")
    mt-header(ref="header", :title="title")
      mt-button(icon="back", slot="left", @click.prevent="popupVisible = false") 返回
  div
    section.popup-input.flex
      label(v-if="label")
        slot(name="label") {{label}}
      input.flex-item(v-clickoutside="doCloseActive", @input="$emit('input', $event.target.value)", @focus="active = true", v-if="type === 'input'", type="text", v-model="value", :placeholder="placeholder")
      textarea.flex-item(v-clickoutside="doCloseActive", @input="$emit('input', $event.target.value)", @focus="active = true", v-else-if="type === 'textarea'", rows="4", v-model="value", :placeholder="placeholder")
      i.iconfont.icon-qingchu(@click='handleClear', v-if='!disableClear', v-show='value && active')
      .length-show(:class="{'el-red': valueLength > maxLength}", v-if="maxLength") {{valueLength}}/{{maxLength}}
    section.suggest
      slot
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large', @click="submit") {{confirmButtonText}}
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import { each } from 'lodash'

export default {
  name: 'kt-popup-input',
  mixins: [ValidatorMixin],
  validators: {
    value(value) {
      const validate = this.validate(value).required('不能为空').custom(() => {
        if (this.type === 'textarea' && this.valueLength > this.maxLength) {
          return '超出指定长度'
        }
      })

      if (this.validators.length) {
        each(this.validators, v => {
          validate[v.name](v.message)
        })
      }

      return validate
    }
  },

  props: {
    visible: Boolean
  },

  methods: {
    init({
      type = 'input',
      maxLength = 0,
      value = '',
      title = '编辑',
      label = '',
      customType = '',
      validators = [],
      placeholder = '',
      confirmButtonText = '提交',
      disableClear = false
    } = {}) {
      // this.popupVisible = true
      this.type = type
      this.maxLength = maxLength
      this.value = value
      this.title = title
      this.label = label
      this.validators = validators
      this.customType = customType
      this.placeholder = placeholder
      this.disableClear = disableClear
      this.confirmButtonText = confirmButtonText
    },

    close() {
      this.popupVisible = false
      this.$emit('visible-change', false)
    },

    updateValue(value) {
      this.value = value
      this.$emit('input', this.value)
    },

    handleClear() {
      this.value = ''
      this.$emit('input', this.value)
    },

    doCloseActive() {
      this.active = false
    },

    async submit() {
      const valid = await this.$validate()
      if (valid) {
        this.$emit('popup-confirmed', { customType: this.customType, value: this.value })
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  watch: {
    visible() {
      this.popupVisible = this.visible
    }
  },

  computed: {
    valueLength() {
      return String(this.value).length
    }
  },

  data() {
    return {
      title: '编辑',
      active: false,
      value: '',
      label: '',
      maxLength: 300,
      validators: [],
      type: 'input',
      confirmButtonText: '提交',
      placeholder: '请填写',
      disableClear: false,
      customType: '', // 用于父组件区分自己调用的类型
      popupVisible: this.visible
    }
  }
}
</script>

<style lang="scss" module>
.has-header {
  margin-top: $header-height + 10px;
}
</style>

<style lang="scss" scoped>
.popup-input {
  background-color: white;
  padding: 5px 10px;
  position: relative;
}

label {
  margin-right: 1em;
}

.icon-qingchu {
  color: $placeholder-color;
}

.suggest {
  color: $placeholder-color;
}

input,
textarea {
  -webkit-appearance: none;
  background: none;
  border: none;
  height: 35px; // line-height: 35px;
}

textarea {
  min-height: 60px;
  resize: none;
}

.length-show {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 9;
}

.form-buttons {
  padding: 20px 10px;
}
</style>
