<template>
  <transition name="actionsheet-float">
    <div v-show="currentValue" class="mint-actionsheet">
      <ul class="mint-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <li v-for="( item, index ) in actions" class="mint-actionsheet-listitem" @click.stop="itemClick(item, index)">
          <div v-html="item.name"></div>
        </li>
      </ul>
      <a class="mint-actionsheet-button" @click.stop="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<script>
import Popup from 'mint-ui/src/utils/popup'
import 'mint-ui/src/style/popup.css'

export default {
  name: 'kt-actionsheet',

  mixins: [Popup],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    cancelText: {
      type: String,
      default: '取消'
    },

    actions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      currentValue: false
    }
  },

  watch: {
    currentValue(val) {
      this.$emit('input', val)
    },

    value(val) {
      this.currentValue = val
    }
  },

  methods: {
    itemClick(item, index) {
      if (item.method && typeof item.method === 'function') {
        item.method(item, index)
      }
      this.currentValue = false
    }
  },

  mounted() {
    if (this.value) {
      this.rendered = true
      this.currentValue = true
      this.open()
    }
  }
}
</script>
